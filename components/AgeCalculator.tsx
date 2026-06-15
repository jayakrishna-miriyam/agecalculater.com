import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Card } from './ui/Card';
import { Label } from './ui/Label';
import { DatePicker } from './ui/DatePicker';
import { Button } from './ui/Button';
import type { Age } from '../types';
import { calculateAge, formatDateForDisplay } from '../utils/dateUtils';

const BirthdayConfetti = lazy(() => import('./BirthdayConfetti').then((module) => ({ default: module.BirthdayConfetti })));
const LiveAgeCounter = lazy(() => import('./LiveAgeCounter').then((module) => ({ default: module.LiveAgeCounter })));

const updateMetaTags = (title: string, description: string) => {
    document.title = title;

    const metaTags: Record<string, string> = {
        description,
        'og:title': title,
        'og:description': description,
        'twitter:title': title,
        'twitter:description': description,
    };

    Object.entries(metaTags).forEach(([key, content]) => {
        const isOpenGraph = key.startsWith('og:');
        const selector = isOpenGraph ? `meta[property="${key}"]` : `meta[name="${key}"]`;
        let element = document.querySelector<HTMLMetaElement>(selector);

        if (!element) {
            element = document.createElement('meta');
            if (isOpenGraph) {
                element.setAttribute('property', key);
            } else {
                element.setAttribute('name', key);
            }
            document.head.appendChild(element);
        }

        element.content = content;
    });
};

export const AgeCalculator: React.FC = () => {
    const [dob, setDob] = useState<Date | null>(null);
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [age, setAge] = useState<Age | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isBirthday, setIsBirthday] = useState(false);
    const [isFutureDate, setIsFutureDate] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Share Result');
    const [shouldAutoCalculate, setShouldAutoCalculate] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const dobFromUrl = params.get('dob');
        const targetFromUrl = params.get('target');

        if (!dobFromUrl || !targetFromUrl) {
            return;
        }

        const parsedDob = new Date(dobFromUrl);
        const parsedTarget = new Date(targetFromUrl);
        const dobWithTz = new Date(parsedDob.getTime() + parsedDob.getTimezoneOffset() * 60000);
        const targetWithTz = new Date(parsedTarget.getTime() + parsedTarget.getTimezoneOffset() * 60000);

        if (!isNaN(dobWithTz.getTime()) && !isNaN(targetWithTz.getTime())) {
            setDob(dobWithTz);
            setTargetDate(targetWithTz);
            setShouldAutoCalculate(true);
        }
    }, []);

    useEffect(() => {
        if (dob && !targetDate && !shouldAutoCalculate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            setTargetDate(today);
        }
    }, [dob, targetDate, shouldAutoCalculate]);

    const handleCalculate = (isFromUrlLoad = false) => {
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

        if (dob.getMonth() === today.getMonth() && dob.getDate() === today.getDate()) {
            setIsBirthday(true);
        }

        if (isFromUrlLoad) {
            const ageString = `${calculatedAge.years} years, ${calculatedAge.months} months, and ${calculatedAge.days} days`;
            const title = `Age Result: ${ageString} | AgeCalculater.com`;
            const description = isFuture
                ? `On ${formatDateForDisplay(targetDate)}, the age will be ${ageString}.`
                : `As of ${formatDateForDisplay(targetDate)}, the age is ${ageString}.`;

            updateMetaTags(title, description);
        }
    };

    useEffect(() => {
        if (shouldAutoCalculate && dob && targetDate) {
            handleCalculate(true);
            setShouldAutoCalculate(false);
        }
    }, [shouldAutoCalculate, dob, targetDate]);

    const buildShareContent = () => {
        if (!dob || !targetDate || !age) {
            return null;
        }

        const formatDateForUrl = (date: Date) => date.toISOString().split('T')[0];
        const shareUrl = `${window.location.origin}${window.location.pathname}?dob=${formatDateForUrl(dob)}&target=${formatDateForUrl(targetDate)}`;
        const secondsDifference = Math.floor((targetDate.getTime() - dob.getTime()) / 1000);

        const shareText = isFutureDate
            ? `On ${formatDateForDisplay(targetDate)}, the age will be ${age.years} years, ${age.months} months, and ${age.days} days. That is ${secondsDifference.toLocaleString()} seconds of life.`
            : `As of ${formatDateForDisplay(targetDate)}, the age is ${age.years} years, ${age.months} months, and ${age.days} days. That is ${secondsDifference.toLocaleString()} seconds in total.`;

        const combinedMessage = `${shareText}\n\nFind your own result here:\n${shareUrl}`;
        return { shareUrl, combinedMessage };
    };

    const handleShare = async () => {
        const shareContent = buildShareContent();
        if (!shareContent) {
            return;
        }

        const { shareUrl, combinedMessage } = shareContent;
        const shareData = {
            title: 'My Age Calculation - AgeCalculater.com',
            text: combinedMessage,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (errorFromShare) {
                console.warn('navigator.share failed, falling back to copy:', errorFromShare);
            }
        }

        try {
            await navigator.clipboard.writeText(combinedMessage);
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

        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareContent.combinedMessage)}`;
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    };

    const renderResults = () => {
        if (age) {
            return (
                <div>
                    {isBirthday && (
                        <p className="mb-2 bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-center text-2xl font-bold text-transparent animate-pulse">
                            Happy Birthday!
                        </p>
                    )}
                    <h2 className="mb-4 text-center text-lg font-medium text-slate-600 dark:text-slate-400">
                        {isFutureDate ? 'Your Age Will Be' : 'Your Age Is'}
                    </h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-4xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 md:text-6xl">{age.years}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Years</p>
                        </div>
                        <div>
                            <p className="text-4xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 md:text-6xl">{age.months}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Months</p>
                        </div>
                        <div>
                            <p className="text-4xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 md:text-6xl">{age.days}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Days</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div
                    role="alert"
                    className="flex items-center rounded-lg bg-red-50 p-4 text-center text-red-700 dark:bg-red-900/20 dark:text-red-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5 flex-shrink-0">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span className="font-medium">{error}</span>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center py-4 text-center text-slate-500 dark:text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-600">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Let&apos;s find your age</p>
                <p className="mx-auto mt-1 max-w-xs text-sm">Select a date of birth and a target date, then click Calculate Age to see the result.</p>
            </div>
        );
    };

    return (
        <Card className="relative p-6 md:p-8">
            {isBirthday && (
                <Suspense fallback={null}>
                    <BirthdayConfetti />
                </Suspense>
            )}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <DatePicker id="dob" value={dob} onChange={setDob} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="targetDate">Age at the Date of</Label>
                    <DatePicker id="targetDate" value={targetDate} onChange={setTargetDate} />
                </div>
            </div>

            <div className="mt-8">
                <Button onClick={() => handleCalculate()} className="w-full py-2.5 text-base font-semibold">
                    Calculate Age
                </Button>
            </div>

            <div className="my-8 h-px bg-slate-200 dark:bg-slate-700" />

            <div role="status" aria-live="polite" className="flex min-h-[120px] items-center justify-center">
                {renderResults()}
            </div>

            {age && (
                <div className="mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                    <Button
                        onClick={handleShare}
                        className="group relative gap-2 overflow-hidden border border-transparent bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white shadow-[0_15px_35px_-15px_rgba(244,63,94,0.85)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_25px_50px_-20px_rgba(244,63,94,0.95)] focus:ring-red-500 focus:ring-offset-2"
                    >
                        <span
                            className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-rose-400/40 via-red-400/30 to-orange-400/40 opacity-60 blur-xl transition-opacity duration-400 group-hover:opacity-0"
                            aria-hidden="true"
                        />
                        <span
                            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            aria-hidden="true"
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 drop-shadow-sm">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            <span className="font-semibold tracking-wide">{copyButtonText}</span>
                        </span>
                    </Button>
                    <Button
                        onClick={handleWhatsAppShare}
                        aria-label="Share via WhatsApp"
                        className="group relative gap-2 overflow-hidden border border-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 text-white shadow-[0_15px_35px_-15px_rgba(16,185,129,0.85)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_25px_50px_-20px_rgba(16,185,129,0.95)] focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        <span
                            className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-emerald-400/40 via-green-400/30 to-lime-400/40 opacity-60 blur-xl transition-opacity duration-400 group-hover:opacity-0"
                            aria-hidden="true"
                        />
                        <span
                            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            aria-hidden="true"
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="h-5 w-5 drop-shadow-sm"
                            >
                                <path d="M16 .667C7.6.667.667 7.6.667 16c0 2.83.74 5.56 2.13 7.96L0 32l8.3-2.77A15.24 15.24 0 0016 31.333c8.4 0 15.333-6.933 15.333-15.333S24.4.667 16 .667zm0 27.466a12.04 12.04 0 01-6.13-1.71l-.44-.26-4.92 1.64 1.63-4.8-.29-.5a11.87 11.87 0 01-1.73-6.2c0-6.56 5.34-11.9 11.9-11.9 6.56 0 11.9 5.34 11.9 11.9 0 6.56-5.34 11.9-11.9 11.9zm6.57-8.9c-.36-.18-2.13-1.05-2.46-1.18-.33-.12-.57-.18-.81.18-.24.36-.93 1.18-1.14 1.42-.21.24-.42.27-.78.09-.36-.18-1.51-.56-2.88-1.78-1.06-.94-1.77-2.1-1.98-2.46-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.72-.6-.62-.81-.63-.21-.01-.45-.01-.69-.01-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 .01 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.9 6.15 5.46.86.37 1.52.59 2.04.75.86.27 1.64.23 2.25.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
                            </svg>
                            <span className="font-semibold tracking-wide">WhatsApp</span>
                        </span>
                    </Button>
                </div>
            )}
            {age && dob && dob < new Date() && (
                <Suspense fallback={null}>
                    <LiveAgeCounter dob={dob} targetDate={targetDate} />
                </Suspense>
            )}
        </Card>
    );
};
