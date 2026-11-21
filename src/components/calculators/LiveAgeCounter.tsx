import React, { useEffect, useMemo, useState } from 'react';
import type { BirthdayCountdown, LiveAge } from '../../types';
import { calculateAgeSummary, calculateNextBirthdayCountdown, getLiveAge } from '../../utils/dateUtils';

interface LiveAgeCounterProps {
    dob: Date;
    targetDate: Date | null;
}

const CounterBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="mini-counter">
        <span className="mini-counter-value">{String(value).padStart(2, '0')}</span>
        <span className="mini-counter-label">{label}</span>
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
            <h3 className="counter-heading">Next Birthday Countdown</h3>
            {countdown.isBirthdayToday ? (
                <p className="birthday-notice">It&apos;s your birthday today.</p>
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
    const [liveAge, setLiveAge] = useState<LiveAge | null>(() => dob <= new Date() ? getLiveAge(dob) : null);

    const ageSummary = useMemo(() => calculateAgeSummary(dob, targetDate || new Date()), [dob, targetDate]);

    useEffect(() => {
        if (dob > new Date()) return;
        const interval = setInterval(() => {
            setLiveAge(getLiveAge(dob));
        }, 1000);

        return () => clearInterval(interval);
    }, [dob]);

    if (!ageSummary) {
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
        <div className="result-extras">
            <div>
                <h3 className="counter-heading">Totals at Your Target Date</h3>
                <p className="form-note">Hours, minutes, and seconds use 24-hour calendar days.</p>
                <div className="stats-grid">
                    {summaryItems.map(({ unit, value }) => <div key={unit} className="stat-tile"><strong>{value.toLocaleString()}</strong><span>{unit}</span></div>)}
                </div>
            </div>
            {liveAge && <div className="live-panels"><div>
                <h3 className="counter-heading"><span className="live-dot" />Live Age Now (local time)</h3>
                <p className="live-age-text"><strong>{liveAge.years}</strong> years, <strong>{liveAge.months}</strong> months, and <strong>{liveAge.days}</strong> days</p>
                <div className="mini-counter-row"><CounterBox value={liveAge.hours} label="Hours" /><CounterBox value={liveAge.minutes} label="Mins" /><CounterBox value={liveAge.seconds} label="Secs" /></div>
            </div><NextBirthday dob={dob} /></div>}
        </div>
    );
};
