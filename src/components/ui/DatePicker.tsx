import React, { useEffect, useId, useRef, useState } from 'react';
import { Input } from './Input';
import { Icon } from './Icon';
import { formatDateForInput, parseInputDate } from '../../utils/dateUtils';
const dateParts = (value: string) => {
    const [year = '', month = '', day = ''] = value.split('-');
    return { day, month, year };
};

export const DatePicker: React.FC<{ id?: string; value: Date | null; onChange: (date: Date | null) => void }> = ({ id, value, onChange }) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const [manual, setManual] = useState(false);
    const valueString = formatDateForInput(value);
    const [parts, setParts] = useState(() => dateParts(valueString));
    const lastEmitted = useRef(valueString);
    useEffect(() => {
        // Keep partial typing intact when the parent receives an incomplete date.
        if (lastEmitted.current !== valueString) {
            setParts(dateParts(valueString));
            lastEmitted.current = valueString;
        }
    }, [valueString]);

    const updatePart = (part: keyof typeof parts, text: string) => {
        const next = { ...parts, [part]: text.replace(/\D/g, '').slice(0, part === 'year' ? 4 : 2) };
        setParts(next);
        const date = parseInputDate(`${next.year}-${next.month.padStart(2, '0')}-${next.day.padStart(2, '0')}`);
        lastEmitted.current = formatDateForInput(date);
        onChange(date);
    };
    const complete = parts.day.length > 0 && parts.month.length > 0 && parts.year.length === 4;
    const invalid = manual && complete && !parseInputDate(`${parts.year}-${parts.month.padStart(2, '0')}-${parts.day.padStart(2, '0')}`);

    return <div className="date-picker">
        {manual ? <>
            <div className="date-entry-parts">
                {(['day', 'month', 'year'] as const).map(part => {
                    const partId = part === 'day' ? fieldId : `${fieldId}-${part}`;
                    return <div key={part}>
                        <label htmlFor={partId}>{part === 'day' ? 'Day' : part === 'month' ? 'Month' : 'Year'}</label>
                        <Input id={partId} type="text" inputMode="numeric" placeholder={part === 'year' ? 'YYYY' : part === 'month' ? 'MM' : 'DD'} maxLength={part === 'year' ? 4 : 2} value={parts[part]} onChange={event => updatePart(part, event.target.value)} aria-invalid={invalid || undefined} aria-describedby={`${fieldId}-entry-hint`} />
                    </div>;
                })}
            </div>
            <p id={`${fieldId}-entry-hint`} className={invalid ? 'date-entry-error' : 'field-hint'}>{invalid ? 'Enter a valid date (for example, 14 / 05 / 1992).' : 'Type the year directly, for example 1992.'}</p>
        </> : <div className="date-field">
            <Icon name="calendar" />
            <Input id={fieldId} type="date" min="1000-01-01" max="3000-12-31" value={valueString} onChange={event => onChange(event.target.value ? parseInputDate(event.target.value) : null)} />
        </div>}
        <button type="button" className="date-entry-toggle" onClick={() => {
            setParts(dateParts(valueString));
            setManual(!manual);
        }}>{manual ? 'Use calendar instead' : 'Enter day, month & year instead'}</button>
    </div>;
};
