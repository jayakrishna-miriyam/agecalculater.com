import type { PageMeta } from '../types.ts';

export const directoryPage: PageMeta = {
    "path": "/all-tools",
    "title": "All Tools - AgeCalculater.com",
    "description": "Browse all available tools on AgeCalculater.com, including age calculation, age difference, birthday countdown, date difference, child age, and leap-year guides.",
    "heading": "All Tools",
    "intro": "Choose a calculator for your question, or use a focused guide to understand the dates and result.",
    "type": "website",
    "includeInSitemap": true,
    "updated": "2026-11-20",
    "sections": [
        {
            "title": "Choose a tool by the question you want to answer",
            "paragraphs": [
                "For \"How old was I on this date?\", choose Age Calculator and enter the event date as the target. For \"How far apart were we born?\", use Age Difference with the earlier birth first. For \"How long until my birthday?\", choose Birthday Countdown, which uses your local clock.",
                "Date Difference handles any pair of dates. It is the right place to compare milestones, understand elapsed versus inclusive days, or convert an interval to total calendar days. The child, leap-year, school, and travel pages pair the same age calculator with explanations for those specific tasks."
            ]
        },
        {
            "title": "What each result tells you",
            "table": {
                "caption": "Match the tool to the dates you have",
                "headers": ["Your question", "Inputs", "Result to read"],
                "rows": [
                    ["How old on a chosen date?", "Birth date and reference date", "Completed years, months, and days in Age Calculator"],
                    ["How far apart were two people born?", "Earlier and later birth dates", "The fixed birth-date interval in Age Difference"],
                    ["How long until the next birthday?", "Birth date; device clock supplies now", "Time remaining to local midnight in Birthday Countdown"],
                    ["How many days between two events?", "Start and end dates", "Total calendar days in Date Difference"]
                ]
            },
            "paragraphs": [
                "The supporting guides use the same age calculator with a different question in mind. The child-age guide explains completed months and weeks; the leap-year guide compares February 29 anniversaries; the school and travel-form guides help you choose the reference date. They do not check official eligibility or provide separate institutional rules.",
                "If you want to understand the calculation before entering dates, start with the manual guide. It walks through reached anniversaries, leftover days, and common shortcuts that produce the wrong result."
            ]
        },
        {
            "title": "Before you calculate",
            "bullets": [
                "Check that day and month have not been swapped by the date format on your device.",
                "Choose a reference date for ages. Date Difference displays elapsed days; add one yourself only if your task includes both endpoint dates.",
                "Use Enter day, month & year instead to type a distant birth year directly. Keep month and day in their labeled fields.",
                "Use calendar results for planning; verify official requirements with the organization that applies them."
            ],
            "links": [
                {
                    "href": "/how-to-calculate-age",
                    "label": "Learn to calculate age manually with a worked example"
                },
                {
                    "href": "/privacy-policy",
                    "label": "How this site handles dates and shared links"
                }
            ]
        }
    ]
};

export const notFoundPage: PageMeta = {
    "path": "/404",
    "title": "Page Not Found - AgeCalculater.com",
    "description": "The page you requested could not be found. Explore the main age calculator and related guides instead.",
    "heading": "Page Not Found",
    "intro": "The link you followed does not match a live page on this site. Use the navigation below to return to the main tools and guides.",
    "type": "website",
    "noindex": true,
    "sections": [{
        "title": "Find the page you need",
        "paragraphs": ["Check the address for a typing mistake, or choose All Tools to see the current calculators and guides. If a saved result link is incomplete, open the age calculator and enter the dates again."],
        "links": [{"href": "/contact-us", "label": "Report a broken link with the page where you found it"}]
    }]
};
