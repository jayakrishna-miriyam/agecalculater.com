import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { render, pageDefinitions, siteUrl, getPageSchema } from '../.cache/ssr/entry-server.js';

const dist = resolve('dist');
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');
const escape = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
for (const page of pageDefinitions) {
    const url = `${siteUrl}${page.path}`;
    let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`);
    const values = {
        description: page.description, robots: page.noindex ? 'noindex, follow' : 'index, follow',
        'og:type': page.type, 'og:url': url, 'og:title': page.title, 'og:description': page.description,
        'twitter:url': url, 'twitter:title': page.title, 'twitter:description': page.description,
    };
    for (const [key, value] of Object.entries(values)) {
        html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`), (_, start, end) => `${start}${escape(value)}${end}`);
    }
    html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
    html = html.replace('<!-- APP_HTML -->', () => render(page.path));
    html = html.replace('<div id="root">', `<div id="root" data-prerendered="true" data-path="${page.path}">`);
    html = html.replace('</head>', `<script data-seo-schema="true" type="application/ld+json">${JSON.stringify(getPageSchema(page)).replace(/</g, '\\u003c')}</script>\n</head>`);
    const file = page.path === '/' ? resolve(dist, 'index.html') : page.path === '/404' ? resolve(dist, '404.html') : resolve(dist, page.path.slice(1), 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
}
const pages = pageDefinitions.filter(page => page.includeInSitemap && !page.noindex);
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${siteUrl}${page.path}</loc>${page.updated ? `<lastmod>${page.updated}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`);
console.log(`Prerendered ${pageDefinitions.length} complete pages; sitemap contains ${pages.length} canonical URLs.`);
