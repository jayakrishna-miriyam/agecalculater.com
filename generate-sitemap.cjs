const { mkdirSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

const baseUrl = 'https://agecalculater.com';
const today = new Date();
const lastmod = today.toISOString().split('T')[0];

const urls = [
    { path: '/all-tools', changefreq: 'weekly', priority: '0.95' },
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/age-difference-calculator', changefreq: 'weekly', priority: '0.9' },
    { path: '/birthday-countdown-calculator', changefreq: 'weekly', priority: '0.9' },
    { path: '/date-difference-calculator', changefreq: 'weekly', priority: '0.9' },
    { path: '/how-to-calculate-age', changefreq: 'monthly', priority: '0.8' },
    { path: '/leap-year-age-calculator', changefreq: 'monthly', priority: '0.75' },
    { path: '/child-age-calculator', changefreq: 'monthly', priority: '0.75' },
    { path: '/age-calculator-for-school-admission', changefreq: 'monthly', priority: '0.75' },
    { path: '/age-calculator-for-passport-visa', changefreq: 'monthly', priority: '0.75' },
    { path: '/about-us', changefreq: 'yearly', priority: '0.5' },
    { path: '/contact-us', changefreq: 'yearly', priority: '0.45' },
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.4' },
    { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.4' },
    { path: '/disclaimer', changefreq: 'yearly', priority: '0.4' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
        .map(({ path, changefreq, priority }) => `  <url>\n` +
            `    <loc>${baseUrl}${path}</loc>\n` +
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
