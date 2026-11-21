import React from 'react';
import { Icon } from '../ui/Icon';
export const CalculatorHeading: React.FC<{ title: string; description: string; countdown?: boolean }> = ({ title, description, countdown }) => (
    <div className="calculator-heading">
        <span className="calculator-icon"><Icon name={countdown ? 'clock' : 'calendar'} /></span>
        <div><h2>{title}</h2><p>{description}</p></div>
        <span className="calculator-badge">{countdown ? 'LIVE' : 'DATE TOOL'}</span>
    </div>
);
