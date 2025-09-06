import React, { useState, useRef, useEffect, useCallback } from 'react';
import { formatDateForDisplay, parseDateFromString } from '../../utils/dateUtils';
import { Button } from './Button';
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

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6" /></svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m9 18 6-6-6-6" /></svg>
);

export const DatePicker: React.FC<DatePickerProps> = ({ id, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [displayDate, setDisplayDate] = useState(value || new Date());
    const [focusedDate, setFocusedDate] = useState(value || new Date());
    const [inputValue, setInputValue] = useState<string>(() => formatDateForDisplay(value));
    
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarGridRef = useRef<HTMLDivElement>(null);

    // Sync input value and calendar view from external prop changes
    useEffect(() => {
        if (document.activeElement !== inputRef.current) {
            setInputValue(formatDateForDisplay(value));
        }
        if (value) {
            setDisplayDate(value);
            setFocusedDate(value);
        }
    }, [value]);

    // Focus management when opening/closing calendar
    useEffect(() => {
        if (isOpen) {
            calendarGridRef.current?.focus();
        }
    }, [isOpen]);

    const handleToggle = () => {
        const newIsOpen = !isOpen;
        if (newIsOpen) {
            const initialDate = value || new Date();
            setDisplayDate(initialDate);
            setFocusedDate(initialDate);
        }
        setIsOpen(newIsOpen);
    };

    const handleDateSelect = (date: Date) => {
        onChange(date);
        setInputValue(formatDateForDisplay(date));
        setIsOpen(false);
        inputRef.current?.focus();
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const cleaned = val.replace(/\D/g, '');
        
        let formatted = cleaned;
        if (cleaned.length > 4) {
            formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`;
        } else if (cleaned.length > 2) {
            formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}`;
        }

        setInputValue(formatted);
        const newDate = parseDateFromString(formatted);
        onChange(newDate);

        if (newDate) {
            setDisplayDate(newDate);
            setFocusedDate(newDate);
        }
    };
    
    const handleBlur = () => {
        setInputValue(formatDateForDisplay(value));
    };

    const changeMonth = (offset: number) => {
        const newDisplayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + offset, 1);
        setDisplayDate(newDisplayDate);
        setFocusedDate(newDisplayDate);
    };
    
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        const newDisplayDate = new Date(newYear, displayDate.getMonth(), 1);
        setDisplayDate(newDisplayDate);
        setFocusedDate(newDisplayDate);
    };
    
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value, 10);
        const newDisplayDate = new Date(displayDate.getFullYear(), newMonth, 1);
        setDisplayDate(newDisplayDate);
        setFocusedDate(newDisplayDate);
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.preventDefault();
        let newFocusedDate = new Date(focusedDate);

        switch (e.key) {
            case 'ArrowLeft':
                newFocusedDate.setDate(newFocusedDate.getDate() - 1);
                break;
            case 'ArrowRight':
                newFocusedDate.setDate(newFocusedDate.getDate() + 1);
                break;
            case 'ArrowUp':
                newFocusedDate.setDate(newFocusedDate.getDate() - 7);
                break;
            case 'ArrowDown':
                newFocusedDate.setDate(newFocusedDate.getDate() + 7);
                break;
            case 'Enter':
            case ' ':
                handleDateSelect(focusedDate);
                return;
            case 'Escape':
                setIsOpen(false);
                inputRef.current?.focus();
                return;
            default:
                return;
        }
        
        if (newFocusedDate.getMonth() !== displayDate.getMonth() || newFocusedDate.getFullYear() !== displayDate.getFullYear()) {
            setDisplayDate(new Date(newFocusedDate));
        }
        setFocusedDate(newFocusedDate);
    };

    const today = new Date();
    const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 301 }, (_, i) => currentYear - 100 + i);
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
    
    const monthYearId = React.useId();

    return (
        <div className="relative" ref={containerRef}>
            <div className="relative flex items-center">
                 <Input
                    ref={inputRef}
                    id={id}
                    type="text"
                    placeholder="DD-MM-YYYY"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={handleBlur}
                    className="pr-10"
                    maxLength={10}
                    aria-haspopup="grid"
                    aria-expanded={isOpen}
                />
                <button
                    type="button"
                    onClick={handleToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Toggle calendar"
                    title="Select Date"
                >
                    <CalendarIcon />
                </button>
            </div>
           
            {isOpen && (
                <div className="absolute z-10 mt-2 w-full min-w-[300px] rounded-md border bg-white dark:bg-slate-800 dark:border-slate-700 shadow-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                        <Button variant="ghost" size="icon" onClick={() => changeMonth(-1)} aria-label="Previous month" title="Previous Month"><ChevronLeftIcon /></Button>
                        <h2 id={monthYearId} className="flex-grow flex justify-center items-center gap-2" aria-live="polite">
                            <select
                                value={displayDate.getMonth()}
                                onChange={handleMonthChange}
                                aria-label="Select month"
                                className="cursor-pointer rounded-md border border-slate-300 dark:border-slate-600 bg-transparent py-1 px-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                {months.map((month, index) => (
                                    <option key={month} value={index} className="bg-white dark:bg-slate-800">
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={displayDate.getFullYear()}
                                onChange={handleYearChange}
                                aria-label="Select year"
                                className="cursor-pointer rounded-md border border-slate-300 dark:border-slate-600 bg-transparent py-1 px-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                {years.map(year => (
                                    <option key={year} value={year} className="bg-white dark:bg-slate-800">
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </h2>
                        <Button variant="ghost" size="icon" onClick={() => changeMonth(1)} aria-label="Next month" title="Next Month"><ChevronRightIcon /></Button>
                    </div>
                    <div
                        ref={calendarGridRef}
                        role="grid"
                        aria-labelledby={monthYearId}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                        className="outline-none"
                    >
                        <div role="row" className="grid grid-cols-7 gap-y-1 text-center text-xs text-slate-500 dark:text-slate-400">
                            {weekDays.map(day => <div key={day} role="columnheader" aria-label={new Date(2000,0,day.charCodeAt(0) % 7).toLocaleDateString(undefined, {weekday: 'long'})}>{day}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-y-1 mt-2">
                            {emptyDays.map(i => <div key={`empty-${i}`} role="gridcell" className="pointer-events-none"></div>)}
                            {days.map(day => {
                                const dayDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
                                const isSelected = value && value.getTime() === dayDate.getTime();
                                const isToday = today.getTime() === dayDate.getTime();
                                const isFocused = focusedDate.getTime() === dayDate.getTime();
                                
                                const dayLabel = dayDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                                return (
                                    <div key={day} role="gridcell" aria-selected={isSelected} className="flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => handleDateSelect(dayDate)}
                                            aria-label={`Select ${dayLabel}`}
                                            tabIndex={-1}
                                            className={`w-9 h-9 flex items-center justify-center rounded-md text-sm transition-colors
                                                ${isSelected ? 'bg-sky-600 text-white hover:bg-sky-700' : 'text-slate-900 dark:text-slate-100'}
                                                ${isFocused ? 'ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-800' : ''}
                                                ${!isSelected && isToday ? 'bg-slate-200 dark:bg-slate-700' : ''}
                                                ${!isSelected && !isToday ? 'hover:bg-slate-100 dark:hover:bg-slate-700/50' : ''}
                                            `}
                                        >
                                            {day}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <Button variant="ghost" onClick={() => { onChange(null); setInputValue(''); setIsOpen(false); }}>Clear</Button>
                        <Button variant="ghost" onClick={() => { handleDateSelect(new Date()); }}>Today</Button>
                    </div>
                </div>
            )}
        </div>
    );
};