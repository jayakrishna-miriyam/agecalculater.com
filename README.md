# AgeCalculater.com

React, TypeScript, and Vite calculators with complete static HTML for every public route.

## Getting started

Use Node 24 (minimum 22.18):

On a new checkout, copy `.env.example` to `.env` and fill in the two Google identifiers before starting the app. The local `.env` in this workspace is already configured.

```sh
npm ci
npm run dev
```

To build and preview the production site:

```sh
npm run build
npm run preview
```

The preview runs at `http://127.0.0.1:4174` and serves prerendered routes and real 404 responses.

## Environment configuration

Edit `.env` in the project root:

| Variable | Value |
| --- | --- |
| `ADSENSE_PUBLISHER_ID` | Your AdSense publisher ID: `pub-` followed by 16 digits, without the `ca-` prefix |
| `GOOGLE_SITE_VERIFICATION` | The `content` value from your Google Search Console verification meta tag |

`vite.config.mjs` reads these values through `scripts/site-env.mjs`. It generates both verification meta tags and `/ads.txt` for development and production. Static page generation preserves the tags on every route; the build and HTTP audit check them against the same configuration. Missing or malformed identifiers stop the build with a configuration error.

The actual `.env` and mode-specific environment files are ignored by Git; `.env.example` is the committed template. Environment files are not copied to `dist/`. The two Google identifiers are public verification values and will appear in the generated HTML and `ads.txt`. No private API keys are currently required. Keep any future private API keys in server-side code, and do not use a `VITE_` prefix for secrets: [Vite exposes those variables to the browser](https://vite.dev/guide/env-and-mode).

Restart `npm run dev` after editing `.env`; rebuild and redeploy for production changes. Vite also supports `.env.local`, `.env.production`, and `.env.production.local`. The build audits use production mode. Existing process environment variables take priority over the files.

**Netlify:** set both variables in the site's build environment before deploying this change. Netlify will not receive your ignored local `.env` through Git. Use the values in your local file, then trigger a new build. Advertising and analytics remain disabled; configuring these verification IDs does not turn ads on.

## Project structure

```text
src/
  App.tsx                 Page layout and route selection
  main.tsx                Browser entry and hydration
  entry-server.tsx        Build-time HTML rendering
  components/
    calculators/          Calculators, live counter, and birthday animation
    content/              Article sections and expandable FAQs
    layout/               Header, hero, and theme control
    ui/                   Shared form controls and cards
  content/
    pages/                Calculator, guide, information, and utility pages
    index.ts              Shared content exports and route map
    faqs.ts               Homepage FAQs
    site.ts               Site URL and navigation
    tools.ts              Tool directory and related resources
    types.ts              Content interfaces
  hooks/                  Theme state
  seo/                    Metadata updates and structured data
  styles/                 Global styles and Tailwind directives
  utils/                  Calendar calculations and date parsing
  types.ts                Calculator result types
public/                   robots.txt and other unchanged public files
scripts/                  Static generation, validation, preview, audit, cleanup
tests/
  unit/                   Calendar regression tests
  browser/                Playwright CLI smoke and interaction checks
docs/adsense/              Original issue notes and readiness audit
index.html                HTML shell
vite.config.mjs           Environment-driven verification tags and ads.txt
.env.example              Required environment variable template
netlify.toml              Hosting, headers, and build configuration
```

Edit page text and metadata in `src/content/pages/`, using `src/content/index.ts` as the shared entry point for application and build scripts. Update a page's `updated` date when its content changes. Keep worked examples consistent with `src/utils/dateUtils.ts` and `tests/unit/date-utils.test.mjs`.

Keep application code under `src/`, public files under `public/`, and maintenance scripts under `scripts/`. Add new routes to the content definitions so rendering, the sitemap, and audits stay in sync.

## Checks and generated files

| Command | Purpose |
| --- | --- |
| `npm test` | Calendar regressions and Google identifier validation |
| `npm run typecheck` | Check application TypeScript |
| `npm run build` | Run tests and type checks, build assets, prerender routes, and validate output |
| `npm run check:site` | Recheck an existing build's content, links, metadata, sitemap, and publisher record |
| `npm run audit:live` | Compare production HTTP responses with this checkout |
| `npm run clean` | Remove generated builds, caches, audit reports, and browser artifacts |

The build produces `dist/`, which is the only directory to deploy. Netlify uses `npm run build` and publishes `dist/`. The temporary server bundle in `.cache/ssr/` is removed after a successful build. The browser and static pages use the same React components and content definitions.

`dist/`, `.cache/`, `output/`, `.playwright-cli/`, and `node_modules/` are ignored by Git. Build output and screenshots should not be committed. `npm run clean` leaves source, documentation, dependencies, and configuration intact; rebuild before running the preview again.

The HTTP audit saves a timestamped report in `output/adsense-live-audit.json`. For a local audit while the preview is running:

```sh
npm run audit:live -- --origin http://127.0.0.1:4174 --report output/adsense-local-audit.json
```

The optional browser checks use Playwright CLI. With the preview running, open a fresh named browser session and run these scripts from the project root:

```sh
npx --yes --package @playwright/cli playwright-cli -s=site-check open http://127.0.0.1:4174
npx --yes --package @playwright/cli playwright-cli -s=site-check run-code --filename tests/browser/site-smoke.js
npx --yes --package @playwright/cli playwright-cli -s=site-check run-code --filename tests/browser/calculator-interactions.js
npx --yes --package @playwright/cli playwright-cli -s=site-check run-code --filename tests/browser/mobile-navigation.js
npx --yes --package @playwright/cli playwright-cli -s=site-check run-code --filename tests/browser/date-entry.js
npx --yes --package @playwright/cli playwright-cli -s=site-check run-code --filename tests/browser/content-reading.js
npx --yes --package @playwright/cli playwright-cli -s=site-check run-code --filename tests/browser/homepage-learning.js
npx --yes --package @playwright/cli playwright-cli -s=site-check close
```

These check calculator interactions, sharing cancellation, all 16 routes with and without JavaScript, mobile overflow, theme persistence, and unexpected advertising requests. The mobile navigation check covers all eight tool links, keyboard controls, dismissal, both themes, desktop alignment, and navigation without JavaScript. Screenshots are written to `output/playwright/`.

Published calendar examples live in each content section's `examples` array, with fixed expected results and day totals. The unit tests check all 26 examples; static validation checks every table cell in the initial HTML. The content-reading browser check covers section links, narrow-screen table access, themes, and example links that populate the calculator.

The homepage-learning check covers personalized calculation steps, the selected-date birthday timeline, native and manual date entry, and stale-result clearing. Calendar-anchor tests cover leap-day and month-end transitions across timezones.

## AdSense status

Advertising and analytics delivery are disabled pending consent configuration and verification. The confirmed publisher record and AdSense verification meta tag are retained. See [the readiness audit and remaining account steps](docs/adsense/readiness.md) and [the original issue notes](docs/adsense/issues.md) before requesting review or enabling advertising. Passing local checks does not verify a production deployment or promise Google approval.
