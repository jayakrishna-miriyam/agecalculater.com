import React, { useState } from 'react';
import AdSenseHorizontal from "./components/AdSenseHorizontal.jsx";
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AgeCalculator } from './components/AgeCalculator';
import { ContentSection } from './components/ContentSection';
import { FAQItem } from './components/FAQItem';
import { useTheme } from './hooks/useTheme';
import { faqs, aboutContent, howItWorksContent, funFactsContent } from './constants';
import { Input } from './components/ui/Input';

const App: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [faqSearch, setFaqSearch] = useState('');

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
    );

    return (
        <div className="min-h-screen">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <AdSenseHorizontal />

            <main className="container mx-auto px-4 py-8 md:py-12">
                <Hero />
                <div className="max-w-4xl mx-auto">
                    <AgeCalculator />

                    <div className="mt-16 space-y-12">
                        <ContentSection title="About Our Age Calculator">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{aboutContent}</p>
                        </ContentSection>
                        
                        <AdSenseHorizontal />
                        
                        <ContentSection title="How It Works">
                             <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{howItWorksContent}</p>
                        </ContentSection>

                        <AdSenseHorizontal />
                        
                        <ContentSection title="Fun Facts About Time & Age">
                             <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                                {funFactsContent.map((fact, index) => (
                                    <li key={index}>{fact}</li>
                                ))}
                            </ul>
                        </ContentSection>
 
                        <AdSenseHorizontal />
                                               
                        <ContentSection title="Frequently Asked Questions">
                            <div className="mb-6 relative">
                                <Input
                                    type="search"
                                    placeholder="Search questions..."
                                    value={faqSearch}
                                    onChange={(e) => setFaqSearch(e.target.value)}
                                    className="pl-10"
                                    aria-label="Search frequently asked questions"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </span>
                            </div>
                            <div className="space-y-4">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map((faq, index) => (
                                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                                    ))
                                ) : (
                                     <p className="text-slate-500 dark:text-slate-400 text-center py-4">No questions found matching your search.</p>
                                )}
                            </div>
                        </ContentSection>
                    </div>
                </div>
            </main>
            <footer className="text-center py-6 border-t border-slate-200 dark:border-slate-800 mt-12">
                <p className="text-sm text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} AgeCalculater.com. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;