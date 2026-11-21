async (page) => {
    const assert = (ok, message) => { if (!ok) throw new Error(message); };
    const browserErrors = [];
    page.on('pageerror', error => browserErrors.push(error.message));
    page.on('console', message => {
        if (message.type() === 'error') browserErrors.push(message.text());
    });
    // Chromium reports permissions-policy violations through its browser log.
    const session = await page.context().newCDPSession(page);
    await session.send('Log.enable');
    session.on('Log.entryAdded', ({entry}) => {
        if (entry.level === 'error' || entry.source === 'violation') browserErrors.push(entry.text);
    });
    await page.goto('http://127.0.0.1:4174/');
    const field = page.locator('.field-group').filter({has: page.locator('#dob')});
    await field.getByRole('button', {name:'Enter day, month & year instead'}).click();
    await page.locator('#dob').click();
    await page.locator('#dob').pressSequentially('23');
    await page.locator('#dob-month').click();
    await page.locator('#dob-month').pressSequentially('09');
    await page.locator('#dob-year').click();
    await page.locator('#dob-year').pressSequentially('1996');
    assert(await page.locator('#dob').inputValue() === '23', 'clicking and typing day retains input');
    await field.getByRole('button', {name:'Use calendar instead'}).click();
    assert(await page.locator('#dob').inputValue() === '1996-09-23', 'day-first keyboard entry');
    await page.locator('#dob').fill('');
    await field.getByRole('button', {name:'Enter day, month & year instead'}).click();
    await page.locator('#dob-year').fill('1996');
    await page.locator('#dob-month').fill('09');
    await page.locator('#dob').fill('23');
    assert(await page.locator('#dob-year').inputValue() === '1996', 'year typing must survive intermediate updates');
    await page.locator('#targetDate').fill('2026-11-20');
    await page.getByRole('button', {name:'Calculate Age', exact:true}).click();
    assert(/30\s+Years\s+1\s+Months\s+28\s+Days/.test(await page.getByRole('status').innerText()), 'typed birthday calculation');
    await field.getByRole('button', {name:'Use calendar instead'}).click();
    assert(await page.locator('#dob').inputValue() === '1996-09-23', 'calendar retains typed date');
    await page.locator('#dob').fill('2000-02-29');
    await field.getByRole('button', {name:'Enter day, month & year instead'}).click();
    assert(await page.locator('#dob-year').inputValue() === '2000', 'manual entry retains calendar date');
    await page.locator('#dob-year').fill('2001');
    assert(await field.getByText('Enter a valid date', {exact:false}).isVisible(), 'invalid leap day feedback');
    await page.getByRole('button', {name:'Calculate Age', exact:true}).click();
    assert(await page.getByRole('alert').isVisible(), 'invalid date cannot calculate');
    await page.locator('#dob-year').fill('2004');
    await page.locator('#dob-year').press('Enter');
    assert(/22\s+Years/.test(await page.getByRole('status').innerText()), 'corrected leap day keyboard submit');
    await page.locator('#dob-year').fill('');
    assert(await page.locator('#dob').inputValue() === '29', 'partial edits retain remaining date parts');
    await page.setViewportSize({width:320,height:800});
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'mobile no overflow');
    assert(browserErrors.length === 0, 'browser errors or policy violations: '+browserErrors.join('; '));
    await session.detach();
    return {passed:true, checks:['click and type day','direct year entry','date calculation','calendar switching','invalid leap day','partial edits','keyboard submit','mobile width','no console errors or policy violations'],browserErrors};
}
