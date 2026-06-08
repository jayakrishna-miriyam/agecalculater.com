import React, { useMemo, useState } from 'react';
import { Card } from './ui/Card';
import { Label } from './ui/Label';
import { DatePicker } from './ui/DatePicker';
import { Button } from './ui/Button';
import { calculateAge, calculateAgeSummary } from '../utils/dateUtils';

export const DateDifferenceCalculator: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasCalculated, setHasCalculated] = useState(false);

    const result = useMemo(() => {
        if (!startDate || !endDate || startDate > endDate) {
            return null;
        }

        return {
            age: calculateAge(startDate, endDate),
            summary: calculateAgeSummary(startDate, endDate),
        };
    }, [endDate, startDate]);

    const handleCalculate = () => {
        setHasCalculated(true);
        if (!startDate || !endDate) {
            setError('Please choose both dates before calculating the difference.');
            return;
        }
        if (startDate > endDate) {
            setError('The start date must be before or equal to the end date.');
            return;
        }
        setError(null);
    };

    return (
        <Card className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <DatePicker id="startDate" value={startDate} onChange={setStartDate} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <DatePicker id="endDate" value={endDate} onChange={setEndDate} />
                </div>
            </div>

            <div className="mt-8">
                <Button onClick={handleCalculate} className="w-full text-base font-semibold py-2.5">
                    Calculate Difference
                </Button>
            </div>

            <div className="mt-8 min-h-[120px]">
                {error && (
                    <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                        {error}
                    </p>
                )}

                {!error && hasCalculated && result && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-4xl font-extrabold text-sky-600 dark:text-sky-400">{result.age.years}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Years</p>
                            </div>
                            <div>
                                <p className="text-4xl font-extrabold text-sky-600 dark:text-sky-400">{result.age.months}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Months</p>
                            </div>
                            <div>
                                <p className="text-4xl font-extrabold text-sky-600 dark:text-sky-400">{result.age.days}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Days</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {[
                                ['Total Months', result.summary.months],
                                ['Total Weeks', result.summary.weeks],
                                ['Total Days', result.summary.days],
                                ['Total Hours', result.summary.hours],
                                ['Total Minutes', result.summary.minutes],
                                ['Total Seconds', result.summary.seconds],
                            ].map(([label, value]) => (
                                <div key={String(label)} className="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-800/60">
                                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{Number(value).toLocaleString()}</p>
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!error && !hasCalculated && (
                    <p className="text-center text-slate-500 dark:text-slate-400">
                        Choose two dates to measure the exact calendar difference between them.
                    </p>
                )}
            </div>
        </Card>
    );
};
