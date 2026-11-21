import React, { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/layout/Hero';
import { AgeCalculator } from './components/calculators/AgeCalculator';
import { DateDifferenceCalculator } from './components/calculators/DateDifferenceCalculator';
import { BirthdayCountdownCalculator } from './components/calculators/BirthdayCountdownCalculator';
import { ContentSection } from './components/content/ContentSection';
import { FAQItem } from './components/content/FAQItem';
import { SeoManager } from './seo/SeoManager';
import { useTheme } from './hooks/useTheme';
import { Input } from './components/ui/Input';
import { Icon } from './components/ui/Icon';
import { homepageFaqs, pageMap, relatedResources, toolDirectory, type SectionContent } from './content/index';
import { getPageSchema } from './seo/schema';
import { getSectionTable } from './content/presentation';
import { PrivacySettings } from './components/privacy/PrivacySettings';

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';
const linkClass = 'text-link';
const formatUpdatedDate = (date: string) => new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
}).format(new Date(date + 'T00:00:00Z'));

const ArticleSections: React.FC<{ sections: SectionContent[] }> = ({ sections }) => (
    <div className="article-sections">
        {sections.map((section, index) => {
            const table = getSectionTable(section);
            return <ContentSection key={section.title} id={`guide-section-${index + 1}`} title={section.title}>
                <div className="prose-copy">
                    {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && <ul className="list-disc space-y-2 pl-5">{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
                    {table && <><p className="content-table-hint">Scroll sideways to see every column.</p><div className="content-table-scroll" role="region" aria-label={table.caption} tabIndex={0}>
                        <table className="content-table">
                            <caption>{table.caption}</caption>
                            <thead><tr>{table.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
                            <tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
                        </table>
                    </div></>}
                    {section.links && <ul className="space-y-2">{section.links.map(link => <li key={link.href}><a href={link.href} className={link.icon ? `${linkClass} icon-text-link` : linkClass}>{link.icon && <Icon name={link.icon} />}<span>{link.label}</span></a></li>)}</ul>}
                </div>
            </ContentSection>;
        })}
    </div>
);

const App: React.FC<{ initialPath?: string }> = ({ initialPath }) => {
    const { theme, toggleTheme } = useTheme();
    const [faqSearch, setFaqSearch] = useState('');
    const [pathname, setPathname] = useState(() => normalizePath(initialPath ?? (typeof window === 'undefined' ? '/' : window.location.pathname)));

    useEffect(() => {
        const onPopState = () => { setPathname(normalizePath(window.location.pathname)); setFaqSearch(''); };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const navigate = (path: string) => {
        const normalized = normalizePath(path);
        if (normalized !== pathname) {
            window.history.pushState({}, '', normalized);
            setPathname(normalized);
            setFaqSearch('');
        }
        window.scrollTo({ top: 0 });
    };

    const page = pageMap[pathname] ?? pageMap['/404'];
    const agePages = ['/', '/leap-year-age-calculator', '/child-age-calculator', '/age-calculator-for-school-admission', '/age-calculator-for-passport-visa'];
    const faqs = page.path === '/' ? homepageFaqs : page.faqs;
    const filteredFaqs = faqs?.filter(faq => (faq.question + ' ' + faq.answer).toLowerCase().includes(faqSearch.toLowerCase()));

    return (
        <div className="min-h-screen">
            <SeoManager title={page.title} description={page.description} path={page.path} robots={page.noindex ? 'noindex, follow' : 'index, follow'} type={page.type} schema={getPageSchema(page)} />
            <a href="#main-content" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to content</a>
            <Header theme={theme} toggleTheme={toggleTheme} pathname={pathname} onNavigate={navigate} />
            <main id="main-content" className="site-main">
                <Hero title={page.heading} subtitle={page.intro} />
                <div key={page.path} className="page-body">

                    <noscript><p className="info-notice">Enable JavaScript to use the interactive calculators. The explanations, worked examples, links, and FAQs work without JavaScript.</p></noscript>
                    {page.path === '/privacy-policy' && <PrivacySettings />}
                    {agePages.includes(page.path) && <AgeCalculator showLearningTools={page.path === '/'} />}
                    {['/age-difference-calculator', '/date-difference-calculator'].includes(page.path) && <DateDifferenceCalculator mode={page.path === '/age-difference-calculator' ? 'age' : 'date'} />}
                    {page.path === '/birthday-countdown-calculator' && <BirthdayCountdownCalculator />}
                    {page.path === '/all-tools' && ['Calculators', 'Guides with an age calculator'].map(group => (
                        <ContentSection key={group} title={group}>
                            <div className="tool-grid">
                                {toolDirectory.filter(tool => (tool.group ?? 'Calculators') === group).map(tool => (
                                    <article key={tool.href} className="tool-card">
                                        <h3><a href={tool.href}><span className="tool-card-icon"><Icon name={tool.href.includes("birthday") ? "clock" : "calendar"} /></span><span className="tool-card-title">{tool.label}</span><Icon name="arrow" /></a></h3>
                                        <p className="tool-description">{tool.summary}</p>
                                    </article>
                                ))}
                            </div>
                        </ContentSection>
                    ))}
                    {page.updated && <p className="page-updated">Updated <time dateTime={page.updated}>{formatUpdatedDate(page.updated)}</time><span aria-hidden="true"> / </span><a href="/about-us" className={linkClass}>About our methods</a></p>}
                    {page.sections && page.sections.length > 3 && <nav className="article-toc" aria-label="On this page"><p>On this page</p><ul>{page.sections.map((section, index) => <li key={section.title}><a href={`#guide-section-${index + 1}`}>{section.title}</a></li>)}</ul></nav>}
                    {page.sections && <ArticleSections sections={page.sections} />}
                    {faqs && <ContentSection title="Frequently asked questions">
                        <Input className="faq-search" type="search" placeholder="Search questions..." aria-label="Search frequently asked questions" value={faqSearch} onChange={event => setFaqSearch(event.target.value)} />
                        <div className="mt-4">{filteredFaqs?.length ? filteredFaqs.map(faq => <FAQItem key={faq.question} {...faq} />) : <p className="py-4">No questions match your search.</p>}</div>
                    </ContentSection>}
                    {page.path === '/404' && <p><a href="/" className={linkClass}>Return to the age calculator</a> or <a href="/all-tools" className={linkClass}>browse all tools</a>.</p>}
                    <ContentSection title="Related tools and guides">
                        <div className="related-grid">
                            {relatedResources.filter(resource => resource.href !== page.path).map(resource => <a key={resource.href} href={resource.href} className="related-link"><span>{resource.label}</span><Icon name="arrow" /></a>)}
                        </div>
                    </ContentSection>
                </div>
            </main>
            <Footer pathname={page.path} />
        </div>
    );
};

export default App;
