
import React, { ReactNode } from 'react';

interface ContentSectionProps {
    title: string;
    children: ReactNode;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ title, children }) => {
    return (
        <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-slate-200">{title}</h2>
            {children}
        </section>
    );
};