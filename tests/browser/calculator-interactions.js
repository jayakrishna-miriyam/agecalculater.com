async (page) => {
    await page.setViewportSize({width:1440,height:1000});
    const assert = (ok, message) => { if (!ok) throw new Error(message); };
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4174/');
    await page.getByLabel('Date of Birth', {exact:true}).fill('1990-03-15');
    await page.getByLabel('Age at the Date of').fill('');
    // Check across a render cycle; the previous effect repopulated this field.
    await page.getByLabel('Date of Birth', {exact:true}).focus();
    assert(await page.getByLabel('Age at the Date of').inputValue() === '', 'cleared target must stay empty');
    await page.getByRole('button', {name:'Calculate Age',exact:true}).click();
    assert((await page.getByRole('alert').innerText()).includes('select both'), 'missing target validation');
    await page.getByLabel('Age at the Date of').fill('2026-09-25');
    assert(await page.getByRole('alert').count() === 0, 'stale error cleared');
    await page.getByLabel('Age at the Date of').press('Enter');
    assert(/36\s+Years\s+6\s+Months\s+10\s+Days/.test(await page.getByRole('status').innerText()), 'keyboard submit');
    await page.evaluate(() => {
        window.__copyCount = 0;
        Object.defineProperty(navigator, 'share', {configurable:true, value:async () => { throw new DOMException('Canceled', 'AbortError'); }});
        Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{writeText:async () => { window.__copyCount++; }}});
    });
    await page.getByRole('button', {name:'Share Result',exact:true}).click();
    assert(await page.evaluate(() => window.__copyCount) === 0, 'canceled share copied personal dates');
    await page.getByLabel('Date of Birth', {exact:true}).fill('1996-09-23');
    await page.getByLabel('Age at the Date of').fill('2026-11-20');
    await page.getByRole('button', {name:'Calculate Age',exact:true}).click();
    await page.evaluate(() => {
        window.open = (...args) => { window.__whatsappOpen = args; return null; };
    });
    await page.getByRole('button', {name:'Share via WhatsApp',exact:true}).click();
    const [whatsappUrl, target, features] = await page.evaluate(() => window.__whatsappOpen);
    const destination = new URL(whatsappUrl);
    const message = destination.searchParams.get('text');
    assert(destination.origin === 'https://wa.me', 'WhatsApp destination');
    assert(target === '_blank' && features === 'noopener,noreferrer', 'safe share window');
    assert(message.startsWith('*Age Calculation Result*\n\n*30 years, 1 month, 28 days*\n\n'), 'blank line after heading and singular month');
    assert(message.includes('*Calculation details*\n\n\u2022 Date of birth: 23 September 1996\n\u2022 Age on: 20 November 2026\n\u2022 Total calendar days: 11,015'), 'blank line before three explicit bullets');
    assert(message.includes('\n\n*View this result*\n\nhttps://agecalculater.com/#dob=1996-09-23&target=2026-11-20'), 'blank lines around result heading and public link');
    assert(message.endsWith('\n\n*Find your own age*\n\nTry the free calculator:\nhttps://agecalculater.com/'), 'blank lines around calculator invitation');
    assert(message.split('\n\n').length === 8 && !message.includes('\n\n\n'), 'exactly one blank line between all eight blocks');
    assert(!message.includes('localhost') && !message.includes('127.0.0.1'), 'no local preview links');
    await page.evaluate(() => {
        Object.defineProperty(navigator, 'share', {configurable:true, value:async data => { window.__nativeShare = data; }});
    });
    await page.getByRole('button', {name:'Share Result',exact:true}).click();
    const shared = await page.evaluate(() => window.__nativeShare);
    assert(shared.url === 'https://agecalculater.com/#dob=1996-09-23&target=2026-11-20', 'native result link');
    assert(!shared.text.includes(shared.url), 'native result link is not duplicated');
    await page.evaluate(() => {
        Object.defineProperty(navigator, 'share', {configurable:true, value:undefined});
        Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{writeText:async text => { window.__copiedMessage = text; }}});
    });
    await page.getByRole('button', {name:'Share Result',exact:true}).click();
    const copied = await page.evaluate(() => window.__copiedMessage);
    assert(copied.includes('\n\nView this result\n\n'+shared.url), 'clipboard result link and spacing');
    assert(!copied.includes('*'), 'clipboard uses plain text');
    await page.getByRole('navigation', {name:'Primary',exact:true}).getByRole('link', {name:'Date Difference',exact:true}).click();
    await page.getByLabel('Start Date').fill('2024-01-31');
    await page.getByLabel('End Date').fill('2024-03-01');
    await page.getByLabel('End Date').press('Enter');
    assert(/30\s+Total Days/i.test(await page.locator('main').innerText()), 'difference keyboard submit');
    await page.getByLabel('End Date').fill('');
    assert((await page.locator('main').innerText()).includes('Choose two dates'), 'empty difference should show instructions');
    await page.getByRole('button', {name:'Calculate Difference',exact:true}).click();
    assert((await page.locator('main').innerText()).includes('choose both dates'), 'difference validation');
    await page.getByLabel('End Date').fill('2024-04-01');
    assert(!(await page.locator('main').innerText()).includes('Please choose both'), 'difference stale error');
    assert(errors.length === 0, 'browser errors: '+errors.join('; '));
    return {passed:true,checks:['clear target','missing input','stale errors','keyboard calculation','share cancellation privacy','WhatsApp formatting and public links','native and clipboard sharing','date-difference reset'],errors};
}
