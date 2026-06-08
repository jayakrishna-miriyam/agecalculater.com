import React, { useEffect, useMemo, useState } from 'react';
import type { BirthdayCountdown, LiveAge } from '../types';
import { calculateAgeSummary, calculateNextBirthdayCountdown, getLiveAge } from '../utils/dateUtils';

interface LiveAgeCounterProps {
    dob: Date;
    targetDate: Date | null;
}

const CounterBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex min-w-[50px] flex-col items-center justify-center rounded-lg bg-slate-100 p-2 dark:bg-slate-700/50 sm:min-w-[60px]">
        <span className="tabular-nums text-xl font-semibold text-slate-800 dark:text-slate-200 sm:text-2xl">{String(value).padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span>
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
            <h3 className="mb-4 text-center text-md font-medium text-slate-600 dark:text-slate-400">Next Birthday Countdown</h3>
            {countdown.isBirthdayToday ? (
                <p className="text-center text-lg font-semibold text-emerald-600 dark:text-emerald-400">It&apos;s your birthday today.</p>
            ) : (
                <div className="flex items-center justify-center gap-2">
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

    const ageSummary = useMemo(() => calculateAgeSummary(dob, targetDate || new Date()), [dob, targetDate]);

    useEffect(() => {
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
        <div className="mt-8 space-y-8 border-t border-dashed border-slate-300 pt-6 dark:border-slate-600">
            <div>
                <h3 className="mb-4 text-center text-md font-medium text-slate-600 dark:text-slate-400">Live Age Counter</h3>
                <div className="mb-4 text-center">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{liveAge.years}</span> years, <span className="font-bold text-slate-800 dark:text-slate-200">{liveAge.months}</span> months, and <span className="font-bold text-slate-800 dark:text-slate-200">{liveAge.days}</span> days
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-3">
                    <CounterBox value={liveAge.hours} label="Hours" />
                    <span className="pb-3 text-xl font-semibold text-slate-400 dark:text-slate-500">:</span>
                    <CounterBox value={liveAge.minutes} label="Mins" />
                    <span className="pb-3 text-xl font-semibold text-slate-400 dark:text-slate-500">:</span>
                    <CounterBox value={liveAge.seconds} label="Secs" />
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-center text-md font-medium text-slate-600 dark:text-slate-400">Age Summary</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {summaryItems.map(({ unit, value }) => (
                        <div key={unit} className="rounded-lg bg-slate-100 p-3 text-center dark:bg-slate-700/50">
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{value.toLocaleString()}</p>
                            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{unit}</p>
                        </div>
                    ))}
                </div>
            </div>

            <NextBirthday dob={dob} />
        </div>
    );
};
