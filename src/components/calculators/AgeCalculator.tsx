import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Label } from '../ui/Label';
import { DatePicker } from '../ui/DatePicker';
import { Button } from '../ui/Button';
import type { Age } from '../../types';
import { calculateAge, calculateNextBirthdayCountdown, formatDateForDisplay, parseInputDate } from '../../utils/dateUtils';
import { buildAgeShareContent } from '../../utils/shareUtils';

import { CalculatorHeading } from './CalculatorHeading';
import { ResultSummary } from './ResultSummary';
import { Icon } from '../ui/Icon';
import { AgeResultGuide } from './AgeResultGuide';
const LiveAgeCounter = lazy(() => import('./LiveAgeCounter').then((module) => ({ default: module.LiveAgeCounter })));

export const AgeCalculator: React.FC<{ showLearningTools?: boolean }> = ({ showLearningTools = false }) => {
    const [dob, setDob] = useState<Date | null>(null);
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [age, setAge] = useState<Age | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isBirthday, setIsBirthday] = useState(false);
    const [isFutureDate, setIsFutureDate] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Share Result');
    const [shouldAutoCalculate, setShouldAutoCalculate] = useState(false);

    useEffect(() => {
        const readDatesFromUrl = () => {
            const params = new URLSearchParams(window.location.hash.slice(1) || window.location.search);
            const dobFromUrl = params.get('dob');
            const targetFromUrl = params.get('target');

            if (!dobFromUrl || !targetFromUrl) return;

            const parsedDob = parseInputDate(dobFromUrl);
            const parsedTarget = parseInputDate(targetFromUrl);
            if (parsedDob && parsedTarget) {
                setDob(parsedDob);
                setTargetDate(parsedTarget);
                setShouldAutoCalculate(true);
            }
        };
        readDatesFromUrl();
        // Example links on the current page update the fragment without remounting.
        window.addEventListener('hashchange', readDatesFromUrl);
        return () => window.removeEventListener('hashchange', readDatesFromUrl);
    }, []);

    const changeBirthDate = (date: Date | null) => {
        setDob(date);
        setAge(null);
        setError(null);
        setIsBirthday(false);
        if (date && !targetDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            setTargetDate(today);
        }
    };

    const handleCalculate = () => {
        setError(null);
        setAge(null);
        setIsBirthday(false);
        setIsFutureDate(false);

        if (!dob || !targetDate) {
            setError('Please select both a date of birth and a target date.');
            return;
        }

        if (dob > targetDate) {
            setError('The date of birth cannot be after the target date.');
            return;
        }

        const calculatedAge = calculateAge(dob, targetDate);
        setAge(calculatedAge);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isFuture = targetDate > today;
        setIsFutureDate(isFuture);

        if (dob <= today && calculateNextBirthdayCountdown(dob).isBirthdayToday) {
            setIsBirthday(true);
        }


    };

    useEffect(() => {
        if (shouldAutoCalculate && dob && targetDate) {
            handleCalculate();
            setShouldAutoCalculate(false);
        }
    }, [shouldAutoCalculate, dob, targetDate]);

    const buildShareContent = () => {
        if (!dob || !targetDate || !age) {
            return null;
        }

        return buildAgeShareContent(dob, targetDate, window.location.pathname);
    };

    const handleShare = async () => {
        const shareContent = buildShareContent();
        if (!shareContent) {
            return;
        }

        const { shareUrl, plainMessage, nativeText } = shareContent;
        const shareData = {
            title: 'My Age Calculation - AgeCalculater.com',
            text: nativeText,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (errorFromShare) {
                // Canceling a share must not copy the selected birth date elsewhere.
                if (errorFromShare instanceof Error && errorFromShare.name === 'AbortError') return;
                console.warn('navigator.share failed, falling back to copy:', errorFromShare);
            }
        }

        try {
            await navigator.clipboard.writeText(plainMessage);
            setCopyButtonText('Link Copied!');
            setTimeout(() => setCopyButtonText('Share Result'), 2000);
        } catch (copyError) {
            console.error('Failed to copy link:', copyError);
            alert('Failed to copy link to clipboard.');
        }
    };

    const handleWhatsAppShare = () => {
        const shareContent = buildShareContent();
        if (!shareContent) {
            return;
        }

        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareContent.whatsappMessage)}`;
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    };

    return (
        <Card className="calculator-panel">
            <CalculatorHeading title="Start with your dates" description="Choose a birthday and the date you want to check." />
            <form className="calculator-form" onSubmit={event => { event.preventDefault(); handleCalculate(); }}>
                <div className="date-grid">
                    <div className="field-group"><Label htmlFor="dob">Date of Birth</Label><DatePicker id="dob" value={dob} onChange={changeBirthDate} /><p className="field-hint">The day your story began</p></div>
                    <div className="field-group"><Label htmlFor="targetDate">Age at the Date of</Label><DatePicker id="targetDate" value={targetDate} onChange={date => { setTargetDate(date); setAge(null); setError(null); setIsBirthday(false); }} /><p className="field-hint">Today, a past date, or a future milestone</p></div>
                </div>
                <Button type="submit" className="calculate-button">Calculate Age<Icon name="arrow" /></Button>
                <p className="form-note"><Icon name="shield" /> Your calculation stays in your browser</p>
            </form>
            <div className="calculator-result" role="status" aria-live="polite">
                {error ? <p role="alert" className="error-notice">{error}</p> : age ? <>
                    {isBirthday && <p className="birthday-notice"><Icon name="spark" /> Happy Birthday!</p>}
                    <ResultSummary age={age} caption={`${isFutureDate ? 'Your age will be' : 'Your age'} on ${formatDateForDisplay(targetDate)}`} />
                </> : <div className="empty-result"><span className="empty-result-icon"><Icon name="clock" /></span><div><h3>Your timeline, made clear.</h3><p>Enter your dates to see years, months, and days.</p></div><span className="empty-result-dashes" aria-hidden="true">&mdash; &middot; &mdash; &middot; &mdash;</span></div>}
            </div>
            {age && <div className="share-row"><div className="share-actions"><Button variant="outline" onClick={handleShare}><Icon name="share" />{copyButtonText}</Button><Button variant="outline" onClick={handleWhatsAppShare} aria-label="Share via WhatsApp"><Icon name="whatsapp" />WhatsApp</Button></div><p>Sharing includes your selected dates.<br />Anyone with the link can read them.</p></div>}
            {showLearningTools && age && dob && targetDate && <AgeResultGuide dob={dob} targetDate={targetDate} />}
            {age && dob && <Suspense fallback={null}><LiveAgeCounter dob={dob} targetDate={targetDate} /></Suspense>}
        </Card>
    );
};
