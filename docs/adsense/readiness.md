# SEO and AdSense readiness — November 21, 2026

The repository changes address the implementation issues in [the original issue notes](issues.md). They do not constitute an AdSense approval, a production deployment, a Search Console submission, or verification of indexing. Google decides site eligibility after reviewing the deployed site.

## November 21, 2026: Netlify build configuration fix

The first deployment of commit `4880dd7` failed because Netlify did not have `ADSENSE_PUBLISHER_ID`; the ignored local `.env` was not available there. Added the existing public publisher ID and Search Console verification token to `[build.environment]` in `netlify.toml`. Both values are already emitted publicly in HTML/ads.txt. Private credentials remain excluded from Git. This supersedes the manual Netlify-variable setup instructions in earlier audit entries. Validation remains strict, and this configuration does not enable advertising or analytics.

Validated an archived Git snapshot without `.env`, supplying only the two identifiers extracted from its `netlify.toml` and reusing the installed dependencies. The complete build passed: 12 tests, TypeScript, client/SSR builds, and all 16 generated-page checks. This reproduces the missing-local-environment condition; it does not substitute for confirming the subsequent hosted Netlify deployment.

## November 21, 2026: consent controls prepared; account activation pending

The owner confirmed that European/US messages have not yet been published or that their status is unknown. **The certified CMP is not active in this build.** This work adds the website-side access and API adapter, not a replacement CMP or an assertion of regional legal compliance. No account messages were created/published and no advertising, analytics, or CMP network loader was enabled.

Implemented:

- A permanent **Privacy and cookie settings** footer entry on every route, including 404. With an available EU CMP, it reopens Google's message on the current page through the documented callback queue. Otherwise it links to `/privacy-policy#privacy-settings`, which also works without JavaScript.
- A matching, accessible settings section on Privacy, with a conditional **Change or withdraw consent** control, a truthful current ad-free status, and error/help text if the provider fails. Opening settings does not grant consent. No separate local consent record or fabricated TCF/GPP string is written.
- TCF callbacks are used only to determine whether the EU control applies, not to authorize tracking. Listener cleanup handles navigation and delayed responses. Google's automatic US **Do Not Sell or Share My Personal Information** link remains owned by Google; its override is deliberately not set. US status is used only for link guidance, never to infer the user's current opt-out decision.
- Build checks require the settings entry and destination, while continuing to reject ad/analytics loaders. Unit tests cover region readiness, failures, timeouts, late callbacks, and cleanup. Browser tests use provider doubles: they do not prove that real Google messages load, that a choice persists, or that ad requests honor it.

### Account setup to complete next

1. In AdSense, open **Privacy & messaging → European regulations → Create** and select `agecalculater.com`. Use `https://agecalculater.com/privacy-policy` as the privacy URL and English for this English-language site. Review actual ad partners/purposes. Show **Consent**, **Do not consent**, and **Manage options**, with readable, equally accessible choices; enable refusal wherever the message is displayed. Use EEA/UK/Switzerland targeting, or broader targeting if appropriate to the site's actual processing. Review the message preview, then publish. These are recommended settings for this site, not an account action already performed. [Google creation guide](https://support.google.com/adsense/answer/10960768?hl=en).
2. Under **US state regulations**, create a separate message for this site, use the **All current and future supported US states** targeting option, review partners, and retain Google's own opt-out link. Preview and publish. Review the account's handling of Global Privacy Control and applicable opt-out signals as part of live testing. Do not infer opt-out from a missing callback. [Google US setup](https://support.google.com/adsense/answer/10960771?hl=en).
3. Confirm both messages show as published for the correct domain. Record their settings and actual partners. Publishing messages alone will **not** make them appear in this checkout: it currently contains verification metadata, not the AdSense JavaScript tag. Google's documented AdSense integration uses the AdSense tag to deploy published messages. The approved account/tag integration is a remaining code-and-account step; do not paste an unverified Funding Choices tag or treat a public publisher ID as proof that messages exist. [Google API/tagging guide](https://developers.google.com/funding-choices/fc-api-docs).
4. Before enabling that tag, coordinate the ad-activation change: update About, Privacy, and the settings component's current ad-free text; establish valid ad placements/page exclusions and consent behavior; revise the existing no-loader build/browser guards to enforce the new requirements. Avoid accidental Auto ads on the 404, directory, or other unsuitable screens. Confirm the real CMP can load and can be reopened on all relevant pages, including Privacy. Keep calculator functionality independent of consent.
5. Test the actual published integration in a controlled deployment: EEA/UK/Swiss consent, refusal, granular choices, reopen/revoke, reload persistence, US opt-out and GPC, unknown/blocked CMP, keyboard/mobile/dark mode, and network/storage behavior before and after choices. Inspect TCF/GPP signals and account diagnostics, not just the presence of a dialog. Review Netlify CSP against real CMP requests; the existing origin allowance is not proof of a successful integration. Current `strict-origin-when-cross-origin` referrer policy matches Google's stated cross-origin referrer requirement.

Google Analytics is still absent. Adding it later needs its own consent-aware tag setup and accurate disclosures; a TCF readiness event does not grant analytics consent. Consent Mode alone is not a certified CMP or a substitute for AdSense's TCF integration. The site must not transmit calculation dates/results in tracking payloads.

Validation: production build, TypeScript, 12 unit tests, all 16 generated-page checks, the new privacy-controls browser suite, and the existing 16-route browser smoke suite passed. Reviewed 320 px light and desktop dark screenshots. The provider was simulated for consent callbacks; actual CMP display, persistence, regional targeting, and ad enforcement remain unverified until account activation and controlled deployment.

Official references: [regional certified CMP requirement](https://support.google.com/adsense/answer/13554116?hl=en), [consent revocation](https://support.google.com/adsense/answer/10959060?hl=en), [Google callback API](https://developers.google.com/funding-choices/fc-api-docs), and [consent mode settings](https://support.google.com/adsense/answer/16053245?hl=en).

## November 21, 2026: pre-launch SEO, integrations, and quality audit

**Assessment:** the local static build passes the technical launch checks below. AdSense delivery and Google Analytics are deliberately disabled, so they are not fully connected or collecting data. Account eligibility, Search Console indexing, production behavior, actual privacy-retention practices, and AdSense approval are not established by local tests. This audit did not push, deploy, submit a sitemap, request review, or modify Google/Netlify accounts.

| Area | Verified locally | Remaining outside this checkout |
| --- | --- | --- |
| SEO and content | All 16 routes have complete initial HTML, one H1, unique titles/descriptions, canonical metadata, working internal links, and route-specific Open Graph/Twitter text. Calculator/guide content has explanations, boundary cases, and 26 checked calendar examples. | Search Console indexing, Google-selected canonicals/snippets, rankings, and independent originality assessment. |
| Sitemap and crawl access | Exactly 15 indexable canonical URLs, no duplicates or 404 entry, page revision dates, and an absolute sitemap URL in robots.txt. | Submit the deployed sitemap and inspect the live URLs. Check any hosting-level crawler restrictions. |
| ads.txt and verification | The generated record uses `pub-3272888926635438` and matches the AdSense meta tag and local configuration. Search Console verification markup is present. | Confirm both environment variables in Netlify and account ownership/status in Google. A tag or ads.txt entry is not an approved account or working ad delivery. |
| Advertising | No automatic ad loader or advertising requests, including the 404 page. | Before activation: actual vendor disclosures, applicable consent controls, account approval, and reviewed placements. Keep error/navigation-only screens free from ads. |
| Analytics | No GA4 measurement ID, Google tag initialization, or analytics requests in the local application. | If analytics is wanted: choose/confirm the GA4 property and web stream, supply its measurement ID, implement applicable consent, update Privacy, and verify Realtime/DebugView. Analytics is separate from the AdSense and Search Console identifiers. |
| Functionality and accessibility | All routes checked with/without JavaScript; calculator validation, manual/native date entry, keyboard controls, sharing cancellation, formatted sharing, mobile menus, themes, tables, and homepage explanations passed. | Real-device coverage beyond tested browsers; independent accessibility review if required. |
| Security and hosting | Netlify build command/publish directory and domain/error rules reviewed. Local sensitive-file requests returned 404; configuration CSP replayed in browser without violations during calculation/theme use. No environment files in dist. | Actual Netlify response headers, TLS, redirects, dashboard integrations, and deployment settings must be checked after publishing. Local preview does not emulate the complete Netlify edge platform. |
| Dependencies | Updated compatible development dependencies; `npm audit` reports zero known vulnerabilities, including development packages. Vite is now 6.4.6 and Rollup 4.68.8. | Restart any previously running Vite development server to load the updated package. Audit results are time-specific, not a security certification. |

Fixes made during this audit:

- Removed the invalid one-item homepage breadcrumb; breadcrumb markup now appears only on indexable subpages with at least two entries. Added regression checks for breadcrumb scope and ordering.
- Removed unused meta-keywords and the unsupported robots.txt Host directive. Shortened the homepage title/description for clearer search previews; no arbitrary word-count threshold was imposed on page content.
- Used a summary social card for the existing square icon and added descriptive image alternative metadata. Preview images remain on the site's own host.
- Removed the obsolete Cloudinary connection permission from Netlify's CSP. Allowed Google origins in the CSP do not themselves load Google scripts or establish account connections.
- Expanded build checks for unique metadata, exact sitemap membership, social metadata consistency, a single canonical, and deployed icon assets.
- Applied compatible dependency security fixes without a forced major-version upgrade. The initial full dependency audit reported nine affected development packages; production dependencies had no reported vulnerabilities. The final full audit reports zero. npm left a locked old Rollup temporary directory during cleanup; the updated dependency tree and build passed. No unrelated process was terminated to remove that directory.

Verification completed:

- Final `npm run build`: nine unit tests, TypeScript, generated-page checks, and build passed.
- Local HTTP audit: 140/140 passed, plus sensitive-file/unknown-route, trailing-slash, and image-response checks.
- Six existing browser suites passed: site smoke (16 routes), calculator interactions, mobile navigation, date entry, content reading, and homepage learning. No unexpected ad/analytics requests or page/hydration errors were observed.
- Local mobile Lighthouse runs on the homepage and Privacy Policy scored **100 performance / 100 accessibility / 100 best practices / 100 SEO**. Homepage measured LCP approximately 1.1 seconds, CLS 0, and total blocking time 40 ms. These are single local lab runs, not production Core Web Vitals or a guarantee of real-user performance. The preview serves uncompressed/no-store responses; production caching/compression and latency still need review. The final subsequent homepage edit changed only metadata text.
- Nonblocking Lighthouse opportunities remain: unused shared JS/CSS, render-blocking CSS, and back/forward-cache limitations in the local preview. These are possible later improvements; repeated score chasing was not used as a launch gate.

### Before publishing and requesting review

1. Confirm the real public operator details and applicable jurisdiction, and establish the email/log retention practices needed to finalize Privacy. The owner supplied `support.agecalculater@gmail.com`; keep it monitored. No email delivery test was sent.
2. Set `ADSENSE_PUBLISHER_ID` and `GOOGLE_SITE_VERIFICATION` in Netlify's build environment using the existing local values. The ignored `.env` is not pushed. Deploy the committed source with `npm run build`, publishing only `dist`. Include the updated lockfile and local icon asset.
3. After deployment, run `npm run audit:live`; verify the production favicon/social image, HTTPS and www redirects, headers, real 404, robots.txt, sitemap, ads.txt, and calculator/share behavior. Check Netlify's Pretty URLs behavior against the canonical URLs; do not add a forced trailing-slash redirect that loops under Netlify's URL normalization.
4. Verify the Search Console property, submit `https://agecalculater.com/sitemap.xml`, and inspect representative calculator and guide URLs. Submission is a discovery step, not guaranteed indexing or a universal AdSense prerequisite.
5. Once the deployed issues are resolved, request AdSense review. Before serving ads, configure and test consent/withdrawal behavior and placements. Google requires a certified CMP integrated with the TCF for personalized ads in the EEA, UK, and Switzerland; other applicable consent obligations still apply.
6. Treat GA4 as a separate setup task if wanted. Do not send birth dates, calculated ages, shared-result query/fragment values, or support email content as analytics event data. Review automatic page-location collection before enabling any tracker on result links.

The latest production audit earlier in this session still found the older deployment (61 comparison failures, including its automatic ad loader). Those are implementation comparisons, not 61 separate policy violations. The local improvements are not visible to Google's reviewers until deployed.

Evidence: `output/prelaunch-http-audit.json`, `output/prelaunch-details.json`, `output/dependency-audit.json`, `output/prelaunch-*.txt`, and `output/lighthouse-*-mobile.json`. These are ignored local artifacts.

Sources: [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [breadcrumb requirements](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en), [GA4 setup](https://support.google.com/analytics/answer/9304153?hl=en), [Netlify redirects and URL normalization](https://docs.netlify.com/manage/routing/redirects/redirect-options/), and [Google CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en). Existing FAQ structured data still describes visible questions, but it is not a promise of a Google FAQ rich result: [Google retired that feature in May 2026](https://developers.google.com/search/updates#may-2026).

## November 21, 2026: owner-supplied support email

The owner supplied `support.agecalculater@gmail.com` as the site's support address. About, Contact, Privacy, and Terms now use it in visible text and all email links, including the privacy-inquiry subject link. Disclaimer continues to link to Contact. Privacy identifies Google Gmail as the support-mail provider and links to Google's Privacy Policy. This supersedes earlier references below to the old domain mailbox and an unknown email provider. No email was sent and delivery was not independently tested; the site's own retention practices and operator details remain outstanding.

## November 21, 2026: final local content review

Rechecked About, Terms, Disclaimer, and Privacy against the application's date handling, storage, sharing, hosting, and advertising behavior. Also checked Contact for consistency. Shortened repeated explanations and removed publisher-facing CMP/framework setup instructions and account-contract commentary from the visitor pages; those implementation requirements remain in this document. Kept the conditional advertising-cookie disclosures and Google data-use/opt-out links, along with current ad-free status, Netlify hosting, WhatsApp disclosure, and applicable user rights. Consolidated image delivery into the website-delivery row. No Cloudinary references remain in the application source or generated website.

Validation after cleanup: nine unit tests, TypeScript, build, and all 16 generated-page checks passed. All four revised pages passed browser checks at 320, 390, and 1440 px, with working section targets and footer links; all four passed the 320 px JavaScript-disabled checks. No page errors or ad/analytics requests were observed.

**Status: locally reviewed and technically validated, with final legal publication details still unresolved.** The owner has chosen to retain the brand and existing email for now. Legal operator/jurisdiction, a verified monitored mailbox, email provider, actual retention criteria, and any jurisdiction-specific processing grounds/transfer disclosures still need confirmation. A generic policy cannot establish those facts. Advertising activation additionally requires accurate active-vendor disclosures and tested consent controls where applicable. This review did not deploy the site, enable ads, accept an account agreement, or establish AdSense approval. Deploy the matching complete build when publishing the policies; do not pair its ad-free statements with the older live advertising loader.

Rechecked [Google's required privacy content](https://support.google.com/adsense/answer/1348695?hl=en), [publisher privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794?hl=en), and [ICO privacy-information guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/) for the limits of the readiness assessment. The latter applies only if that legal regime covers the operator/processing.

## November 21, 2026: image hosting consolidated on Netlify

Moved the existing icon image into `public/site-icon.webp` and changed the favicon and Open Graph/Twitter image URLs to the site's own host. The next deployment will serve these assets through Netlify instead of Cloudinary. Removed the Cloudinary disclosure and policy link from the public Privacy Policy, and updated About to describe same-site image delivery. Historical notes below describe the earlier implementation. This change is local; the live site and cached social previews will not change until deployment and cache refresh.

## November 20, 2026: About and legal-page revision

Rewrote About, Terms and Conditions, Disclaimer, and Privacy Policy for the actual local application. They describe the free calculators, calendar conventions, selected-date versus live displays, responsible use, correction requests, external services, and rights that cannot lawfully be waived. Privacy now includes a feature-by-feature information table, browser theme storage, native sharing and clipboard fallback, WhatsApp's prepared-message request, shared-link visibility, contact correspondence, children’s dates, and conditional privacy rights.

The owner requested retaining the AgeCalculater.com brand and existing `hello@agecalculater.com` address for now, with operator details to be changed later. On November 21, the owner confirmed Netlify as the hosting provider; About and Privacy now name Netlify, and Privacy links to its [privacy information](https://www.netlify.com/privacy/). The email provider and retention periods remain unconfirmed. No operator identity, jurisdiction, mailbox verification, provider retention schedule, or legal certification has been invented.

**Local drafting and technical validation are complete; legal and advertising readiness are not certified.** Before publishing these as final policies, establish the legal operator/contact details and applicable jurisdiction, verify the mailbox, identify the email provider and actual hosting/email records retained, and document retention periods or meaningful retention criteria. Depending on applicable law, add the relevant processing grounds, transfer safeguards, regulator/contact information, and any further required disclosures. A jurisdiction-specific legal review should assess those facts and the final terms. The present generic references to applicable law do not replace missing mandatory particulars.

The disclosures explicitly distinguish the current ad-free local version from future AdSense use. Before enabling ads, identify actual advertising partners and purposes, update the notice, and implement and verify the applicable consent/withdrawal controls and consent records. Google's certified CMP requirement for personalised ads in the EEA, UK, and Switzerland is separate from other consent obligations. Non-personalised ads are not automatically exempt. The publisher must separately review and accept the country-specific AdSense agreement in the account; website terms do not accept that contract. No account agreement was accepted, no advertising was activated, and no deployment was made in this revision. The production gap recorded below remains unresolved.

Validation: nine unit tests, TypeScript, production build, and all 16 generated-page checks passed. The four revised pages passed browser checks at 320, 390, and 1440 px, including section-anchor targets and footer links; all four remained readable without JavaScript at 320 px. Privacy screenshots were reviewed in desktop light and mobile dark modes. No page errors or advertising/analytics requests were observed. The privacy table remains horizontally scrollable on narrow screens. Local evidence: `output/check-policy-pages.js` and `output/playwright/privacy-*.png`.

Official references reviewed for this revision:

- [Google's required privacy-policy content](https://support.google.com/adsense/answer/1348695?hl=en): advertising cookies, partners, and user choices.
- [Google publisher privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794?hl=en): actual collection, sharing, use, and Google data-use information.
- [EU user consent policy](https://www.google.com/about/company/user-consent-policy/) and [certified CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en): consent and withdrawal requirements and regional CMP scope.
- [AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en) and [country-specific AdSense terms](https://adsense.google.com/adsense/terms): publisher conduct and the separate account agreement.
- [ICO privacy-information guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/): an example of disclosures required if that regime applies, not a finding that UK law applies to this operator.
- [Cloudinary privacy information](https://cloudinary.com/privacy) and [WhatsApp privacy information](https://www.whatsapp.com/legal/privacy-policy): linked third-party notices; their terms are not presented as the site's own promises.

## November 20, 2026: content revision and production recheck

Expanded and revised all 15 indexable pages, with task-specific explanations rather than a shared block of filler. The 404 remains a short, noindex recovery page. Core calculators and guides now include worked tables, input and result interpretation, boundary cases, practical record formats, and focused questions. School examples remain hypothetical; no eligibility decision is promised. Privacy wording now reflects result-link restoration, clipboard/native sharing, and the current Cloudinary site icon and preview image.

Added 26 fixed calendar examples alongside the page content and regression checks against the calculation functions and total days. Table captions, headers, and cell contents are checked in the generated HTML. Long pages have section links; tables are keyboard-scrollable on narrow screens. The revision date reflects this content edit, not external expert review.

Local validation: eight unit tests, TypeScript, production build, and all 16 generated-page checks pass. The browser smoke test covers calculator behavior and all routes with and without JavaScript, including mobile overflow and absence of advertising/analytics requests.

**Production remains out of date.** The new read-only audit still finds 61 failed deployment checks: all 15 indexable pages lack the current generated route/content/footer and retain the older automatic ad/analytics loader; the error response retains that loader too. These are implementation comparisons, not 61 separate Google policy violations. Evidence: `output/adsense-content-live-audit.json`. This turn did not deploy the site or request an AdSense review.

Deploy the verified build and rerun the public audit before requesting review. Mailbox delivery, public operator identity, account-specific notices, and Google's assessment remain outside these local checks. Adding content alone does not guarantee approval. Relevant guidance: [publisher-content policy](https://support.google.com/publisherpolicies/answer/11112688?hl=en) and [helpful, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## Historical September 25 local audit: implementation checks passed

Rechecked the production build served at `http://127.0.0.1:4174` after the folder reorganization and `.env` integration. The HTTP report is timestamped `2026-09-26T03:38:52.224Z` (September 25 in the workspace's New York timezone). This pass assessed the local version only; it did not recheck or deploy the public site.

**Assessment:** no new local implementation issue or obvious prohibited-content problem was found. This version is a reasonable candidate to deploy and submit for AdSense review once the deployment and account checks below are complete. These results do not certify Google's assessment of originality, content value, traffic, or account eligibility.

| Area | Local evidence |
| --- | --- |
| Build and calculations | All seven unit tests, TypeScript, production build, and generated-page validation passed. |
| Publisher content | All 16 routes contain complete initial HTML. Calculator methods, worked examples, limitations, guides, and FAQs are readable without JavaScript. |
| Navigation and layout | All 16 routes passed browser checks with and without JavaScript. Footer navigation is present; no horizontal overflow at the tested 390 px mobile width. Desktop and mobile homepage screenshots were inspected. |
| Calculator behavior | Examples, month ends, reversed and missing dates, keyboard submission, countdown behavior, state reset, and canceling sharing without clipboard writes passed. No JavaScript or hydration errors were observed. |
| HTTP and verification | All 140 local HTTP audit checks passed. Additional checks confirmed slash and non-slash routes, real 404/noindex responses, and that `.env` is not served. Generated verification tags and `ads.txt` match the configured identifiers. |
| Privacy and advertising | The disclosures describe browser processing, optional sharing, hosting and image requests, local theme preferences, and possible future Google advertising. Browser checks observed no advertising or analytics requests. Ad placement and consent behavior cannot be tested until advertising is integrated. |

No additional website changes were needed for this pass. Evidence is in `output/adsense-local-audit.json` and `output/playwright/`; these generated artifacts are ignored by Git and can be removed with `npm run clean`.

Before requesting review, configure the two environment variables in Netlify, deploy the tested build, and run the production HTTP audit. Confirm that `hello@agecalculater.com` receives messages and is monitored, and resolve any account-specific AdSense notices. The public operator name remains unspecified; the About page uses the site brand without inventing an identity. Before enabling personalized Google ads in the EEA, UK, or Switzerland, integrate and test a Google-certified CMP; also verify applicable consent and actual ad placements for the intended audience. The current absence of ads is accurately disclosed and does not prevent using Google's supported meta-tag or ads.txt verification method.

Policy references rechecked for this assessment: [Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en-GB), [page readiness](https://support.google.com/adsense/answer/7299563?hl=en), [Program policies](https://support.google.com/adsense/answer/48182?hl=en), [CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en), and [site connection and review methods](https://support.google.com/adsense/answer/7584263?hl=en).

## Earlier production audit: old deployment was not ready for resubmission

Public HTTP checks on September 25, 2026 confirmed that all 15 indexable production pages still serve the earlier build: their initial HTML lacks the revised publisher content and footer and includes the old automatic ad/analytics loader. The 404 response also includes that loader. The confirmed publisher record, public robots file, sitemap URLs, HTTPS responses, and 404 status are present. This is a deployment gap, not a claim of 61 separate Google policy violations.

The local build passes the same deployment checks. Run `npm run audit:live` after publishing `dist`; the timestamped evidence is saved to `output/adsense-live-audit.json`. The checker compares HTTP content with this checkout and does not score content quality or certify Google approval.

Both Google Public DNS and Cloudflare DNS returned no MX records for `agecalculater.com`. That does not by itself prove that email delivery is impossible, because SMTP can use address-record fallback. However, delivery to `hello@agecalculater.com` remains unverified. Confirm the mailbox and incoming-mail DNS settings with the owner's mail provider before relying on it as the site's sole contact. No test email or DNS change was made, and no provider-specific records have been invented.

Additional fixes in this audit: clearing the target date now leaves it empty, changed inputs clear stale results/errors, both calculators support Enter to submit, canceling a native share no longer falls back to copying the birth date, displayed revision dates come from page metadata, and the privacy page describes actual visitor choices rather than internal setup instructions. Build-time tests and content checks now run automatically before a deployment can succeed.

## Implemented

- All 16 routes, including the 404 page, render complete React HTML at build time. The 15 indexable routes appear in the generated sitemap. Descriptions, examples, FAQs, directory links, and footer links are readable without JavaScript. FAQs use native expandable HTML.
- Age, age difference, date difference, and countdown pages explain their actual algorithm, worked examples, unit meanings, leap-day handling, local time, and limitations. Existing guides have distinct worked examples and update dates; no fabricated author or external review claims were added.
- About, Contact, and Privacy pages describe the tools, methods, correction process, browser processing, sharing, hosting, optional advertising technologies, and Google data-use/choice links. Footer navigation includes Home, All Tools, About, Contact, Privacy, Terms, and Disclaimer.
- Fixed month-end negative days, daylight-saving errors in date-only totals, invalid shared-date parsing, and inconsistent leap-day countdowns. February 29 anniversaries now use February 28 in non-leap years. Calendar-hour totals are labeled as 24-hour-day conversions.
- New share links use a URL fragment to keep dates out of HTTP requests. Sharing discloses that recipients can read the dates. Legacy query links remain supported and their logging implications are disclosed.
- Removed the automatic ad/analytics loader and unused ad unit. No scrolling, timer, or calculator interaction is interpreted as consent. No ad requests are made in this build.
- Retained the publisher ID confirmed by the owner: `pub-3272888926635438`. `ads.txt` and the account meta tag agree. Kept the existing Search Console verification token and `hello@agecalculater.com` contact address.
- Google identifiers now come from the ignored local `.env` or hosting build environment. The build generates `ads.txt` and verification meta tags from the same values. Configure `ADSENSE_PUBLISHER_ID` and `GOOGLE_SITE_VERIFICATION` in Netlify before deploying; see [environment setup](../../README.md#environment-configuration). This configuration does not enable ad delivery.
- Unknown production URLs have a 404 response and a noindex page. No SPA wildcard redirects unknown URLs to a successful homepage response.

## Before requesting site review

1. **Deploy this build.** Check the production homepage, all calculator routes, `/all-tools`, trust pages, `/robots.txt`, `/sitemap.xml`, and `/ads.txt`. Confirm HTTPS, successful page responses, and a real 404 for an invented URL. Local build checks cannot prove production routing or crawl access.
2. **Publisher details.** The About page currently identifies the publisher by the AgeCalculater.com brand. Add the public operator or business name when provided; no personal identity has been invented. The owner supplied `support.agecalculater@gmail.com` on November 21; keep this inbox monitored. No test email was sent.
3. **Recommended Search Console checks.** Submit `https://agecalculater.com/sitemap.xml`, inspect the main calculator routes, and check rendered content and indexing status. Search indexing and AdSense approval are separate decisions; sitemap submission is not proof of eligibility or a universal AdSense approval prerequisite.
4. **Request review in AdSense.** The existing verification meta tag or confirmed `ads.txt` record can connect the site without prematurely loading advertising code. Choose the matching verification method in the account. Review any account-specific rejection or policy notices before resubmitting. Account eligibility, publisher details, and traffic sources cannot be verified from the repository. No obvious prohibited-content category was found in the reviewed site content, but Google independently evaluates originality, usefulness, and account compliance.

## Before enabling advertising

1. **Certified consent platform.** In AdSense Privacy & messaging, configure and publish the appropriate message for this site, including the privacy-policy URL and relevant regions. Google's current certified-CMP requirement specifically covers personalized ads in the EEA, UK, and Switzerland. Non-personalized or limited ads are not a blanket exemption from applicable consent obligations. Publication/configuration in the owner's account is not confirmed. A home-made banner or this privacy policy alone cannot replace a required certified CMP. With ads disabled, absence of a CMP is not presented here as a stand-alone prohibition on requesting site review.
2. **Integrate and verify consent before restoring ad delivery.** Use the vendor/account-issued integration instructions. Test acceptance, refusal, withdrawal, persisted choices, region behavior, and the browser network/CSP behavior. Update the privacy policy's current advertising status and document the actual way users reopen their choices. Keep analytics disabled unless separately configured with the required consent. Never send birth dates or shared URL data to ad targeting or analytics.
3. **Ad placements after setup.** Prefer deliberate placements after useful explanatory content, outside calculator inputs, result/share buttons, navigation, and error screens. Label units “Advertisement.” Do not enable unrestricted Auto ads without reviewing exclusions, anchors, and interstitial behavior on mobile. The current site strategy keeps About/Contact/legal, directory-only, and 404 screens free from ads. Review the live experience after every placement change. Do not click your own ads or purchase artificial clicks/impressions.

## Verification commands

`npm test` checks published examples, invalid/reversed dates, identical dates, leap anniversaries, month-end intervals, and date totals in multiple timezones. `npm run build` includes TypeScript checking. `npm run check:site` verifies publisher content in generated HTML, internal links, FAQs, metadata, assets, sitemap membership, and publisher ID consistency.

The second audit's browser checks passed for target-field clearing, keyboard calculation, input-error recovery, date-difference state reset, and canceling sharing without clipboard writes. The updated local HTTP audit passed; the production audit correctly failed against the older live build. These checks do not replace the production deployment or Google review.

Local verification completed: all 16 routes were opened with JavaScript enabled and disabled; native FAQs worked without JavaScript; calculator examples, reversed-date errors, future-date totals, today's birthday, sharing, route state reset, and saved theme behavior passed. Mobile layouts had no horizontal overflow. No hydration errors or advertising/analytics requests occurred. HTTP checks confirmed the 15 public routes with and without trailing slashes, a 404 for an unknown URL, and successful robots/sitemap/ads.txt responses. These are local results, not a production crawl report.

## Official references reviewed

- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en-GB) — content value, placement, privacy disclosure, and authorized inventory.
- [Google CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en) — certified consent management for the EEA, UK, and Switzerland.
- [AdSense site verification](https://support.google.com/adsense/answer/7584263?hl=en) — code, meta tag, and ads.txt verification options.
- [Ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en) — the publisher record must use the account's own ID.
- [Pages ready for AdSense](https://support.google.com/adsense/answer/7299563?hl=en) — useful original content and clear navigation.
- [AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en) — site behavior, traffic sources, and invalid interactions.
- [Account eligibility](https://support.google.com/adsense/answer/9724?hl=en) — own content and eligible account holder.
