import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pageDefinitions, footerLinks, siteUrl } from '../src/content/index.ts';
import { loadSiteEnvironment } from './site-env.mjs';
const site = loadSiteEnvironment();

// Read-only deployment checks. Passing these checks is not an AdSense decision.
const args = process.argv.slice(2);
const option = name => args[args.indexOf(name) + 1];
const base = new URL(args.includes('--origin') ? option('--origin') : siteUrl);
if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password) throw new Error('Use an HTTP(S) origin without credentials.');
const origin = base.origin;
const checks = [];
const record = (path, check, passed, detail) => checks.push({ path, check, passed, ...(detail ? { detail } : {}) });
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const get = async path => {
    const response = await fetch(origin + path, { signal: AbortSignal.timeout(20000), headers: { 'Cache-Control': 'no-cache' } });
    return { response, text: await response.text() };
};
const auditPage = async page => {
    try {
        const { response, text } = await get(page.path);
        const body = text.split(/<body\b[^>]*>/i)[1] ?? '';
        record(page.path, 'HTTP 200 HTML', response.status === 200 && (response.headers.get('content-type') ?? '').includes('text/html'), 'HTTP ' + response.status);
        record(page.path, 'Correct generated route', body.includes('data-path="' + page.path + '"'));
        record(page.path, 'Canonical URL', text.includes('<link rel="canonical" href="' + siteUrl + page.path + '">'));
        record(page.path, 'Indexable', !/name="robots"[^>]*content="[^"]*noindex/i.test(text) && !/noindex/i.test(response.headers.get('x-robots-tag') ?? ''));
        const missingSections = (page.sections ?? []).filter(section => !body.includes(escape(section.title)) || !(section.paragraphs ?? []).every(paragraph => body.includes(escape(paragraph))));
        record(page.path, 'Current publisher content in initial HTML', missingSections.length === 0, missingSections.length ? 'Missing or older sections: ' + missingSections.map(section => section.title).join('; ') : undefined);
        record(page.path, 'Footer navigation', footerLinks.every(link => body.includes('href="' + link.href + '"')));
        record(page.path, 'No automatic ad or analytics loader', !/__agecalcThirdParty|adsbygoogle|googletagmanager\.com\/gtag\/js|google-analytics\.com\//i.test(text));
        record(page.path, 'Configured publisher meta tag', text.includes('name="google-adsense-account" content="' + site.adsenseAccount + '"'));
        record(page.path, 'Configured Search Console verification', text.includes('name="google-site-verification" content="' + site.verificationToken + '"'));
    } catch (error) { record(page.path, 'Reachable', false, error.message); }
};
const pages = pageDefinitions.filter(page => page.includeInSitemap && !page.noindex);
// Bounded parallelism avoids placing unnecessary load on the public site.
for (let start = 0; start < pages.length; start += 4) await Promise.all(pages.slice(start, start + 4).map(auditPage));
for (const [path, verify] of [
    ['/ads.txt', text => text.trim() === site.adsTxt.trim()],
    ['/robots.txt', text => /Sitemap:\s*https:\/\/agecalculater\.com\/sitemap\.xml/i.test(text) && !/^Disallow:\s*\/\s*$/im.test(text)],
    ['/sitemap.xml', text => pages.every(page => text.includes('<loc>' + siteUrl + page.path + '</loc>')) && !text.includes('<loc>' + siteUrl + '/404</loc>')],
]) {
    try {
        const { response, text } = await get(path);
        record(path, 'Expected public file', response.status === 200 && verify(text), 'HTTP ' + response.status);
    } catch (error) { record(path, 'Reachable', false, error.message); }
}
try {
    const { response, text } = await get('/adsense-audit-missing-page');
    record('/adsense-audit-missing-page', 'HTTP 404 and noindex', response.status === 404 && /noindex/.test(text), 'HTTP ' + response.status);
    record('/adsense-audit-missing-page', 'No advertising on error page', !/__agecalcThirdParty|adsbygoogle/i.test(text));
} catch (error) { record('/adsense-audit-missing-page', 'Reachable', false, error.message); }
const failures = checks.filter(check => !check.passed);
const report = { inspectedAt: new Date().toISOString(), origin, scope: 'Public HTTP responses compared with this checkout. Does not verify AdSense approval, account eligibility, CMP settings, or email delivery.', passed: failures.length === 0, checks };
const reportFile = resolve(args.includes('--report') ? option('--report') : 'output/adsense-live-audit.json');
mkdirSync(dirname(reportFile), { recursive: true });
writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n');
for (const path of [...new Set(failures.map(item => item.path))]) console.log('FAIL ' + path + ': ' + failures.filter(item => item.path === path).map(item => item.check).join('; '));
console.log((failures.length ? 'NOT READY: ' + failures.length + ' deployment checks failed.' : 'PASS: public deployment matches the checked content and technical configuration.') + '\nReport: ' + reportFile);
process.exitCode = failures.length ? 1 : 0;
