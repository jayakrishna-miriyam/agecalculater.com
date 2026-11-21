import type { FAQEntry } from './types.ts';

export const homepageFaqs: FAQEntry[] = [
    {
        "question": "What is an age calculator?",
        "answer": "An age calculator measures the exact time between a date of birth and a target date. Instead of guessing with rough averages, it works through the calendar to return full years, remaining months, and leftover days."
    },
    {
        "question": "How do I calculate my age from date of birth?",
        "answer": "Enter your date of birth, choose today or another target date, and run the calculation. The result shows how many full birthdays have passed, then counts the remaining calendar months and days after the last full year."
    },
    {
        "question": "Is this age calculator accurate?",
        "answer": "The calculation is designed for calendar accuracy in years, months, and days. It compares actual month lengths and leap years rather than using a fixed 365-day shortcut."
    },
    {
        "question": "Does it handle leap years?",
        "answer": "Yes. Leap years are handled naturally because the calculator compares real calendar dates, including February with 28 or 29 days depending on the year."
    },
    {
        "question": "How is a February 29 birthday calculated?",
        "answer": "This site uses February 28 as the anniversary in a non-leap year. In a leap year the anniversary is February 29. The age calculator and birthday countdown use the same convention; official rules may differ."
    },
    {
        "question": "Can I calculate age on a future date?",
        "answer": "Yes. Choose any future date to estimate age for admissions, milestone planning, birthdays, or form eligibility checks. This is useful when rules apply on a specific cut-off day rather than today."
    },
    {
        "question": "Can I calculate age for school admission?",
        "answer": "Yes. Many families use an age calculator to compare a child’s date of birth with a school cut-off date. The result helps you prepare, but final eligibility should always be confirmed with the school or board."
    },
    {
        "question": "Is my date of birth stored?",
        "answer": "Entered dates are processed locally, without an account or local-storage record. Sharing a result includes the dates in the shared link. Older links with date query parameters may appear in hosting logs; see our privacy policy."
    },
    {
        "question": "Why might another calculator show a different result?",
        "answer": "Differences usually come from date format confusion, timezone handling near midnight, or a site using approximate month lengths. When comparing tools, make sure both are using the same target date and local calendar interpretation."
    },
    {
        "question": "Can I use this result for legal documents?",
        "answer": "The calculator is useful for preparation and double-checking, but legal, immigration, exam, employment, and medical decisions should always rely on the rules published by the relevant authority."
    },
    {
        "question": "Can I calculate age on a past date?",
        "answer": "Yes. Select the past event date as the target. It must be on or after the date of birth."
    },
    {
        "question": "Can I see age in months, weeks, and days?",
        "answer": "The summary shows completed months, completed weeks, and total calendar days. They are alternative measures of the interval. Hours and seconds use 24-hour calendar days, not a recorded birth time."
    }
];
