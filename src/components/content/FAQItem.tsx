import React from 'react';
import { Icon } from '../ui/Icon';
export const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <details className="faq-item">
        <summary>{question}<Icon name="chevron" /></summary>
        <p>{answer}</p>
    </details>
);
