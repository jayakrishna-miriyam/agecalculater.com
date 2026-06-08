import React, { useEffect, useState } from 'react';
import { Card } from './ui/Card';
import { Label } from './ui/Label';
import { DatePicker } from './ui/DatePicker';
import { calculateNextBirthdayCountdown } from '../utils/dateUtils';
import type { BirthdayCountdown } from '../types';

const CountdownBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="rounded-2xl bg-slate-100 px-4 py-5 text-center dark:bg-slate-800/60">
        <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">{value}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{label}</p>
    </div>
);

export const BirthdayCountdownCalculator: React.FC = () => {
    const [dob, setDob] = useState<Date | null>(null);
    const [countdown, setCountdown] = useState<BirthdayCountdown | null>(null);

    useEffect(() => {
        if (!dob) {
            setCountdown(null);
            return;
        }

        setCountdown(calculateNextBirthdayCountdown(dob));
        const interval = setInterval(() => {
            setCountdown(calculateNextBirthdayCountdown(dob));
        }, 1000);

        return () => clearInterval(interval);
    }, [dob]);

    return (
        <Card className="p-6 md:p-8">
            <div className="space-y-2">
                <Label htmlFor="birthdayDob">Date of Birth</Label>
                <DatePicker id="birthdayDob" value={dob} onChange={setDob} />
            </div>

            <div className="mt-8 min-h-[120px]">
                {!dob && (
                    <p className="text-center text-slate-500 dark:text-slate-400">
                        Enter a birth date to see the live countdown to the next birthday.
                    </p>
                )}

                {dob && countdown?.isBirthdayToday && (
                    <p className="rounded-xl bg-emerald-50 px-4 py-4 text-center text-lg font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                        It is your birthday today.
                    </p>
                )}

                {dob && countdown && !countdown.isBirthdayToday && (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <CountdownBox value={countdown.days} label="Days" />
                        <CountdownBox value={countdown.hours} label="Hours" />
                        <CountdownBox value={countdown.minutes} label="Minutes" />
                        <CountdownBox value={countdown.seconds} label="Seconds" />
                    </div>
                )}
            </div>
        </Card>
    );
};
