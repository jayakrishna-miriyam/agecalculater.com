async (page) => {
    const assert = (ok, message) => { if (!ok) throw new Error(message); };
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({width:1440,height:1000});
    await page.goto('http://127.0.0.1:4174/');
    assert(await page.getByRole('group',{name:'Try an example'}).count()===0,'example block removed');
    assert(await page.getByRole('button',{name:/^(Age today|Age on a future date|February 29 birthday)$/}).count()===0,'example buttons removed');
    await page.locator('#dob').fill('2024-02-29');
    await page.locator('#targetDate').fill('2025-02-28');
    await page.getByRole('button',{name:'Calculate Age',exact:true}).click();
    await page.getByRole('status').getByText('1',{exact:true}).waitFor();
    assert((await page.locator('.age-breakdown').innerText()).includes('1 complete year'),'leap anniversary breakdown');
    assert((await page.locator('.age-result-guide').innerText()).includes('28 February 2025'),'leap convention explained');

    const birthField = page.locator('.field-group').filter({has:page.locator('#dob')});
    const targetField = page.locator('.field-group').filter({has:page.locator('#targetDate')});
    await birthField.getByRole('button',{name:'Enter day, month & year instead'}).click();
    await targetField.getByRole('button',{name:'Enter day, month & year instead'}).click();
    await page.locator('#dob').fill('14');
    await page.locator('#dob-month').fill('05');
    await page.locator('#dob-year').fill('1992');
    await page.locator('#targetDate').fill('19');
    await page.locator('#targetDate').fill('20');
    await page.locator('#targetDate-month').fill('11');
    await page.locator('#targetDate-year').fill('2026');
    assert(await page.locator('.age-result-guide').count()===0,'editing hides stale explanation');
    await page.locator('#targetDate-year').press('Enter');
    await page.getByRole('heading',{name:'Your birthday timeline'}).waitFor();
    const steps = await page.locator('.age-breakdown').innerText();
    assert(steps.includes('34 complete years') && steps.includes('6 complete months') && steps.includes('6 remaining days'),'personalized three-step example');
    const timeline = await page.locator('.birthday-timeline').innerText();
    assert(timeline.includes('14 May 2027'),'next birthday uses target year');
    assert(timeline.includes('175 days until the next birthday'),'calendar-day remainder');
    assert(await page.locator('progress').getAttribute('value')==='190','birthday progress');
    for (const width of [320,390,768,1440]) {
        await page.setViewportSize({width,height:1000});
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`no overflow at ${width}`);
    }
    await page.setViewportSize({width:390,height:1000});
    if (await page.getByRole('button',{name:'Switch to light mode',exact:true}).count()) await page.getByRole('button',{name:'Switch to light mode',exact:true}).click();
    await page.locator('.age-result-guide').scrollIntoViewIfNeeded();
    await page.screenshot({path:'output/playwright/homepage-learning-mobile.png'});
    await page.setViewportSize({width:1440,height:1100});
    await page.getByRole('button',{name:'Switch to dark mode',exact:true}).click();
    await page.locator('.age-result-guide').scrollIntoViewIfNeeded();
    await page.screenshot({path:'output/playwright/homepage-learning-desktop-dark.png'});
    await page.locator('#dob').fill('');
    assert(await page.locator('.age-result-guide').count()===0,'incomplete date hides result guide');
    await page.goto('http://127.0.0.1:4174/child-age-calculator');
    await page.locator('#dob').fill('2024-02-29');
    await page.locator('#targetDate').fill('2025-02-28');
    await page.getByRole('button',{name:'Calculate Age',exact:true}).click();
    assert(await page.locator('.age-result-guide').count()===0,'learning guide scoped to homepage');
    assert(errors.length===0,errors.join('; '));
    return {passed:true,checks:['example block removed','native and manual entry','stale-state reset','calendar steps','birthday progress','mobile widths','both themes','homepage scope'],errors};
}
