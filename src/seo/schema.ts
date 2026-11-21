import { homepageFaqs, siteUrl, type PageMeta } from '../content/index';

export const getPageSchema = (page: PageMeta) => {
    const graph: Record<string, unknown>[] = [{
        '@type': page.type === 'article' ? 'Article' : 'WebPage',
        name: page.heading,
        headline: page.heading,
        description: page.description,
        url: `${siteUrl}${page.path}`,
        ...(page.updated ? { dateModified: page.updated } : {}),
    }];
    if (page.path !== '/' && !page.noindex) graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: page.heading, item: `${siteUrl}${page.path}` },
        ],
    });
    if (page.path === '/') graph.push({ '@type': 'WebSite', name: 'AgeCalculater.com', url: `${siteUrl}/` });
    const faqs = page.path === '/' ? homepageFaqs : page.faqs;
    if (faqs?.length) graph.push({
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
    });
    return { '@context': 'https://schema.org', '@graph': graph };
};
