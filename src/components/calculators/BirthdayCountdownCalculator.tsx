import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { CalculatorHeading } from './CalculatorHeading';
import { Icon } from '../ui/Icon';
import { Label } from '../ui/Label';
import { DatePicker } from '../ui/DatePicker';
import { calculateNextBirthdayCountdown } from '../../utils/dateUtils';
import type { BirthdayCountdown } from '../../types';

const CountdownBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="countdown-unit"><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>
);

export const BirthdayCountdownCalculator: React.FC = () => {
    const [dob, setDob] = useState<Date | null>(null);
    const [countdown, setCountdown] = useState<BirthdayCountdown | null>(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isFutureBirth = !!dob && dob > today;

    useEffect(() => {
        if (!dob || isFutureBirth) {
            setCountdown(null);
            return;
        }

        setCountdown(calculateNextBirthdayCountdown(dob));
        const interval = setInterval(() => {
            setCountdown(calculateNextBirthdayCountdown(dob));
        }, 1000);

        return () => clearInterval(interval);
    }, [dob, isFutureBirth]);

    return (
        <Card className="calculator-panel">
            <CalculatorHeading title="Something to look forward to" description="A live countdown to your next birthday, in your local time." countdown />
            <div className="calculator-form"><div className="field-group"><Label htmlFor="birthdayDob">Date of Birth</Label><DatePicker id="birthdayDob" value={dob} onChange={setDob} /><p className="field-hint">Your countdown starts as soon as you choose a date</p></div></div>
            <div className="calculator-result">
                {isFutureBirth && <p role="alert" className="error-notice">Choose a birth date on or before today.</p>}
                {!dob && <div className="empty-result"><span className="empty-result-icon"><Icon name="spark" /></span><div><h3>Your next celebration awaits.</h3><p>Enter a birth date to see the live countdown to the next birthday.</p></div></div>}
                {dob && countdown?.isBirthdayToday && <p className="birthday-notice"><Icon name="spark" />It is your birthday today.</p>}
                {dob && countdown && !countdown.isBirthdayToday && <><p className="result-caption">Until your next birthday</p><div className="countdown-grid"><CountdownBox value={countdown.days} label="Days" /><CountdownBox value={countdown.hours} label="Hours" /><CountdownBox value={countdown.minutes} label="Minutes" /><CountdownBox value={countdown.seconds} label="Seconds" /></div><p className="form-note"><Icon name="clock" /> Counting down to local midnight</p></>}
            </div>
        </Card>
    );
};
