import React from 'react';
import { calculateAgeDetails, formatDateForInput } from '../../utils/dateUtils';

const dateText = (date: Date) => new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
}).format(date);
const unitText = (value: number, unit: string) => `${value} ${unit}${value === 1 ? '' : 's'}`;
const DateLabel: React.FC<{ date: Date }> = ({ date }) => <time dateTime={formatDateForInput(date)}>{dateText(date)}</time>;

export const AgeResultGuide: React.FC<{ dob: Date; targetDate: Date }> = ({ dob, targetDate }) => {
    const { age, yearAnchor, monthAnchor, nextBirthday, daysSinceBirthday, daysUntilBirthday } = calculateAgeDetails(dob, targetDate);
    const steps = [
        { label: `${unitText(age.years, 'complete year')}`, start: dob, end: yearAnchor },
        { label: `${unitText(age.months, 'complete month')}`, start: yearAnchor, end: monthAnchor },
        { label: `${unitText(age.days, 'remaining day')}`, start: monthAnchor, end: targetDate },
    ];
    const leapAnniversary = dob.getMonth() === 1 && dob.getDate() === 29 && yearAnchor.getDate() === 28;

    return <div className="age-result-guide">
        <section aria-labelledby="age-breakdown-heading">
            <h3 id="age-breakdown-heading">How we calculated your age</h3>
            <p className="age-guide-intro">Count complete years first, then complete months, then the days left over.</p>
            <ol className="age-breakdown">
                {steps.map((step, index) => <li key={step.label}>
                    <span className="age-step-number" aria-hidden="true">{index + 1}</span>
                    <span className="age-step-dates"><DateLabel date={step.start} /><span className="age-step-to"> to </span><DateLabel date={step.end} /></span>
                    <strong>{step.label}</strong>
                </li>)}
            </ol>
            <p className="age-guide-note">{leapAnniversary
                ? `The year step uses 28 February ${yearAnchor.getFullYear()} for your February 29 anniversary, following this site's month-end convention.`
                : 'Each month uses its actual length. If an anniversary day is missing, we use the last day of that month.'}</p>
        </section>

        <section className="birthday-timeline" aria-labelledby="birthday-timeline-heading">
            <h3 id="birthday-timeline-heading">Your birthday timeline</h3>
            <p className="age-guide-intro">Milestones around your selected date: <DateLabel date={targetDate} />.</p>
            <ol className="birthday-milestones">
                <li><span>{age.years === 0 ? 'Birth date' : 'Last birthday'}</span><strong><DateLabel date={yearAnchor} /></strong><small>{age.years === 0 ? 'Your starting point' : `${unitText(age.years, 'year')} completed`}</small></li>
                <li className="selected-milestone"><span>Selected date</span><strong><DateLabel date={targetDate} /></strong><small>{daysSinceBirthday === 0 ? (age.years === 0 ? 'The date of birth' : 'Exactly on your birthday') : `${unitText(daysSinceBirthday, 'calendar day')} after ${age.years === 0 ? 'birth' : 'your last birthday'}`}</small></li>
                <li><span>Next birthday</span><strong><DateLabel date={nextBirthday} /></strong><small>{unitText(age.years + 1, 'year')} completed</small></li>
            </ol>
            <div className="birthday-progress-label"><span>{unitText(daysSinceBirthday, 'day')} into this birthday year</span><strong>{unitText(daysUntilBirthday, 'day')} until the next birthday</strong></div>
            <progress className="birthday-progress" value={daysSinceBirthday} max={daysSinceBirthday + daysUntilBirthday} aria-label="Calendar days into this birthday year" />
            <p className="age-guide-note">This timeline uses your selected date and calendar-day counts, including weekends and leap days.</p>
        </section>
    </div>;
};
