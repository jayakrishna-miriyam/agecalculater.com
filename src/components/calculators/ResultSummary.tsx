import React from 'react';
import type { Age } from '../../types';
export const ResultSummary: React.FC<{ age: Age; caption?: string }> = ({ age, caption }) => (
    <div className="result-summary">
        {caption && <p className="result-caption">{caption}</p>}
        <div className="result-grid">
            {(['years', 'months', 'days'] as const).map(unit => <div key={unit} className="result-unit"><strong>{age[unit]}</strong><span>{unit[0].toUpperCase() + unit.slice(1)}</span></div>)}
        </div>
    </div>
);
