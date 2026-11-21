
export interface Age {
    years: number;
    months: number;
    days: number;
}

export interface LiveAge extends Age {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface AgeSummary {
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface BirthdayCountdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthdayToday: boolean;
}
