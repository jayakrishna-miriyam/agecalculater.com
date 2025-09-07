// generate-sitemap.cjs
const { mkdirSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

const baseUrl = 'https://www.agecalculater.com';
const lastmod = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const publicDir = resolve(__dirname, 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml generated');
