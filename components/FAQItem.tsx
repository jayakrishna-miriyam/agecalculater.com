import React, { useState, useId } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const panelId = useId();

    return (
        <div className="border-b border-slate-200 dark:border-slate-700 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
            >
                <h3 className="text-md font-semibold text-slate-800 dark:text-slate-200">{question}</h3>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            <div
                id={panelId}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                     <p className="pt-2 text-slate-600 dark:text-slate-400">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};