
import type { Age, LiveAge, AgeSummary, BirthdayCountdown } from '../types';

export const calculateAge = (dob: Date, targetDate: Date): Age => {
    const birthDate = new Date(dob);
    const otherDate = new Date(targetDate);

    let years = otherDate.getFullYear() - birthDate.getFullYear();

    if (otherDate.getMonth() < birthDate.getMonth() || 
       (otherDate.getMonth() === birthDate.getMonth() && otherDate.getDate() < birthDate.getDate())) {
        years--;
    }

    let months;
    if (otherDate.getMonth() >= birthDate.getMonth()) {
        months = otherDate.getMonth() - birthDate.getMonth();
    } else {
        months = 12 + otherDate.getMonth() - birthDate.getMonth();
    }
    
    if (otherDate.getDate() < birthDate.getDate()) {
        months--;
    }

    let days;
    if (otherDate.getDate() >= birthDate.getDate()) {
        days = otherDate.getDate() - birthDate.getDate();
    } else {
        // Get last day of the month before the target month to calculate remaining days
        const lastDayOfPrevMonth = new Date(otherDate.getFullYear(), otherDate.getMonth(), 0).getDate();
        days = lastDayOfPrevMonth - birthDate.getDate() + otherDate.getDate();
    }
    
    // Final month adjustment if it became negative during day calculation
    if (months < 0) {
        months = 11;
    }

    return { years, months, days };
};

export const getLiveAge = (dob: Date): LiveAge => {
    const now = new Date();
    const duration = now.getTime() - dob.getTime();

    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const { years, months, days } = calculateAge(dob, now);

    return { years, months, days, hours, minutes, seconds };
};

export const calculateAgeSummary = (dob: Date, targetDate: Date): AgeSummary => {
    const duration = targetDate.getTime() - dob.getTime();

    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    
    let months = (targetDate.getFullYear() - dob.getFullYear()) * 12;
    months -= dob.getMonth();
    months += targetDate.getMonth();
    if (targetDate.getDate() < dob.getDate()) {
        months--;
    }
    
    return {
        months: months < 0 ? 0 : months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
    };
};

export const formatDateForDisplay = (date: Date | null): string => {
    if (!date) {
        return '';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const parseDateFromString = (dateString: string): Date | null => {
    if (dateString.length !== 10) return null;

    const parts = dateString.split('-');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

    // Basic validation
    if (year < 1000 || year > 3000 || month < 1 || month > 12) return null;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) return null;

    const date = new Date(year, month - 1, day);
    // Final check to ensure date wasn't rolled over by constructor
    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
        return date;
    }

    return null;
};

export const calculateNextBirthdayCountdown = (dob: Date): BirthdayCountdown => {
    const now = new Date();
    const birthMonth = dob.getMonth();
    const birthDate = dob.getDate();
    const currentYear = now.getFullYear();

    let nextBirthday = new Date(currentYear, birthMonth, birthDate);

    // If birthday in current year has already passed, set to next year
    if (nextBirthday < now) {
        nextBirthday.setFullYear(currentYear + 1);
    }
    
    const isBirthdayToday = now.getMonth() === birthMonth && now.getDate() === birthDate;

    if (isBirthdayToday) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthdayToday: true };
    }

    const diff = nextBirthday.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isBirthdayToday: false };
};
