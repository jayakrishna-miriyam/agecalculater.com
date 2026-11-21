async (page) => {
    const assert = (ok, message) => { if (!ok) throw new Error(message); };
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const origin = 'http://127.0.0.1:4174';
    const routes = ['/', '/age-difference-calculator', '/birthday-countdown-calculator', '/date-difference-calculator', '/leap-year-age-calculator', '/child-age-calculator', '/age-calculator-for-school-admission', '/age-calculator-for-passport-visa'];
    const toggle = page.getByRole('button', {name:'Navigation menu',exact:true});
    const nav = page.getByRole('navigation', {name:'Mobile',exact:true});
    const openTools = async () => {
        await toggle.click();
        await nav.getByText('All Tools', {exact:true}).click();
    };

    await page.setViewportSize({width:390,height:844});
    await page.goto(origin);
    assert(!await nav.isVisible(), 'menu starts closed');
    assert(!await page.getByRole('navigation', {name:'Primary',exact:true}).isVisible(), 'desktop links hidden on mobile');
    await toggle.focus();
    await page.keyboard.press('Enter');
    assert(await nav.isVisible(), 'keyboard opens navigation');
    await nav.getByText('All Tools', {exact:true}).focus();
    await page.keyboard.press('Space');
    assert(await nav.locator('.mobile-tool-group a').count() === 8, 'all eight tools are present');
    assert(await nav.getByRole('link', {name:'View all tools',exact:true}).isVisible(), 'directory remains reachable');
    await page.keyboard.press('Escape');
    assert(!await nav.isVisible(), 'Escape closes menu');
    assert(await toggle.evaluate(element => element === document.activeElement), 'Escape restores focus');

    for (const route of routes) {
        await openTools();
        await nav.locator('.mobile-tool-group a[href="'+route+'"]').click();
        assert(new URL(page.url()).pathname === route, 'tool navigation: '+route);
        assert(!await nav.isVisible(), 'selection closes navigation: '+route);
        assert(await page.locator('h1').count() === 1, 'destination content: '+route);
    }
    await openTools();
    await nav.getByRole('link', {name:'View all tools',exact:true}).click();
    assert(new URL(page.url()).pathname === '/all-tools', 'directory navigation');
    await toggle.click();
    assert(!await nav.getByRole('link', {name:'Age Calculator',exact:true}).isVisible(), 'tools reset after navigation');
    await page.mouse.click(5, 820);
    assert(!await nav.isVisible(), 'outside press closes menu');

    for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => localStorage.setItem('theme', theme), theme);
        await page.reload();
        for (const width of [320, 390, 768, 1150]) {
            await page.setViewportSize({width,height:844});
            await openTools();
            await nav.getByRole('link', {name:'Passport and Visa Age Tool',exact:true}).scrollIntoViewIfNeeded();
            assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), theme+' '+width+': no horizontal overflow');
            assert(await nav.evaluate(element => element.getBoundingClientRect().bottom <= innerHeight), theme+' '+width+': menu fits viewport');
            await toggle.click();
        }
    }
    await openTools();
    await page.setViewportSize({width:1440,height:1000});
    assert(!await toggle.isVisible(), 'desktop hides hamburger');
    assert(await page.getByRole('navigation', {name:'Primary',exact:true}).isVisible(), 'desktop keeps navigation');
    assert(await page.evaluate(() => {
        const nav = document.querySelector('.primary-nav').getBoundingClientRect();
        return Math.abs(nav.x + nav.width / 2 - innerWidth / 2) < 1;
    }), 'desktop menu stays centered');
    await page.setViewportSize({width:390,height:844});
    assert(!await nav.isVisible(), 'resize closes mobile menu');
    await openTools();
    await nav.evaluate(element => element.scrollTop = 0);
    await page.screenshot({path:'output/playwright/mobile-menu-dark.png'});
    await toggle.click();
    await page.getByRole('button', {name:'Switch to light mode',exact:true}).click();
    await openTools();
    await page.screenshot({path:'output/playwright/mobile-menu-light.png'});

    const nojs = await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const staticPage = await nojs.newPage();
    await staticPage.goto(origin);
    await staticPage.getByRole('button', {name:'Navigation menu',exact:true}).click();
    const staticNav = staticPage.getByRole('navigation', {name:'Mobile',exact:true});
    await staticNav.getByText('All Tools', {exact:true}).click();
    await staticNav.getByRole('link', {name:'Child Age Calculator',exact:true}).click();
    assert(new URL(staticPage.url()).pathname === '/child-age-calculator', 'navigation works without JavaScript');
    await nojs.close();
    assert(errors.length === 0, 'browser errors: '+errors.join('; '));
    return {passed:true,tools:routes.length,themes:2,checks:['keyboard','Escape focus','all tool destinations','directory link','outside press','responsive scrolling','desktop alignment','no JavaScript'],errors};
}
