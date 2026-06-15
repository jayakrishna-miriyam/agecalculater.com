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

const fallbackMarkup = (page) => {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-tools', label: 'All Tools' },
    { href: '/age-difference-calculator', label: 'Age Difference' },
    { href: '/birthday-countdown-calculator', label: 'Birthday Countdown' },
  ];

  const intro =
    page.path === '/'
      ? 'This age calculator helps you measure the exact calendar age between a date of birth and a target date. Instead of giving a rough estimate, it counts full years first, then the remaining months, and then the leftover days so the result matches the way people normally express age.'
      : page.description;

  const eyebrow =
    page.path === '/'
      ? 'Exact age in years, months, and days'
      : page.type === 'article'
      ? 'Guide and calculator resource'
      : 'Calculator and tool page';

  const navMarkup = navLinks
    .map((link) => {
      const isActive = link.href === page.path;
      const color = isActive ? '#0369a1' : '#334155';
      const weight = isActive ? '700' : '500';
      return `<a href="${link.href}" style="color:${color};font-weight:${weight};">${escapeHtml(link.label)}</a>`;
    })
    .join('');

  return `
        <main style="margin:0 auto;max-width:72rem;padding:1rem 1rem 3rem;">
            <header style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:0.75rem 0 1rem;border-bottom:1px solid #e2e8f0;">
                <div style="font-size:1.25rem;font-weight:800;color:#0f172a;">AgeCalculater.com</div>
                <nav aria-label="Primary navigation" style="display:flex;flex-wrap:wrap;gap:0.75rem;font-size:0.95rem;">${navMarkup}</nav>
            </header>
            <section style="margin-top:1.5rem;border:1px solid #e2e8f0;border-radius:1.5rem;background:linear-gradient(135deg,#e0f2fe,#ffffff,#dcfce7);padding:1.5rem;">
                <div style="max-width:46rem;">
                    <div style="display:inline-block;margin-bottom:1rem;padding:0.5rem 0.875rem;border-radius:9999px;background:#ffffff;color:#0369a1;font-size:0.9rem;font-weight:700;border:1px solid #bae6fd;">
                        ${escapeHtml(eyebrow)}
                    </div>
                    <h1 style="margin:0 0 0.75rem;font-size:2rem;line-height:1.1;font-weight:800;color:#0f172a;">${escapeHtml(
                      page.heading
                    )}</h1>
                    <p style="margin:0;font-size:1rem;line-height:1.7;color:#334155;">
                        ${escapeHtml(intro)}
                    </p>
                </div>
            </section>
        </main>`;
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
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${fallbackMarkup(page)}</div>`);
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
