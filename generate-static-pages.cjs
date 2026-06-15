const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');
const {
  defaultKeywords,
  homepageFaqs,
  pageSeo,
  siteUrl,
  socialImageUrl,
} = require('./seo-routes.cjs');

const distDir = resolve(__dirname, 'dist');
const templatePath = resolve(distDir, 'index.html');
const template = readFileSync(templatePath, 'utf8');

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const breadcrumbSchema = (page) => {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`,
    },
  ];

  if (page.path !== '/') {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: page.heading,
      item: `${siteUrl}${page.path}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};

const webAppSchema = (page) => ({
  '@type': 'WebApplication',
  name: page.heading,
  url: `${siteUrl}${page.path}`,
  description: page.description,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
});

const buildSchema = (page) => {
  if (page.path === '/') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'AgeCalculater.com',
          url: `${siteUrl}/`,
          description:
            'Age calculator and date guides for exact age, date differences, leap-year birthdays, school admission checks, and passport or visa planning.',
        },
        {
          '@type': 'Organization',
          name: 'AgeCalculater.com',
          url: `${siteUrl}/`,
          logo: socialImageUrl,
        },
        {
          '@type': 'FAQPage',
          mainEntity: homepageFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    };
  }

  const graph = [
    {
      '@type': page.type === 'article' ? 'Article' : 'WebPage',
      headline: page.title,
      name: page.heading,
      url: `${siteUrl}${page.path}`,
      description: page.description,
    },
    breadcrumbSchema(page),
  ];

  if (
    ['/age-difference-calculator', '/birthday-countdown-calculator', '/date-difference-calculator'].includes(
      page.path
    )
  ) {
    graph.unshift(webAppSchema(page));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};

const renderPage = (page) => {
  const canonicalUrl = `${siteUrl}${page.path === '/' ? '/' : page.path}`;
  const robots = page.noindex ? 'noindex, follow' : 'index, follow';
  const schemaJson = JSON.stringify(buildSchema(page));

  let html = template;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?">/s,
    `<meta name="description" content="${escapeHtml(page.description)}">`
  );
  html = html.replace(
    /<meta name="keywords" content=".*?">/s,
    `<meta name="keywords" content="${escapeHtml(defaultKeywords)}">`
  );
  html = html.replace(
    /<link rel="canonical" href=".*?">/s,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`
  );
  html = html.replace(
    /<meta name="robots" content=".*?">/s,
    `<meta name="robots" content="${robots}">`
  );
  html = html.replace(
    /<meta property="og:type" content=".*?">/s,
    `<meta property="og:type" content="${page.type}">`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?">/s,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?">/s,
    `<meta property="og:title" content="${escapeHtml(page.title)}">`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?">/s,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?">/s,
    `<meta property="og:image" content="${escapeHtml(socialImageUrl)}">`
  );
  html = html.replace(
    /<meta name="twitter:url" content=".*?">/s,
    `<meta name="twitter:url" content="${escapeHtml(canonicalUrl)}">`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?">/s,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?">/s,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}">`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?">/s,
    `<meta name="twitter:image" content="${escapeHtml(socialImageUrl)}">`
  );

  if (!html.includes('meta name="author"')) {
    html = html.replace(
      /<meta name="google-adsense-account" content=".*?">/s,
      `$&\n    <meta name="author" content="AgeCalculater.com">`
    );
  }

  if (!html.includes('meta property="og:locale"')) {
    html = html.replace(
      /<meta property="og:site_name" content=".*?">/s,
      `$&\n    <meta property="og:locale" content="en_US">`
    );
  }

  html = html.replace(
    /\s*<script (?:data-seo-schema="true"|data-static-seo-schema="true") type="application\/ld\+json">.*?<\/script>/s,
    ''
  );
  html = html.replace(
    '</head>',
    `    <script data-seo-schema="true" type="application/ld+json">${schemaJson}</script>\n</head>`
  );

  return html;
};

for (const page of pageSeo) {
  const html = renderPage(page);

  if (page.path === '/') {
    writeFileSync(templatePath, html, 'utf8');
    continue;
  }

  if (page.path === '/404') {
    writeFileSync(resolve(distDir, '404.html'), html, 'utf8');
    continue;
  }

  const routeDir = resolve(distDir, page.path.slice(1));
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(resolve(routeDir, 'index.html'), html, 'utf8');
}

console.log('Static route HTML generated');
