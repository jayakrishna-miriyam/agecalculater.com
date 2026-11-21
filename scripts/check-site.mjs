import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { pageDefinitions, footerLinks, homepageFaqs, toolDirectory, siteUrl } from '../src/content/index.ts';
import { loadSiteEnvironment } from './site-env.mjs';
import { getSectionTable } from '../src/content/presentation.ts';
const site = loadSiteEnvironment();
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const paths = new Set(pageDefinitions.map(page => page.path));
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
assert.equal(new Set(pageDefinitions.map(page => page.title)).size, pageDefinitions.length, 'Unique page titles');
assert.equal(new Set(pageDefinitions.map(page => page.description)).size, pageDefinitions.length, 'Unique page descriptions');
const sitemapLocations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(sitemapLocations.length, new Set(sitemapLocations).size, 'No duplicate sitemap URLs');
assert.deepEqual(new Set(sitemapLocations), new Set(pageDefinitions.filter(page => page.includeInSitemap && !page.noindex).map(page => siteUrl + page.path)), 'Sitemap contains exactly the public canonical pages');
for (const page of pageDefinitions) {
    const file = page.path === '/' ? 'dist/index.html' : page.path === '/404' ? 'dist/404.html' : 'dist' + page.path + '/index.html';
    const html = readFileSync(file, 'utf8');
    const body = html.split('<body')[1];
    assert.ok(html.includes('name="google-adsense-account" content="' + site.adsenseAccount + '"'), page.path + ': publisher meta tag');
    assert.ok(html.includes('name="google-site-verification" content="' + site.verificationToken + '"'), page.path + ': Search Console verification');
    assert.equal((body.match(/<h1[ >]/g) ?? []).length, 1, page.path + ': one heading');
    assert.ok(html.includes('<title>' + escape(page.title) + '</title>'), page.path + ': title');
    assert.equal((html.match(/<link rel="canonical"/g) ?? []).length, 1, page.path + ': single canonical');
    assert.ok(html.includes('<meta name="description" content="' + escapeAttribute(page.description) + '">'), page.path + ': description');
    for (const [key, value] of Object.entries({ 'og:title': page.title, 'og:description': page.description, 'og:url': siteUrl + page.path, 'twitter:title': page.title, 'twitter:description': page.description, 'twitter:url': siteUrl + page.path })) {
        assert.ok(html.includes(key + '" content="' + escapeAttribute(value) + '"'), page.path + ': ' + key);
    }
    assert.ok(html.includes('href="/site-icon.webp"'), page.path + ': local favicon');
    assert.ok(html.includes('property="og:image" content="' + siteUrl + '/site-icon.webp"'), page.path + ': social image');
    assert.ok(html.includes('href="' + siteUrl + page.path + '"'), page.path + ': canonical');
    assert.ok(html.includes('content="' + (page.noindex ? 'noindex, follow' : 'index, follow') + '"'));
    for (const section of page.sections ?? []) {
        for (const text of [section.title, ...(section.paragraphs ?? []), ...(section.bullets ?? [])]) assert.ok(body.includes(escape(text)), page.path + ': missing publisher content ' + text.slice(0, 60));
        const table = getSectionTable(section);
        if (table) for (const text of [table.caption, ...table.headers, ...table.rows.flat()]) assert.ok(body.includes(escape(text)), page.path + ': missing table content ' + text);
    }
    for (const faq of page.path === '/' ? homepageFaqs : page.faqs ?? []) assert.ok(body.includes(escape(faq.answer)), page.path + ': missing FAQ answer');
    for (const link of footerLinks) assert.ok(body.includes('href="' + link.href + '"'), page.path + ': footer');
    assert.ok(body.includes('href="/privacy-policy#privacy-settings"'), page.path + ': permanent privacy settings entry');
    for (const [, href] of body.matchAll(/href="(\/[^"#?]*)"/g)) assert.ok(paths.has(href), page.path + ': broken internal link ' + href);
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) assert.ok(existsSync('dist' + asset), asset);
    assert.equal(sitemap.includes('<loc>' + siteUrl + page.path + '</loc>'), !!page.includeInSitemap && !page.noindex, page.path + ': sitemap');
    const schema = JSON.parse(html.match(/<script data-seo-schema="true" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.ok(schema['@graph'].length);
    const breadcrumbs = schema['@graph'].filter(item => item['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs.length, page.path === '/' || page.noindex ? 0 : 1, page.path + ': breadcrumb scope');
    for (const breadcrumb of breadcrumbs) {
        assert.ok(breadcrumb.itemListElement.length >= 2, page.path + ': breadcrumb requires two entries');
        breadcrumb.itemListElement.forEach((item, index) => {
            assert.equal(item.position, index + 1, page.path + ': breadcrumb order');
            assert.ok(item.name && item.item.startsWith(siteUrl + '/'), page.path + ': breadcrumb name and URL');
        });
    }
    assert.doesNotMatch(html, /<script[^>]+src="https:\/\/(?:pagead2|www\.googletagmanager)/);
    assert.doesNotMatch(html, /__agecalcThirdParty|adsbygoogle|PRELOAD_SHELL/);
}
const directory = readFileSync('dist/all-tools/index.html', 'utf8');
assert.ok(readFileSync('dist/privacy-policy/index.html', 'utf8').includes('id="privacy-settings"'), 'Privacy settings destination works without JavaScript');
for (const tool of toolDirectory) assert.ok(directory.includes(escape(tool.summary)));
assert.match(readFileSync('dist/robots.txt', 'utf8'), /Allow: \/[\r\n]/);
assert.equal(readFileSync('dist/ads.txt', 'utf8'), site.adsTxt);
assert.ok(existsSync('dist/site-icon.webp'), 'Favicon/social image is deployed');
assert.ok(!readdirSync('dist').some(file => file === '.env' || file.startsWith('.env.')), 'Environment files must not be deployed.');
for (const file of readdirSync('dist/assets').filter(file => file.endsWith('.js'))) {
    assert.doesNotMatch(readFileSync('dist/assets/' + file, 'utf8'), /https:\/\/(?:pagead2\.googlesyndication\.com|www\.googletagmanager\.com|www\.google-analytics\.com)/, file + ': advertising/analytics must remain disabled until consent integration is verified');
}
console.log('PASS: all 16 pages include full publisher content, working internal links, FAQ answers, footer, canonical metadata, assets and correct sitemap membership. Publisher record matches; no ad or analytics loaders.');
