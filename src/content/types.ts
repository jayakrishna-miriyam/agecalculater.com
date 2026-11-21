export interface FAQEntry {
    question: string;
    answer: string;
}

export interface SectionContent {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    links?: { href: string; label: string; icon?: 'mail' }[];
    table?: { caption: string; headers: string[]; rows: string[][] };
    examples?: {
        start: string;
        end: string;
        expected: [number, number, number];
        totalDays: number;
    }[];
}

export interface PageMeta {
    path: string;
    title: string;
    description: string;
    heading: string;
    intro: string;
    type: 'website' | 'article';
    includeInSitemap?: boolean;
    noindex?: boolean;
    sections?: SectionContent[];
    faqs?: FAQEntry[];
    updated?: string;
}

export interface ToolDirectoryItem {
    href: string;
    label: string;
    summary: string;
    highlights: string[];
    group?: 'Calculators' | 'Guides with an age calculator';
}
