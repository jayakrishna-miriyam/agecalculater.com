// generate-sitemap.cjs
const { mkdirSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

const baseUrl = 'https://www.agecalculater.com';
const today = new Date();
const lastmod = today.toISOString().split('T')[0];

const slugify = (value) =>
    value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const coreSections = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/age-calculator', changefreq: 'weekly', priority: '0.9' },
    { path: '/about-age-calculator', changefreq: 'monthly', priority: '0.7' },
    { path: '/how-it-works', changefreq: 'monthly', priority: '0.7' },
    { path: '/fun-facts', changefreq: 'monthly', priority: '0.6' },
    { path: '/faq', changefreq: 'weekly', priority: '0.8' },
];

const faqQuestions = [
    'How is age calculated so accurately?',
    'Does this calculator account for leap years?',
    'Is my date of birth saved on your server?',
    'Why does the Age Summary show a different number of months than the main result?',
    'Can I use this for things other than my age?',
    'How does the calculator handle timezones?',
    'What should I do if the result seems incorrect?',
    'What is chronological age?',
    'Can I use this to calculate future or past ages?',
];

const faqUrls = faqQuestions.map((question) => ({
    path: `/faq/${slugify(question)}`,
    changefreq: 'monthly',
    priority: '0.6',
}));

const additionalIdeas = [
    { path: '/tools/date-difference-calculator', changefreq: 'monthly', priority: '0.6' },
    { path: '/tools/birthday-countdown', changefreq: 'monthly', priority: '0.55' },
    { path: '/resources/age-calculation-guide', changefreq: 'yearly', priority: '0.5' },
    { path: '/blog/benefits-of-age-calculators', changefreq: 'yearly', priority: '0.45' },
];

const urls = [...coreSections, ...faqUrls, ...additionalIdeas];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
        .map(({ path, changefreq, priority, lastmod: customLastmod }) => `  <url>\n` +
            `    <loc>${baseUrl}${path}</loc>\n` +
            `    <lastmod>${customLastmod ?? lastmod}</lastmod>\n` +
            `    <changefreq>${changefreq}</changefreq>\n` +
            `    <priority>${priority}</priority>\n` +
            `  </url>`)
        .join('\n') +
    '\n</urlset>\n';

const publicDir = resolve(__dirname, 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml generated');
