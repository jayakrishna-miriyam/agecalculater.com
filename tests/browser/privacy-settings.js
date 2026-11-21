async (page) => {
    const assert = (value, label) => { if (!value) throw new Error(label); };
    const origin = 'http://127.0.0.1:4174';
    const errors = [];
    const tracking = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (/googlesyndication|google-analytics|googletagmanager|doubleclick|fundingchoicesmessages/.test(request.url())) tracking.push(request.url()); });
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(origin);
    await page.locator('footer').getByRole('link', { name: 'Privacy and cookie settings' }).click();
    assert(page.url().endsWith('/privacy-policy#privacy-settings'), 'permanent entry works');
    assert(await page.getByText('No advertising consent message is loaded', { exact: false }).isVisible(), 'truthful disabled status');
    assert(await page.getByRole('button', { name: 'Change or withdraw consent' }).count() === 0, 'no fake consent control');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'mobile fits');
    await page.screenshot({ path: 'output/privacy-settings-mobile.png' });

    // Provider doubles test our integration only, not Google's account configuration.
    await page.evaluate(() => {
        const fc = window.googlefc;
        window.__privacyCalls = 0;
        window.__tcfapi = (command, version, callback) => {
            if (command === 'addEventListener') callback({ gdprApplies: true, listenerId: 1 }, true);
        };
        fc.showRevocationMessage = () => { window.__privacyCalls++; };
        const queued = [...fc.callbackQueue];
        fc.callbackQueue = { push: entry => Object.values(entry).forEach(callback => callback()) };
        queued.forEach(entry => { if (entry.CONSENT_API_READY) entry.CONSENT_API_READY(); });
    });
    const reopen = page.getByRole('button', { name: 'Change or withdraw consent' });
    await reopen.focus();
    await page.keyboard.press('Enter');
    assert(await page.evaluate(() => window.__privacyCalls) === 1, 'keyboard invokes official API');
    assert(await page.getByRole('status').textContent().then(text => text.includes('requested')), 'request is not a saved-consent claim');
    await page.locator('footer').getByRole('link', { name: 'Privacy and cookie settings', exact: true }).click();
    assert(await page.evaluate(() => window.__privacyCalls) === 2, 'footer reopens the CMP on the current page');
    await page.evaluate(() => { window.googlefc.showRevocationMessage = () => { throw new Error('CMP blocked'); }; });
    await reopen.click();
    assert(await page.getByRole('status').textContent().then(text => text.includes('No new choice was saved')), 'blocked provider handled');
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.screenshot({ path: 'output/privacy-settings-dark.png' });

    await page.reload();
    await page.evaluate(() => {
        const fc = window.googlefc;
        fc.usstatesoptout = { getInitialUsStatesOptOutStatus: () => 3 };
        fc.callbackQueue.forEach(entry => entry.INITIAL_US_STATES_OPT_OUT_DATA_READY?.());
    });
    assert(await page.getByText('For US state privacy choices', { exact: false }).isVisible(), 'US official link guidance');
    assert(await page.evaluate(() => window.googlefc.usstatesoptout.overrideDnsLink === undefined), 'automatic US link retained');
    assert(tracking.length === 0, 'no optional services loaded');
    assert(errors.length === 0, 'no browser errors: ' + errors.join(', '));

    const nojs = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 740 } });
    const fallback = await nojs.newPage();
    await fallback.goto(origin + '/404.html');
    await fallback.locator('footer').getByRole('link', { name: 'Privacy and cookie settings' }).click();
    assert(await fallback.locator('#privacy-settings').isVisible(), 'privacy settings available without JS even from 404');
    await nojs.close();
    console.log('PASS: privacy settings, keyboard/mobile/no-JS, EU reopening and failure, US automatic-link preservation, no optional requests. CMP provider was mocked.');
}
