# AdSense remediation and website improvement plan

Prepared: November 20, 2026. Status: audit and proposed work only; website changes and deployment have not started in this pass.

## 1. Main finding and proposed outcome

**The first problem to fix is the gap between this workspace and the public website.** The earlier fixes exist locally, but today's public HTTP audit still finds the old, minimal HTML and automatic advertising/analytics loader. Repeating a local redesign without verifying the deployed result would leave this problem unresolved.

The screenshot reports both **Google-served ads on screens without publisher content** and **low-value content**. Ownership verification has passed. The proposed work therefore has three priorities:

1. Publish and verify complete, useful page content, with advertising disabled during remediation.
2. Improve the distinct value, accuracy, and clarity of each retained calculator and guide.
3. Simplify the interface so the calculator, result, and explanation are easier to use.

Success means a verified production release that meets the acceptance criteria below and is ready for another review. Google makes the approval decision; neither a redesign nor passing our tests guarantees approval.

## 2. Evidence from this audit

Reviewed the screenshot, current source, previous issue/readiness documents, rendering and audit scripts, and current Google guidance. Ran the existing read-only HTTP audit against the public domain and separately inspected raw HTML from the homepage, directory, and a missing URL. No authenticated AdSense, Search Console, hosting-account, or live browser/network inspection was performed in this pass.

| Finding | Evidence | Interpretation |
| --- | --- | --- |
| Production does not match the corrected local version | All 15 indexable routes failed the current-content, generated-route, and footer checks | A deployment mismatch is confirmed; the hosting/branch/build cause still needs investigation |
| Public homepage HTML is minimal | Raw body contains branding, four navigation links, a heading, and one explanatory paragraph; it still contains `PRELOAD_SHELL` | Full explanations are not in the initial response. This does not prove exactly what Google's renderer saw |
| Directory HTML is minimal | `/all-tools` initially contains navigation, heading, and one description | The directory content currently depends on client-side rendering |
| Old third-party loader is still public | All 15 routes contain the automatic loader; inspected code schedules AdSense and analytics on timers or interactions | Loader presence is confirmed. Actual served ads and consent behavior require browser/account checks |
| Error page contains the same loader | `/adsense-audit-missing-page` returns HTTP 404 but contains `__agecalcThirdParty` | Error-page exclusion must be verified in production, including after client navigation |
| Some technical foundations already pass | Audit passes canonical/indexability checks, configured verification tags, `ads.txt`, robots, sitemap membership, and missing-page status/noindex | Replacing working verification settings is not the first priority |
| Local improvements already exist | Full React prerendering, detailed examples, disabled ad loaders, date regression tests, privacy updates | Preserve and review these changes instead of rebuilding from the old committed version |
| Earlier sign-off was local | `docs/adsense/readiness.md` explicitly separates local success from an older failed production audit | Local success was never evidence that the public site had been corrected |

Audit recorded at `2026-11-20T23:32:50.880Z`: **79 of 140 checks passed; 61 failed**. These are comparisons with this checkout, not 61 separate Google violations. Machine-readable evidence is in `output/adsense-planning-audit-2026-11-20.json` (ignored generated output); this document contains the durable findings.

The checkout already has substantial modified, deleted, and untracked files from earlier work. Preserve that work. The last committed change is `0bd3da0` (`Stabilize preload shell and fix shell replacement`); confirm the actual production release before deciding why the newer source was not published.

## 3. Priority 0: close the production gap

### Release investigation and recovery

- Identify the hosting project serving the domain, connected repository, production branch, deployed revision, build command, publish directory, and any failed or skipped builds.
- Compare those settings with `netlify.toml`: Node 24, `npm run build`, publish `dist`. Netlify is configured in the repository; confirm the live hosting arrangement rather than assuming it.
- Confirm the hosting build environment has the existing `ADSENSE_PUBLISHER_ID` and `GOOGLE_SITE_VERIFICATION`. The ignored local `.env` will not arrive through a Git deployment.
- Build the intended source revision from a reproducible checkout. Verify it uses `src/entry-server.tsx` and `scripts/generate-static-pages.mjs` to produce the complete pages, rather than publishing the old preload shell or stale assets.
- Record the release revision/build identifier and deployment URL. After release, compare production HTML and asset references with that build. Investigate CDN caching only if it still serves older content.
- Keep a known release available for operational rollback, but do not restore the old automatic ad loader as the remedy for a failed deployment.

### Content and advertising delivery

- Keep calculator forms, original explanations, worked examples, FAQ answers, and footer links in initial HTML. Hydration should enhance the same content rather than replace a short placeholder.
- Preserve disabled ad/analytics delivery while remediation is underway. Remove the old timed/interaction loader from the deployed HTML and bundles on every route.
- Retain the verified publisher record and supported ownership verification. Google's connection instructions include meta-tag and `ads.txt` methods; loading ads everywhere is not necessary just to preserve verification. [Google site connection guidance](https://support.google.com/adsense/answer/7584263?hl=en)
- Preserve a real HTTP 404, useful recovery links, and noindex on missing pages. Do not turn unknown URLs into successful homepage responses.

**Completion gate:** all public routes serve the intended build, the updated HTTP audit passes, and browser network checks confirm no advertising/analytics requests from this release. A passing localhost build is insufficient.

## 4. Priority 1: make every retained content page useful

The current local copy already has methods, examples, and limitations. Edit and strengthen it; do not simply append more paragraphs. There is no word-count target in this plan. Google emphasizes original value and useful navigation, and its Search guidance explicitly cautions against writing to an assumed preferred word count. [AdSense page readiness](https://support.google.com/adsense/answer/7299563?hl=en), [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

### Shared standard for calculator pages

Each page should answer a distinct question and include:

- A working tool with input labels that match that question.
- A result explaining the chosen dates and units, with relevant assumptions nearby.
- At least one reproducible example and a meaningful boundary case, checked independently and against the code.
- A concise explanation of the actual algorithm, its limitations, and likely reasons another tool may differ.
- A small set of relevant questions and contextual links; no repeated generic paragraphs added for length.
- Honest revision information and a practical correction route. Identify real contributors only when confirmed; do not invent an editorial team or expert review.

Support examples with structured data in the code so the displayed dates/results and regression fixtures stay consistent. Add support for example tables and source notes to the content model; it currently supports paragraphs, bullets, and links only.

### Page-by-page decisions

| Route | Proposed treatment | Concrete value to deliver |
| --- | --- | --- |
| `/` | Keep as the main age calculator; shorten the intro and consolidate repeated explanations | Age on the selected date, a short year/month/day breakdown, total days, a reproducible example, and clear February 29/month-end conventions |
| `/age-difference-calculator` | Keep as a distinct tool | Explain the fixed birth-date interval versus subtracting rounded current ages. Clearly identify earlier/later dates; show a sibling example and same-date limitation |
| `/date-difference-calculator` | Keep; add an explicit inclusive-day option | Show elapsed days versus dates counted including both endpoints. Apply inclusion to the day count with a clear label; keep the calendar interval definition unambiguous. State that weekends/holidays are included |
| `/birthday-countdown-calculator` | Keep; simplify the display | Show the next birthday date and local timezone context. Explain midnight, today’s birthday, February 29, and the difference between calendar days and remaining 24-hour periods |
| `/how-to-calculate-age` | Keep as the canonical method guide | A short worked calculation table, birthday-boundary example, month-end example, and a reproducible link into the calculator. Main pages link here for deeper detail |
| `/leap-year-age-calculator` | Keep as a focused guide | A comparison table for February 28/29/March 1 across leap and non-leap years; clearly distinguish this tool’s anniversary convention from an institution’s rule |
| `/child-age-calculator` | Keep only with a child-focused result presentation | Lead with completed months plus remaining days, and completed weeks plus remaining days. Explain why four weeks is not one calendar month; keep the chronological-age limitation and avoid medical interpretation |
| `/age-calculator-for-school-admission` | Keep as a practical cut-off-date guide; correct the title’s implication of checking eligibility | Label the target as the cut-off date, show before/on/after examples, and offer a concise record of DOB, reference date, and age. Use hypothetical rules unless an identified official source is checked |
| `/age-calculator-for-passport-visa` | Consolidate the useful date-entry and reference-date guidance into `/how-to-calculate-age` by default | Current material largely reuses the general calculator and has no jurisdiction-specific rules. Preserve useful material, then 301 redirect to the relevant guide section and update links/sitemap. Retain separately only if verified demand and a distinct, source-supported task justify it |
| `/all-tools` | Keep as a concise directory; keep ad-free | Group four core tools and supporting guides, with one useful sentence explaining when to choose each. Navigation does not need an artificially long article |
| `/about-us` | Strengthen factual publisher information | Confirm public operator details, purpose, calculation conventions, maintenance process, and correction responsibility |
| `/contact-us` | Keep short and functional | Verify a monitored contact channel; tell users how to reproduce a bug using invented dates. Do not claim email delivery has been tested when it has not |
| `/privacy-policy` | Align with the deployed implementation | Accurately describe hosting, theme storage, sharing, external requests, and the actual state of ads/analytics and consent controls |
| `/terms-and-conditions`, `/disclaimer` | Keep concise and accurate; keep ad-free | Clear scope and limitations, accessible from the footer, without turning them into keyword pages |
| `/404` and unknown URLs | Keep as recovery screens; keep ad-free | Correct status/noindex and a simple route back to working tools |

Reusing a calculator component is not itself a violation. The concern is pages that offer no distinct task or explanation. Before consolidating a URL, check available traffic/backlinks, preserve genuinely useful content, and use a relevant redirect rather than sending every retired page to the homepage.

Do not add year-of-birth landing-page batches, generic AI articles, or competitor paraphrases. AI can assist drafts, but publication requires substantive review, accurate examples, and an identifiable user benefit. Google’s spam policies address scaled content created primarily to manipulate rankings. [Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

## 5. Priority 2: simpler visual design and components

**Proposed direction:** a compact, neutral interface with one restrained green accent, readable text, and a single primary action. Interpret the request for “ChatGPT components” as this simple visual direction and reusable React components; no ChatGPT integration is needed for the calculator. Keep the existing React/TypeScript/Tailwind stack unless a specific component need justifies a dependency.

| Design token | Proposed light theme |
| --- | --- |
| Page background | `#F7F7F5` |
| Surface | `#FFFFFF` |
| Main text | `#202124` |
| Secondary text | `#5F6368` |
| Primary action/link | `#0F6B50` |
| Border | `#DADCE0` |

These are starting tokens; verify contrast, focus states, and dark-theme equivalents during implementation.

Changes grounded in the current components:

- Reduce the large hero margins in `Hero.tsx` and the repeated spacing in `App.tsx`, bringing the form closer to the title on mobile.
- Use one calculator surface instead of nested cards, with plain date fields and one primary calculate button.
- Show the primary result and a short explanation first. Move secondary units into a compact expandable area. Keep the selected target date visible.
- Move the live age counter behind an optional control so “age now” does not compete with “age on the selected date.”
- Replace gradient/glowing share buttons and hover scaling with a quiet secondary action. Preserve sharing disclosure and safe cancellation behavior.
- Remove continuous decorative confetti or make celebration optional and respect reduced motion.
- Use a narrow reading column, compact example tables, and native FAQ disclosures. Remove the FAQ search box where a short question list is easier to scan.
- Replace the current site-wide block of up to ten related links with two or three links relevant to the current page.
- Keep keyboard access, visible labels/focus, result announcements, native date input behavior, and usable light/dark themes. Verify at 320, 390, 768, and 1440 px and at browser zoom.

Proposed reusable pieces: `PageIntro`, `CalculatorPanel`, `ResultSummary`, `CalculationBreakdown`, `WorkedExampleTable`, `MethodNote`, `RelatedLinks`, and the existing native FAQ component. These are proposed project components, not an assertion that an official component package has been selected.

The goal is shorter navigation and presentation while retaining the explanations that make the page valuable. A color change is a usability improvement, not an AdSense policy fix.

## 6. Advertising and publisher trust

Google disallows ads on screens without publisher content, with low-value content, under construction, or primarily serving navigation/behavioral purposes. Error pages are among its examples. This supports prioritizing the production loader and content fixes. [Publisher-content policy](https://support.google.com/publisherpolicies/answer/11112688?hl=en)

When advertising is introduced after remediation and the appropriate account steps:

- Use explicit route eligibility that defaults to no ads. Our conservative site policy keeps directory, About, Contact, legal, error, and any unfinished pages ad-free; this is not a claim that all About/legal pages are universally prohibited ad inventory.
- Start with a deliberate placement after substantive content. Keep advertisements away from inputs, calculate/share controls, navigation, and overlays, and label them clearly. Review desktop/mobile placement and client-side route transitions before expanding inventory. [Google Publisher Policies](https://support.google.com/admanager/answer/10502938?hl=en)
- Configure and test the appropriate consent integration before enabling applicable advertising. Google requires a certified CMP integrated with TCF for personalized ads in the EEA, UK, and Switzerland. Non-personalized ads are not a universal exemption from consent obligations. [Google CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en)
- Test accept, refuse, withdrawal, stored choices, regional behavior, and calculator usability. Timers, scrolling, and calculation clicks must not be treated as consent.
- Keep dates of birth and shared date parameters out of analytics/ad targeting. Check actual outgoing requests and update privacy copy to match.

Confirm the real public publisher identity. On November 21, the owner supplied `support.agecalculater@gmail.com`, replacing the old domain mailbox; the public pages now use this address. Keep the Gmail inbox monitored. Delivery has not been independently tested. Do not invent a name, credentials, address, or successful delivery test.

## 7. Implementation sequence and completion checks

| Stage | Work | Evidence required before moving on |
| --- | --- | --- |
| A. Release baseline | Preserve current changes, trace production build, verify environment/configuration, run existing checks | Identified source/build/deploy relationship and reproducible complete HTML output |
| B. Content and tool improvements | Apply the page decisions, add distinct result modes/examples, update titles and contextual links | Each retained page has a distinct purpose; every published example is verified; approved consolidation has redirects and updated sitemap |
| C. Interface simplification | Apply theme tokens and compact shared components | Mobile/desktop review, keyboard/zoom/contrast checks, no lost content or calculator functionality |
| D. Release verification | Deploy the intended build and rerun HTTP/browser checks on the actual domain | Recorded release ID, passing production checks, complete initial HTML, no unwanted loaders/requests |
| E. Review preparation | Confirm publisher/contact details, inspect Search Console rendering/crawl issues where available, resolve account-specific notices | Dated production evidence and an accurate readiness statement before requesting AdSense review |

### Technical acceptance criteria

- Run `npm run build` (already includes unit tests, TypeScript, generation, and static checks); adapt validations to the final route inventory rather than retaining hard-coded 16-page assertions.
- Extend meaningful regression tests for changed behavior: inclusive counts, child units, boundary examples, leap birthdays, reversed/equal/invalid dates, and DST distinctions. Expected examples should not be generated only by the function being tested.
- Run the existing browser smoke/interaction scripts after updating their expectations. Check result refresh, Enter submission, cleared fields, share cancellation, route state reset, back/forward behavior, and initial hydration.
- Verify retained routes with JavaScript enabled and disabled. The calculator can require JavaScript; explanatory publisher content and navigation must remain readable without it.
- Run `npm run audit:live` after deployment. Extend it to verify any new redirects, FAQ/example content, expected assets, and current release identity; exact string checks alone do not assess editorial quality.
- Check slash/non-slash paths, HTTP/HTTPS and www normalization, canonical URLs, sitemap membership, robots access, `ads.txt`, 404 responses, and direct deep links. No redirect loops or soft 404s.
- In a fresh browser, inspect network activity after waiting beyond the old 15-second loader delay, interacting, calculating, and navigating to an error page. The ad-free release must make no ad/analytics requests.
- Record accessibility/layout/performance findings from the deployed release. Fix significant regressions; do not present a performance score as an AdSense approval threshold.

### Editorial acceptance criteria

- Every retained calculator page explains its actual result and at least one relevant edge case.
- Every guide contributes information beyond the main calculator page; remove or consolidate overlap.
- No unsupported eligibility promises, medical interpretations, fake reviews, fabricated publisher identity, or misleading revision dates.
- Important content is readable in initial HTML and remains visible/useful after hydration.
- The site has a verifiable correction/contact route and privacy statements that match observed behavior.

### Before requesting review

Verify the public release first, then use available Search Console tools to inspect representative pages and submit the updated sitemap. Search indexing and AdSense review are separate processes; do not invent a minimum page count, traffic quota, waiting period, or requirement that every page be indexed. Review the current account notice before resubmitting. Google reviews the whole site. [AdSense review and connection process](https://support.google.com/adsense/answer/7584263?hl=en)

## 8. Scope of this deliverable

This single document is the proposed implementation plan and current audit summary. No application source, theme, page copy, hosting configuration, or AdSense setting was changed during this planning pass. The supporting HTTP report is generated evidence only. Implementation, production deployment, and a review request are subsequent steps after the plan is accepted.
