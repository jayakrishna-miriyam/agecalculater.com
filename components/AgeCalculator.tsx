import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Label } from './ui/Label';
import { DatePicker } from './ui/DatePicker';
import { LiveAgeCounter } from './LiveAgeCounter';
import { Button } from './ui/Button';
import { BirthdayConfetti } from './BirthdayConfetti';
import type { Age } from '../types';
import { calculateAge, formatDateForDisplay } from '../utils/dateUtils';

// Helper function to dynamically update meta tags for social sharing
const updateMetaTags = (title: string, description: string) => {
    document.title = title;

    const metaTags: { [key: string]: string } = {
        'description': description,
        'og:title': title,
        'og:description': description,
        'twitter:title': title,
        'twitter:description': description,
    };

    Object.entries(metaTags).forEach(([key, content]) => {
        let element: HTMLMetaElement | null;
        // Select by 'property' for OG/Twitter tags, 'name' for others
        if (key.startsWith('og:') || key.startsWith('twitter:')) {
            element = document.querySelector(`meta[property="${key}"]`);
        } else {
            element = document.querySelector(`meta[name="${key}"]`);
        }

        if (element) {
            // Update existing tag
            element.content = content;
        } else {
            // If the tag doesn't exist, create and append it
            const meta = document.createElement('meta');
            if (key.startsWith('og:') || key.startsWith('twitter:')) {
                meta.setAttribute('property', key);
            } else {
                meta.setAttribute('name', key);
            }
            meta.content = content;
            document.head.appendChild(meta);
        }
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

    // Parse URL params on initial load
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const dobFromUrl = params.get('dob');
        const targetFromUrl = params.get('target');

        if (dobFromUrl && targetFromUrl) {
            const parsedDob = new Date(dobFromUrl);
            const parsedTarget = new Date(targetFromUrl);
            
            // Adjust for timezone to avoid off-by-one day errors from YYYY-MM-DD format
            const dobWithTz = new Date(parsedDob.getTime() + parsedDob.getTimezoneOffset() * 60000);
            const targetWithTz = new Date(parsedTarget.getTime() + parsedTarget.getTimezoneOffset() * 60000);

            if (!isNaN(dobWithTz.getTime()) && !isNaN(targetWithTz.getTime())) {
                setDob(dobWithTz);
                setTargetDate(targetWithTz);
                setShouldAutoCalculate(true); // Signal to auto-calculate
            }
        }
    }, []);

    // Set a default target date once a DOB is selected for a better UX
    useEffect(() => {
        if (dob && !targetDate && !shouldAutoCalculate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to the start of the day
            setTargetDate(today);
        }
    }, [dob, targetDate, shouldAutoCalculate]);
    
    const handleCalculate = (isFromUrlLoad = false) => {
        setError(null);
        setAge(null);
        setIsBirthday(false);
        setIsFutureDate(false);

        if (!dob || !targetDate) {
            setError("Please select both a date of birth and a target date.");
            return;
        }

        if (dob > targetDate) {
            setError("The date of birth cannot be after the target date.");
            return;
        }
        
        const calculatedAge = calculateAge(dob, targetDate);
        setAge(calculatedAge);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isFuture = targetDate > today;
        setIsFutureDate(isFuture);

        const isBirthdayToday = dob.getMonth() === today.getMonth() && dob.getDate() === today.getDate();
        if (isBirthdayToday) {
            setIsBirthday(true);
        }
        
        // Dynamically update meta tags if this calculation is from a shared URL
        if (isFromUrlLoad) {
            const ageString = `${calculatedAge.years} years, ${calculatedAge.months} months, & ${calculatedAge.days} days`;
            const title = `Age Result: ${ageString} | AgeCalculater.com`;
            const description = isFuture 
                ? `On ${formatDateForDisplay(targetDate)}, the age will be ${ageString}. Calculate your own age on AgeCalculater.com!`
                : `As of ${formatDateForDisplay(targetDate)}, the age is ${ageString}. Calculate your own age on AgeCalculater.com!`;
            
            updateMetaTags(title, description);
        }
    };

    // Auto-calculate if dates are loaded from URL
    useEffect(() => {
        if (shouldAutoCalculate && dob && targetDate) {
            handleCalculate(true);
            setShouldAutoCalculate(false); // Prevent re-calculation
        }
    }, [shouldAutoCalculate, dob, targetDate]);

    const handleShare = async () => {
        if (!dob || !targetDate || !age) return;

        const formatDateForUrl = (date: Date) => date.toISOString().split('T')[0];
        
        const shareUrl = `${window.location.origin}${window.location.pathname}?dob=${formatDateForUrl(dob)}&target=${formatDateForUrl(targetDate)}`;
        
        const shareText = isFutureDate
            ? `On ${formatDateForDisplay(targetDate)}, my age will be ${age.years} years, ${age.months} months, and ${age.days} days. Calculate your age on AgeCalculater.com!`
            : `As of ${formatDateForDisplay(targetDate)}, my age is ${age.years} years, ${age.months} months, and ${age.days} days. Calculate your age on AgeCalculater.com!`;

        const shareData = {
            title: 'My Age Calculation - AgeCalculater.com',
            text: shareText,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Couldn't share using Web Share API:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopyButtonText('Link Copied!');
                setTimeout(() => setCopyButtonText('Share Result'), 2000);
            } catch (err) {
                console.error('Failed to copy link:', err);
                alert('Failed to copy link to clipboard.');
            }
        }
    };

    const renderResults = () => {
        if (age) {
            return (
                <div>
                    {isBirthday && (
                        <p className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500 mb-2 animate-pulse">
                            Happy Birthday!
                        </p>
                    )}
                    <h2 className="text-center text-lg font-medium text-slate-600 dark:text-slate-400 mb-4">
                        {isFutureDate ? "Your Age Will Be" : "Your Age Is"}
                    </h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-4xl md:text-6xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">{age.years}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Years</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-6xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">{age.months}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Months</p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-6xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">{age.days}</p>
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
                    className="flex items-center text-center p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-3 flex-shrink-0">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span className="font-medium">{error}</span>
                </div>
            );
        }

        return (
            <div className="text-center text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center py-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-600">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Let's find your age</p>
                <p className="mt-1 max-w-xs mx-auto text-sm">Select a date of birth and a target date, then click "Calculate Age" to see the result.</p>
            </div>
        );
    };

    return (
        <Card className="p-6 md:p-8 relative">
            {isBirthday && <BirthdayConfetti />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth <span className="text-slate-400 dark:text-slate-500 font-normal">(DD-MM-YYYY)</span></Label>
                    <DatePicker id="dob" value={dob} onChange={setDob} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="targetDate">Age at the Date of <span className="text-slate-400 dark:text-slate-500 font-normal">(DD-MM-YYYY)</span></Label>
                    <DatePicker id="targetDate" value={targetDate} onChange={setTargetDate} />
                </div>
            </div>

            <div className="mt-8">
                <Button onClick={() => handleCalculate()} className="w-full text-base font-semibold py-2.5">
                    Calculate Age
                </Button>
            </div>

            <div className="my-8 h-px bg-slate-200 dark:bg-slate-700" />

            <div role="status" aria-live="polite" className="min-h-[120px] flex items-center justify-center">
                 {renderResults()}
            </div>
            
            {age && (
                <div className="mt-4 flex justify-center">
                    <Button
                        onClick={handleShare}
                        className="relative group overflow-hidden gap-2 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white border border-transparent shadow-[0_15px_35px_-15px_rgba(244,63,94,0.85)] hover:shadow-[0_25px_50px_-20px_rgba(244,63,94,0.95)] focus:ring-red-500 focus:ring-offset-2 transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03]"
                    >
                        <span
                            className="absolute inset-0 pointer-events-none rounded-md bg-gradient-to-r from-rose-400/40 via-red-400/30 to-orange-400/40 blur-xl opacity-60 animate-pulse group-hover:opacity-0 transition-opacity duration-400"
                            aria-hidden="true"
                        />
                        <span
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-opacity duration-500"
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
                </div>
            )}
            
            {age && dob && dob < new Date() && (
                 <LiveAgeCounter dob={dob} targetDate={targetDate} />
            )}
        </Card>
    );
};