import React from 'react';
import { Input } from './Input';

interface DatePickerProps {
    id?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-slate-500 dark:text-slate-400">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const formatDateForInput = (date: Date | null) => {
    if (!date) {
        return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const DatePicker: React.FC<DatePickerProps> = ({ id, value, onChange }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        if (!nextValue) {
            onChange(null);
            return;
        }

        const [year, month, day] = nextValue.split('-').map(Number);
        const nextDate = new Date(year, month - 1, day);

        if (
            Number.isNaN(nextDate.getTime()) ||
            nextDate.getFullYear() !== year ||
            nextDate.getMonth() !== month - 1 ||
            nextDate.getDate() !== day
        ) {
            onChange(null);
            return;
        }

        onChange(nextDate);
    };

    return (
        <div className="relative">
            <Input
                id={id}
                type="date"
                value={formatDateForInput(value)}
                onChange={handleInputChange}
                className="pr-10"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <CalendarIcon />
            </span>
        </div>
    );
};
