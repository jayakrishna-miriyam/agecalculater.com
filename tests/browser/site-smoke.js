async (page) => {
    await page.setViewportSize({width:390,height:844});
    const assert = (value, message) => { if (!value) throw new Error(message); };
    const selectMobileTool = async name => {
        await page.getByRole('button', {name:'Navigation menu',exact:true}).click();
        const nav = page.getByRole('navigation', {name:'Mobile',exact:true});
        await nav.getByText('All Tools', {exact:true}).click();
        await nav.getByRole('link', {name,exact:true}).click();
    };
    const errors = [];
    const tracking = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (/googlesyndication|google-analytics|googletagmanager|doubleclick/.test(request.url())) tracking.push(request.url()); });
    await page.goto('http://127.0.0.1:4174/');
    const resetTheme = page.getByRole('button', {name:'Switch to light mode',exact:true});
    if (await resetTheme.count()) await resetTheme.click();
    await page.getByLabel('Date of Birth', {exact:true}).fill('1990-03-15');
    await page.getByLabel('Age at the Date of').fill('2026-09-25');
    await page.getByRole('button', {name:'Calculate Age',exact:true}).click();
    assert(/36\s+Years\s+6\s+Months\s+10\s+Days/.test(await page.getByRole('status').innerText()), 'main example');
    await page.evaluate(() => Object.defineProperty(navigator, 'share', { configurable:true, value:async data => { window.__shared = data; } }));
    await page.getByRole('button', {name:'Share Result',exact:true}).click();
    assert((await page.evaluate(() => window.__shared.url)).endsWith('#dob=1990-03-15&target=2026-09-25'), 'private share fragment');
    await page.getByLabel('Date of Birth', {exact:true}).fill('2030-01-31');
    assert(!(await page.getByRole('status').innerText()).includes('36'), 'stale result cleared');
    await page.getByLabel('Age at the Date of').fill('2030-03-01');
    await page.getByRole('button', {name:'Calculate Age',exact:true}).click();
    await page.getByRole('heading', {name:'Totals at Your Target Date'}).waitFor();
    assert(await page.getByRole('heading', {name:'Live Age Now (local time)'}).count() === 0, 'no live counter for future birth');
    await selectMobileTool('Age Difference Calculator');
    await page.getByLabel('Earlier Birth Date').fill('2024-01-31');
    await page.getByLabel('Later Birth Date').fill('2024-03-01');
    await page.getByRole('button', {name:'Calculate Difference',exact:true}).click();
    assert(/0\s+Years\s+1\s+Months\s+1\s+Days/.test(await page.locator('main').innerText()), 'month end age gap');
    await page.getByLabel('Earlier Birth Date').fill('2025-01-01');
    await page.getByRole('button', {name:'Calculate Difference',exact:true}).click();
    assert((await page.locator('main').innerText()).includes('start date must be before'), 'reversed dates');
    await selectMobileTool('Date Difference Calculator');
    assert(await page.getByLabel('Start Date').inputValue() === '', 'calculator inputs reset between tools');
    await page.getByLabel('Start Date').fill('2026-03-07');
    await page.getByLabel('End Date').fill('2026-03-09');
    await page.getByRole('button', {name:'Calculate Difference',exact:true}).click();
    assert(/2\s+Total Days/i.test(await page.locator('main').innerText()), 'DST browser total');
    await selectMobileTool('Birthday Countdown Calculator');
    const today = await page.evaluate(() => { const d=new Date(); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-'); });
    await page.getByLabel('Date of Birth', {exact:true}).fill(today);
    await page.getByText('It is your birthday today.', {exact:true}).waitFor();
    await page.getByLabel('Date of Birth', {exact:true}).fill('2999-01-01');
    assert((await page.getByRole('alert').innerText()).includes('on or before today'), 'future birthday rejected');

    const routes = ['/', '/all-tools', '/age-difference-calculator', '/birthday-countdown-calculator', '/date-difference-calculator', '/how-to-calculate-age', '/leap-year-age-calculator', '/child-age-calculator', '/age-calculator-for-school-admission', '/age-calculator-for-passport-visa', '/about-us', '/contact-us', '/privacy-policy', '/terms-and-conditions', '/disclaimer', '/404.html'];
    for (const route of routes) {
        await page.goto('http://127.0.0.1:4174'+route);
        assert(await page.locator('h1').count() === 1, route+': heading');
        assert(await page.locator('#root').getAttribute('data-path') === (route === '/404.html' ? '/404' : route), route+': correct static route');
        assert(await page.getByRole('navigation', {name:'Footer',exact:true}).getByRole('link').count() === 7, route+': footer');
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route+': mobile overflow');
    }
    await page.goto('http://127.0.0.1:4174/');
    await page.screenshot({path:'output/playwright/home-mobile.png'});
    await page.setViewportSize({width:1440,height:1000});
    await page.screenshot({path:'output/playwright/home-desktop.png'});
    await page.getByRole('button', {name:'Switch to dark mode'}).click();
    await page.reload();
    await page.getByRole('button', {name:'Switch to light mode'}).waitFor();
    assert(await page.evaluate(() => document.documentElement.classList.contains('dark')), 'theme persisted');

    const nojs = await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const staticPage = await nojs.newPage();
    for (const route of routes) {
        await staticPage.goto('http://127.0.0.1:4174'+route);
        assert(await staticPage.locator('h1').isVisible(), route+': no-JS heading');
        assert(await staticPage.locator('#root').getAttribute('data-path') === (route === '/404.html' ? '/404' : route), route+': correct no-JS route');
        assert(await staticPage.locator('main').innerText().then(text=>text.length>200), route+': no-JS publisher content');
        assert(await staticPage.getByRole('navigation', {name:'Footer',exact:true}).isVisible(), route+': no-JS footer');
        assert(await staticPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route+': no-JS mobile overflow');
    }
    await staticPage.goto('http://127.0.0.1:4174/birthday-countdown-calculator');
    await staticPage.getByText('Does it count down to my birth time?', {exact:true}).click();
    assert(await staticPage.getByText('No. No birth time is requested. The endpoint is the start of the birthday at local midnight.', {exact:true}).isVisible(), 'native FAQ without JS');
    await staticPage.screenshot({path:'output/playwright/countdown-no-javascript.png'});
    await nojs.close();
    assert(errors.length === 0, 'browser errors: '+errors.join('; '));
    assert(tracking.length === 0, 'unexpected ad/analytics requests');
    return {passed:true,routes:16,checks:['calculator examples','month end','reversed dates','DST','future dates','private sharing','state reset','birthday today','hydration','mobile overflow','theme persistence','no JavaScript content and FAQ','no tracking requests'],errors,tracking};
}
