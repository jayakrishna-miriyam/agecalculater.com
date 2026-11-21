import React from 'react';
import { Icon } from '../ui/Icon';
export const Hero: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="page-intro">
        <div className="eyebrow"><span className="eyebrow-dot" /> A little clarity for every date</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="intro-details"><span><Icon name="calendar" /> Calendar-based calculations</span><span><Icon name="shield" /> No account needed</span></div>
    </div>
);
