import React, { useMemo, useState } from 'react';
import { Card } from '../ui/Card';
import { CalculatorHeading } from './CalculatorHeading';
import { ResultSummary } from './ResultSummary';
import { Icon } from '../ui/Icon';
import { Label } from '../ui/Label';
import { DatePicker } from '../ui/DatePicker';
import { Button } from '../ui/Button';
import { calculateAge, calculateAgeSummary } from '../../utils/dateUtils';

export const DateDifferenceCalculator: React.FC<{ mode?: 'age' | 'date' }> = ({ mode = 'date' }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasCalculated, setHasCalculated] = useState(false);

    const resetResult = () => {
        setHasCalculated(false);
        setError(null);
    };

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
        <Card className="calculator-panel">
            <CalculatorHeading title={mode === 'age' ? 'Two birthdays. One clear answer.' : 'Find the space between two dates'} description={mode === 'age' ? 'Compare birth dates, from earlier to later.' : 'Choose your start and end dates to measure the interval.'} />
            <form className="calculator-form" onSubmit={event => { event.preventDefault(); handleCalculate(); }}>
                <div className="date-grid">
                    <div className="field-group"><Label htmlFor="startDate">{mode === 'age' ? 'Earlier Birth Date' : 'Start Date'}</Label><DatePicker id="startDate" value={startDate} onChange={date => { setStartDate(date); resetResult(); }} /><p className="field-hint">The earlier of your two dates</p></div>
                    <div className="field-group"><Label htmlFor="endDate">{mode === 'age' ? 'Later Birth Date' : 'End Date'}</Label><DatePicker id="endDate" value={endDate} onChange={date => { setEndDate(date); resetResult(); }} /><p className="field-hint">The date you are measuring up to</p></div>
                </div>
                <Button type="submit" className="calculate-button">Calculate Difference<Icon name="arrow" /></Button>
                <p className="form-note"><Icon name="shield" /> Your calculation stays in your browser</p>
            </form>
            <div className="calculator-result" aria-live="polite">
                {error && <p role="alert" className="error-notice">{error}</p>}
                {!error && hasCalculated && result && <>
                    <ResultSummary age={result.age} caption={mode === 'age' ? 'The difference between your birth dates' : 'Your calendar interval'} />
                    <div className="stats-grid">
                        {[
                            ['Total Months', result.summary.months], ['Total Weeks', result.summary.weeks], ['Total Days', result.summary.days],
                            ['Total Hours', result.summary.hours], ['Total Minutes', result.summary.minutes], ['Total Seconds', result.summary.seconds],
                        ].map(([label, value]) => <div key={String(label)} className="stat-tile"><strong>{Number(value).toLocaleString()}</strong><span>{label}</span></div>)}
                    </div>
                    <p className="form-note">Hours, minutes, and seconds use 24-hour calendar days.</p>
                </>}
                {!error && !hasCalculated && <div className="empty-result"><span className="empty-result-icon"><Icon name="calendar" /></span><div><h3>Every day counts.</h3><p>Choose two dates to measure the exact calendar difference between them.</p></div></div>}
            </div>
        </Card>
    );
};
