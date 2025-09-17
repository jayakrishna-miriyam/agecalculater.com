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

    const buildShareContent = () => {
        if (!dob || !targetDate || !age) {
            return null;
        }

        const formatDateForUrl = (date: Date) => date.toISOString().split('T')[0];
        const shareUrl = `${window.location.origin}${window.location.pathname}?dob=${formatDateForUrl(dob)}&target=${formatDateForUrl(targetDate)}`;
        const secondsDifference = Math.floor((targetDate.getTime() - dob.getTime()) / 1000);

        // Build the formatted message
        const shareText = isFutureDate
        ? `*On ${formatDateForDisplay(targetDate)}*, I'll be\n\n` +
            `*${age.years} years*, _${age.months} months_, and _${age.days} days_ old —\n` +
            `that's *${secondsDifference.toLocaleString()} seconds* alive! \n\n` +
            `*Bet you don't know your exact age in seconds!*`
        : `*Ever wondered your exact age down to days, months and seconds?* \n\n`+
            `As of *${formatDateForDisplay(targetDate)}*, \n` +
            `I'm *${age.years} years, _${age.months} months_, and _${age.days} days_ old* \n` + 
            `— that's _*${secondsDifference.toLocaleString()} seconds*_ already! \n\n` +
            `> *Think you know your exact age in seconds?*`;


// Guess what? I’m 23 years, 0 months, 0 days old today! 🎂
// Bet you don’t know your exact age in months and days


        const combinedMessage = `${shareText}\n\n\n\n *Find yours instantly with this calculator:*\n ${shareUrl}`;


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
            } catch (err) {
                console.warn('navigator.share failed, falling back to copy:', err);
            }
        }

        try {
            await navigator.clipboard.writeText(combinedMessage);
            setCopyButtonText('Link Copied!');
            setTimeout(() => setCopyButtonText('Share Result'), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
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
                <div className="mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
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
                    <Button
                        onClick={handleWhatsAppShare}
                        aria-label="Share via WhatsApp"
                        className="relative group overflow-hidden gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 text-white border border-transparent shadow-[0_15px_35px_-15px_rgba(16,185,129,0.85)] hover:shadow-[0_25px_50px_-20px_rgba(16,185,129,0.95)] focus:ring-emerald-500 focus:ring-offset-2 transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03]"
                    >
                        <span
                            className="absolute inset-0 pointer-events-none rounded-md bg-gradient-to-r from-emerald-400/40 via-green-400/30 to-lime-400/40 blur-xl opacity-60 animate-pulse group-hover:opacity-0 transition-opacity duration-400"
                            aria-hidden="true"
                        />
                        <span
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-opacity duration-500"
                            aria-hidden="true"
                        />
                        <span className="relative z-10 flex items-center gap-2">
                        {/* ✅ WhatsApp Icon */}
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
                 <LiveAgeCounter dob={dob} targetDate={targetDate} />
            )}
        </Card>
    );
};