import type { Age, LiveAge, AgeSummary, BirthdayCountdown } from '../types';

const DAY_MS = 86_400_000;
const dayNumber = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_MS;

// Missing anniversary days clamp to month end, including Feb 29 -> Feb 28.
const anniversary = (date: Date, year: number, month = date.getMonth()) =>
    new Date(year, month, Math.min(date.getDate(), new Date(year, month + 1, 0).getDate()));

export const calculateAge = (dob: Date, targetDate: Date): Age => {
    if (!Number.isFinite(dob.getTime()) || !Number.isFinite(targetDate.getTime()) || dayNumber(dob) > dayNumber(targetDate)) {
        throw new RangeError('Choose valid dates with the birth/start date on or before the target/end date.');
    }
    let years = targetDate.getFullYear() - dob.getFullYear();
    if (dayNumber(anniversary(dob, dob.getFullYear() + years)) > dayNumber(targetDate)) years--;
    const yearAnchor = anniversary(dob, dob.getFullYear() + years);
    let months = 0;
    while (months < 11 && dayNumber(anniversary(yearAnchor, yearAnchor.getFullYear(), yearAnchor.getMonth() + months + 1)) <= dayNumber(targetDate)) {
        months++;
    }
    const monthAnchor = anniversary(yearAnchor, yearAnchor.getFullYear(), yearAnchor.getMonth() + months);
    return { years, months, days: dayNumber(targetDate) - dayNumber(monthAnchor) };
};

export const getLiveAge = (dob: Date): LiveAge => {
    const now = new Date();
    return { ...calculateAge(dob, now), hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
};

export const calculateAgeSummary = (dob: Date, targetDate: Date): AgeSummary => {
    const { years, months } = calculateAge(dob, targetDate);
    const days = dayNumber(targetDate) - dayNumber(dob);
    return { months: years * 12 + months, weeks: Math.floor(days / 7), days, hours: days * 24, minutes: days * 1440, seconds: days * 86400 };
};

export const calculateAgeDetails = (dob: Date, targetDate: Date) => {
    const age = calculateAge(dob, targetDate);
    const yearAnchor = anniversary(dob, dob.getFullYear() + age.years);
    const monthAnchor = anniversary(yearAnchor, yearAnchor.getFullYear(), yearAnchor.getMonth() + age.months);
    // Always use the original birth date so February 29 returns in leap years.
    const nextBirthday = anniversary(dob, dob.getFullYear() + age.years + 1);
    return {
        age, yearAnchor, monthAnchor, nextBirthday,
        daysSinceBirthday: dayNumber(targetDate) - dayNumber(yearAnchor),
        daysUntilBirthday: dayNumber(nextBirthday) - dayNumber(targetDate),
    };
};

export const formatDateForDisplay = (date: Date | null): string => date
    ? `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
    : '';

export const formatDateForInput = (date: Date | null): string => date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    : '';

export const parseDateFromString = (value: string): Date | null => {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) return null;
    const [day, month, year] = value.split('-').map(Number);
    if (year < 1000 || year > 3000 || month < 1 || month > 12 || day < 1) return null;
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
};

export const parseInputDate = (value: string): Date | null => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    return parseDateFromString(value.split('-').reverse().join('-'));
};

export const calculateNextBirthdayCountdown = (dob: Date, now = new Date()): BirthdayCountdown => {
    let nextBirthday = anniversary(dob, now.getFullYear());
    if (dayNumber(nextBirthday) === dayNumber(now)) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthdayToday: true };
    }
    if (nextBirthday < now) nextBirthday = anniversary(dob, now.getFullYear() + 1);
    const diff = Math.max(0, nextBirthday.getTime() - now.getTime());
    return {
        days: Math.floor(diff / DAY_MS),
        hours: Math.floor((diff % DAY_MS) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1000),
        isBirthdayToday: false,
    };
};
