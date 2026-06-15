import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AgeCalculator } from './components/AgeCalculator';
import { ContentSection } from './components/ContentSection';
import { FAQItem } from './components/FAQItem';
import { SeoManager } from './components/SeoManager';
import { DateDifferenceCalculator } from './components/DateDifferenceCalculator';
import { BirthdayCountdownCalculator } from './components/BirthdayCountdownCalculator';
import { useTheme } from './hooks/useTheme';
import { Input } from './components/ui/Input';
import {
    footerLinks,
    homepageFaqs,
    pageDefinitions,
    pageMap,
    relatedResources,
    siteUrl,
    toolDirectory,
    type PageMeta,
} from './siteContent';

const normalizePath = (path: string) => {
    if (!path || path === '/') {
        return '/';
    }

    return path.endsWith('/') ? path.slice(0, -1) : path;
};

const linkClass =
    'font-semibold text-sky-700 underline decoration-sky-300 underline-offset-4 transition-colors hover:text-sky-600 dark:text-sky-300 dark:decoration-sky-500 dark:hover:text-sky-200';

const breadcrumbSchema = (page: PageMeta) => {
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

const webAppSchema = (page: PageMeta) => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: page.heading,
    url: `${siteUrl}${page.path}`,
    description: page.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
});

const homepageSchema = {
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

const ArticleSections: React.FC<{ sections: NonNullable<PageMeta['sections']> }> = ({ sections }) => (
    <div className="space-y-10">
        {sections.map((section) => (
            <ContentSection key={section.title} title={section.title}>
                <div className="prose-copy text-slate-600 dark:text-slate-300 leading-relaxed">
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && (
                        <ul className="list-disc list-outside space-y-2 pl-5">
                            {section.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </ContentSection>
        ))}
    </div>
);

const ToolIntroSections: React.FC<{ title: string; paragraphs: string[] }> = ({ title, paragraphs }) => (
    <ContentSection title={title}>
        <div className="prose-copy text-slate-600 dark:text-slate-300 leading-relaxed">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
    </ContentSection>
);

const ToolStepsSection: React.FC<{ title: string; steps: string[]; details?: string[] }> = ({ title, steps, details }) => (
    <ContentSection title={title}>
        <div className="prose-copy text-slate-600 dark:text-slate-300 leading-relaxed">
            <ul className="list-disc list-outside space-y-2 pl-5">
                {steps.map((step) => (
                    <li key={step}>{step}</li>
                ))}
            </ul>
            {details?.map((detail) => <p key={detail}>{detail}</p>)}
        </div>
    </ContentSection>
);

const EmbeddedAgeCalculatorPage: React.FC<{ sections: NonNullable<PageMeta['sections']> }> = ({ sections }) => (
    <div className="space-y-12">
        <section className="rounded-[1.75rem] bg-white p-3 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900/90 dark:ring-slate-700">
            <AgeCalculator />
        </section>
        <ArticleSections sections={sections} />
    </div>
);

const HomePage: React.FC<{ faqSearch: string; setFaqSearch: (value: string) => void }> = ({ faqSearch, setFaqSearch }) => {
    const filteredFaqs = homepageFaqs.filter((faq) =>
        faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
    );

    return (
        <div className="space-y-16">
            <section className="rounded-[2rem] bg-gradient-to-br from-sky-100 via-white to-emerald-100 p-6 shadow-sm ring-1 ring-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:ring-slate-700 md:p-10">
                <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
                    <div className="space-y-6">
                        <div className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-sky-200 dark:bg-slate-800 dark:text-sky-300 dark:ring-slate-700">
                            Exact age in years, months, and days
                        </div>
                        <div className="space-y-4 text-slate-700 dark:text-slate-200">
                            <p>
                                This age calculator helps you measure the exact calendar age between a date of birth and a target date. Instead of giving a rough estimate, it counts full years first, then the remaining months, and then the leftover days so the result matches the way people normally express age.
                            </p>
                            <p>
                                That makes it useful for everyday questions like &quot;How old am I today?&quot; and for more specific checks such as school cut-off dates, passport or visa forms, birthday planning, and record keeping. You can use today as the target date or choose a future or past date when you need the answer for a particular deadline.
                            </p>
                            <p>
                                We also explain the method behind the calculation, including how leap years affect the count and why different websites sometimes show slightly different answers. The goal is to give you a reliable tool supported by enough context to understand the result rather than a thin results-only page.
                            </p>
                        </div>
                    </div>
                    <div className="rounded-[1.75rem] bg-white/90 p-3 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900/90 dark:ring-slate-700">
                        <AgeCalculator />
                    </div>
                </div>
            </section>

            <ContentSection title="How to use the age calculator">
                <div className="prose-copy text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>Using the tool is simple, but a few details help you get the most accurate result.</p>
                    <ul className="list-disc list-outside space-y-2 pl-5">
                        <li>Enter the date of birth carefully and make sure the day and month are in the right order.</li>
                        <li>Choose the target date. For most people that will be today, but you can select any other date if you need an age on a cut-off day.</li>
                        <li>Click calculate to view the exact age in years, months, and days.</li>
                        <li>Use the live counter and total summary when you want a broader view in months, weeks, days, hours, and seconds.</li>
                    </ul>
                    <p>
                        If the result looks different from what you expected, the most common reason is a small input issue such as reversing the day and month or choosing the wrong target year. Rechecking those values usually resolves the problem quickly.
                    </p>
                </div>
            </ContentSection>

            <ContentSection title="How age is calculated">
                <div className="prose-copy text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                        Accurate age calculation is based on the real calendar, not on a rough average of days per year. A good calculator starts by counting full years between the two dates. If the birthday has not occurred yet in the target year, one year is subtracted. After that, the remaining full months are counted, and finally the leftover days are measured.
                    </p>
                    <p>
                        This method matters because months are not all the same length. February can have 28 or 29 days, while other months may have 30 or 31. Leap years add another layer of complexity, which is why a shortcut formula often gives a less useful answer than a proper calendar-based calculation.
                    </p>
                </div>
            </ContentSection>

            <ContentSection title="Examples">
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            title: 'DOB January 15, 1995 to today',
                            body: 'A current-date check is the most common use. The tool counts all full birthdays that have passed, then shows the remaining months and days after the last birthday.',
                        },
                        {
                            title: 'Age on a future date',
                            body: 'Choose a future target date to estimate eligibility or milestone age for school, events, forms, or family planning.',
                        },
                        {
                            title: 'Child age in months',
                            body: 'For infants and toddlers, parents often care about exact months more than full years. The calculator helps you bridge both views.',
                        },
                    ].map((example) => (
                        <article key={example.title} className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800/60">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{example.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{example.body}</p>
                        </article>
                    ))}
                </div>
            </ContentSection>

            <ContentSection title="Common uses">
                <div className="grid gap-4 md:grid-cols-2">
                    {[
                        'School admission checks against a fixed cut-off date',
                        'Passport, visa, or identity form preparation',
                        'Medical and developmental record keeping',
                        'Job or exam eligibility checks based on age limits',
                        'Birthday planning and milestone tracking',
                        'General date-to-date comparison for personal planning',
                    ].map((item) => (
                        <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70">
                            <p className="font-medium text-slate-700 dark:text-slate-200">{item}</p>
                        </div>
                    ))}
                </div>
            </ContentSection>

            <ContentSection title="Leap year explanation">
                <div className="prose-copy text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                        Leap years matter because they add one extra day to February. Most of the time that difference is invisible to users, but it still affects total-day calculations and exact age results. For people born on February 29, the leap-year issue becomes much more obvious because their exact birth date does not appear in every year.
                    </p>
                    <p>
                        The calculator handles leap years as part of the normal calendar. That said, schools, governments, employers, and other institutions may have their own official interpretation for February 29 birthdays in non-leap years. For those cases, always use the published rule from the authority involved.
                    </p>
                </div>
            </ContentSection>

            <ContentSection title="Privacy note">
                <div className="prose-copy text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                        The age inputs used by the on-page calculator are processed in your browser to generate the visible result. For full advertising and analytics disclosures, review the{' '}
                        <a href="/privacy-policy" className={linkClass}>privacy policy</a>.
                    </p>
                </div>
            </ContentSection>

            <ContentSection title="Frequently asked questions">
                <div className="mb-6 relative">
                    <Input
                        type="search"
                        placeholder="Search questions..."
                        value={faqSearch}
                        onChange={(event) => setFaqSearch(event.target.value)}
                        className="pl-10"
                        aria-label="Search frequently asked questions"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </span>
                </div>
                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq) => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)
                    ) : (
                        <p className="text-slate-500 dark:text-slate-400 py-4 text-center">No questions found matching your search.</p>
                    )}
                </div>
            </ContentSection>

            <ContentSection title="Related tools and guides">
                <div className="grid gap-3 md:grid-cols-2">
                    {relatedResources.map((resource) => (
                        <a key={resource.href} href={resource.href} className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300">
                            {resource.label}
                        </a>
                    ))}
                </div>
            </ContentSection>
        </div>
    );
};

const AllToolsPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => (
    <div className="space-y-12">
        <ContentSection title="Available tools">
            <div className="grid gap-5 md:grid-cols-2">
                {toolDirectory.map((tool) => (
                    <article key={tool.href} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{tool.label}</h2>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{tool.summary}</p>
                            </div>
                            <a
                                href={tool.href}
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate(tool.href);
                                }}
                                className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:hover:bg-sky-900/60"
                            >
                                Open
                            </a>
                        </div>
                        <ul className="mt-4 list-disc list-outside space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                            {tool.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </ContentSection>

        <ContentSection title="How to choose the right tool">
            <div className="prose-copy text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>Use the main age calculator when you want a person&apos;s exact age on today&apos;s date or another specific date.</p>
                <p>Choose the age difference calculator when you need to compare two people, and use the date difference calculator when the task is broader than age, such as projects, appointments, or deadlines.</p>
                <p>The child, school admission, passport, and leap-year pages are especially useful when the age result needs extra context before you rely on it.</p>
            </div>
        </ContentSection>
    </div>
);

const App: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [faqSearch, setFaqSearch] = useState('');
    const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

    useEffect(() => {
        const handlePopState = () => setPathname(normalizePath(window.location.pathname));
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (path: string) => {
        const normalized = normalizePath(path);
        if (normalized !== pathname) {
            window.history.pushState({}, '', normalized);
            setPathname(normalized);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentPage = pageMap[pathname] ?? pageMap['/404'];
    const articlePages = new Set(
        pageDefinitions
            .filter((page) => page.type === 'article' && page.path !== '/404')
            .map((page) => page.path)
    );

    const schema = useMemo(() => {
        if (currentPage.path === '/') {
            return homepageSchema;
        }

        const graph: Record<string, unknown>[] = [breadcrumbSchema(currentPage)];
        if (['/age-difference-calculator', '/birthday-countdown-calculator', '/date-difference-calculator'].includes(currentPage.path)) {
            graph.unshift(webAppSchema(currentPage));
        }

        return {
            '@context': 'https://schema.org',
            '@graph': graph,
        };
    }, [currentPage]);

    let pageBody: React.ReactNode;

    if (currentPage.path === '/') {
        pageBody = <HomePage faqSearch={faqSearch} setFaqSearch={setFaqSearch} />;
    } else if (currentPage.path === '/all-tools') {
        pageBody = <AllToolsPage navigate={navigate} />;
    } else if (currentPage.path === '/age-difference-calculator') {
        pageBody = (
            <div className="space-y-12">
                <DateDifferenceCalculator />
                <ToolStepsSection
                    title="How to use the age difference calculator"
                    steps={[
                        'Enter the first birth date in the start-date field.',
                        'Enter the second birth date in the end-date field.',
                        'Make sure the earlier date is first so the tool can calculate the gap correctly.',
                        'Click Calculate Difference to see the gap in years, months, days, and total units.',
                    ]}
                    details={[
                        'This tool is useful for sibling age gaps, team or research records, and any case where you want a precise person-to-person age comparison.',
                    ]}
                />
                <ToolIntroSections
                    title="When an age difference calculator is useful"
                    paragraphs={[
                        'An age difference calculator is helpful when you want to compare two people’s birth dates without doing calendar math by hand. Families use it for sibling age gaps, researchers use it for records, and couples sometimes use it for simple curiosity.',
                        'The result is most useful when it is expressed in full years, remaining months, and leftover days, because that mirrors how people normally describe a real age gap in everyday life.',
                    ]}
                />
                <ToolIntroSections
                    title="Related information"
                    paragraphs={[
                        'If you want to compare a birth date to today, the main age calculator is usually the better fit. If you want to compare any two calendar milestones rather than two ages, the date difference calculator is often more flexible.',
                    ]}
                />
            </div>
        );
    } else if (currentPage.path === '/birthday-countdown-calculator') {
        pageBody = (
            <div className="space-y-12">
                <BirthdayCountdownCalculator />
                <ToolStepsSection
                    title="How to use the birthday countdown calculator"
                    steps={[
                        'Enter the date of birth once in the birthday field.',
                        'Let the page calculate the next birthday automatically.',
                        'Watch the live countdown in days, hours, minutes, and seconds.',
                        'Use the result for reminders, event planning, or milestone preparation.',
                    ]}
                    details={[
                        'This tool is best when you care about the next birthday specifically, not a general date difference.',
                    ]}
                />
                <ToolIntroSections
                    title="Why birthday countdowns are popular"
                    paragraphs={[
                        'A birthday countdown is practical for planning parties, gift schedules, travel, and reminders. It is also a simple way to turn a date into something more tangible, especially when a milestone birthday is approaching.',
                        'Because the countdown updates over time, it gives a more useful planning view than a static date difference alone.',
                    ]}
                />
                <ToolIntroSections
                    title="Related information"
                    paragraphs={[
                        'If you need the person’s exact age rather than time until the next birthday, switch to the main age calculator. If you need the difference between two fixed dates for a project timeline, use the date difference calculator instead.',
                    ]}
                />
            </div>
        );
    } else if (currentPage.path === '/date-difference-calculator') {
        pageBody = (
            <div className="space-y-12">
                <DateDifferenceCalculator />
                <ToolStepsSection
                    title="How to use the date difference calculator"
                    steps={[
                        'Enter the earlier date as the start date and the later date as the end date.',
                        'Click Calculate Difference to view the result.',
                        'Review both the calendar breakdown and the total months, weeks, days, hours, minutes, and seconds.',
                        'Use the total-unit summary when you need planning numbers for schedules or reports.',
                    ]}
                    details={[
                        'This tool works well for deadlines, project durations, anniversaries, and any other non-age date comparison.',
                    ]}
                />
                <ToolIntroSections
                    title="How a date difference calculator helps"
                    paragraphs={[
                        'Date difference tools are useful far beyond birthdays. You can measure project durations, time until an anniversary, time between appointments, or the span between application deadlines.',
                        'Showing the difference in both calendar units and total units such as days or weeks makes the result easier to apply in real planning work.',
                    ]}
                />
                <ToolIntroSections
                    title="Related information"
                    paragraphs={[
                        'The date difference calculator is broader than the age difference calculator. Use it when the dates are not both birth dates or when you want a general scheduling tool rather than an age-specific comparison.',
                    ]}
                />
            </div>
        );
    } else if (
        [
            '/leap-year-age-calculator',
            '/child-age-calculator',
            '/age-calculator-for-school-admission',
            '/age-calculator-for-passport-visa',
        ].includes(currentPage.path)
    ) {
        pageBody = currentPage.sections ? <EmbeddedAgeCalculatorPage sections={currentPage.sections} /> : null;
    } else if (articlePages.has(currentPage.path)) {
        pageBody = currentPage.sections ? <ArticleSections sections={currentPage.sections} /> : null;
    } else {
        pageBody = (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-slate-600 dark:text-slate-300">
                    Try the{' '}
                    <a
                        href="/"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate('/');
                        }}
                        className={linkClass}
                    >
                        main age calculator
                    </a>{' '}
                    or browse one of the related guides below.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {relatedResources.slice(0, 4).map((resource) => (
                        <a
                            key={resource.href}
                            href={resource.href}
                            onClick={(event) => {
                                event.preventDefault();
                                navigate(resource.href);
                            }}
                            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-sky-400 hover:text-sky-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
                        >
                            {resource.label}
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <SeoManager
                title={currentPage.title}
                description={currentPage.description}
                path={currentPage.path}
                robots={currentPage.noindex ? 'noindex, follow' : 'index, follow'}
                type={currentPage.type}
                schema={schema}
            />
            <Header theme={theme} toggleTheme={toggleTheme} pathname={pathname} onNavigate={navigate} />
            <main className="container mx-auto px-4 py-8 md:py-12">
                <Hero title={currentPage.heading} subtitle={currentPage.intro} />
                <div className="mx-auto max-w-4xl">{pageBody}</div>
            </main>
            <footer className="mt-12 border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-xl">
                            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">AgeCalculater.com</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                Exact age calculation, date difference tools, and practical guides for school, travel, and everyday planning.
                            </p>
                        </div>
                        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        navigate(link.href);
                                    }}
                                    className="text-slate-500 transition hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} AgeCalculater.com. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
