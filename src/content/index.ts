import type { PageMeta } from './types.ts';
import { calculatorPages } from './pages/calculators.ts';
import { guidePages } from './pages/guides.ts';
import { informationPages } from './pages/information.ts';
import { directoryPage, notFoundPage } from './pages/utility.ts';

export * from './types.ts';
export { siteUrl, primaryNavLinks, footerLinks } from './site.ts';
export { homepageFaqs } from './faqs.ts';
export { relatedResources, toolDirectory } from './tools.ts';

// One route catalogue for browser rendering, static generation, and audits.
export const pageDefinitions: PageMeta[] = [
    directoryPage,
    ...calculatorPages,
    ...guidePages,
    ...informationPages,
    notFoundPage,
];

export const pageMap = Object.fromEntries(pageDefinitions.map(page => [page.path, page]));
