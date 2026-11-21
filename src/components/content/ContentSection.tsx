import React, { ReactNode } from 'react';
export const ContentSection: React.FC<{ id?: string; title: string; children: ReactNode }> = ({ id, title, children }) => (
    <section id={id} className="content-section"><h2>{title}</h2>{children}</section>
);
