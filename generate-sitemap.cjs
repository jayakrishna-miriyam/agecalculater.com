const { mkdirSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { pageSeo, siteUrl } = require('./seo-routes.cjs');

const today = new Date();
const lastmod = today.toISOString().split('T')[0];

const urls = pageSeo.filter((page) => page.includeInSitemap);

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
        .map(({ path, changefreq, priority }) => `  <url>\n` +
            `    <loc>${siteUrl}${path}</loc>\n` +
            `    <lastmod>${lastmod}</lastmod>\n` +
            `    <changefreq>${changefreq}</changefreq>\n` +
            `    <priority>${priority}</priority>\n` +
            `  </url>`)
        .join('\n') +
    '\n</urlset>\n';

const publicDir = resolve(__dirname, 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml generated');
