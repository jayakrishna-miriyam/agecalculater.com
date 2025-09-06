
import React, { useState, useEffect, useMemo } from 'react';
import type { LiveAge, AgeSummary, BirthdayCountdown } from '../types';
import { getLiveAge, calculateAgeSummary, calculateNextBirthdayCountdown } from '../utils/dateUtils';

interface LiveAgeCounterProps {
    dob: Date;
    targetDate: Date | null;
}

const CounterBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-lg p-2 min-w-[50px] sm:min-w-[60px]">
        <span className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{String(value).padStart(2, '0')}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</span>
    </div>
);

const NextBirthday: React.FC<{ dob: Date }> = ({ dob }) => {
    const [countdown, setCountdown] = useState<BirthdayCountdown | null>(() => calculateNextBirthdayCountdown(dob));

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(calculateNextBirthdayCountdown(dob));
        }, 1000);

        return () => clearInterval(interval);
    }, [dob]);

    if (!countdown) {
        return null;
    }
    
    return (
        <div>
            <h3 className="text-center text-md font-medium text-slate-600 dark:text-slate-400 mb-4">Next Birthday Countdown</h3>
            {countdown.isBirthdayToday ? (
                 <p className="text-center text-lg font-semibold text-emerald-600 dark:text-emerald-400">It's your birthday today! 🎉</p>
            ) : (
                <div className="flex justify-center items-center gap-2">
                    <CounterBox value={countdown.days} label="Days" />
                    <CounterBox value={countdown.hours} label="Hours" />
                    <CounterBox value={countdown.minutes} label="Mins" />
                    <CounterBox value={countdown.seconds} label="Secs" />
                </div>
            )}
        </div>
    );
};


export const LiveAgeCounter: React.FC<LiveAgeCounterProps> = ({ dob, targetDate }) => {
    const [liveAge, setLiveAge] = useState<LiveAge | null>(getLiveAge(dob));

    const ageSummary = useMemo(() => {
        // Calculate summary based on the targetDate if it exists, otherwise default to now.
        // This makes the summary consistent with the main calculation.
        return calculateAgeSummary(dob, targetDate || new Date());
    }, [dob, targetDate]);

    useEffect(() => {
        // This interval only updates the live, ticking part of the counter.
        const interval = setInterval(() => {
            setLiveAge(getLiveAge(dob));
        }, 1000);
        
        return () => clearInterval(interval);
    }, [dob]);

    if (!liveAge || !ageSummary) {
        return null;
    }

    const summaryItems = [
        { unit: 'Months', value: ageSummary.months },
        { unit: 'Weeks', value: ageSummary.weeks },
        { unit: 'Days', value: ageSummary.days },
        { unit: 'Hours', value: ageSummary.hours },
        { unit: 'Minutes', value: ageSummary.minutes },
        { unit: 'Seconds', value: ageSummary.seconds },
    ];

    return (
        <div className="mt-8 pt-6 border-t border-dashed border-slate-300 dark:border-slate-600 space-y-8">
            <div>
                 <h3 className="text-center text-md font-medium text-slate-600 dark:text-slate-400 mb-4">Live Age Counter</h3>
                 <div className="text-center mb-4">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{liveAge.years}</span> years, <span className="font-bold text-slate-800 dark:text-slate-200">{liveAge.months}</span> months, and <span className="font-bold text-slate-800 dark:text-slate-200">{liveAge.days}</span> days
                 </div>
                 <div className="flex justify-center items-center gap-2 md:gap-3">
                    <CounterBox value={liveAge.hours} label="Hours" />
                    <span className="text-xl font-semibold text-slate-400 dark:text-slate-500 pb-3">:</span>
                    <CounterBox value={liveAge.minutes} label="Mins" />
                    <span className="text-xl font-semibold text-slate-400 dark:text-slate-500 pb-3">:</span>
                    <CounterBox value={liveAge.seconds} label="Secs" />
                 </div>
            </div>

            <div>
                <h3 className="text-center text-md font-medium text-slate-600 dark:text-slate-400 mb-4">Age Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {summaryItems.map(({ unit, value }) => (
                        <div key={unit} className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg text-center">
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{value.toLocaleString()}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{unit}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <NextBirthday dob={dob} />
        </div>
    );
};
