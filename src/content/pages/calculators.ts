import type { PageMeta } from '../types.ts';

export const calculatorPages: PageMeta[] = [
    {
        "path": "/",
        "title": "Age Calculator - Age in Years, Months and Days",
        "description": "Calculate your age in years, months, and days for any date. See the calculation steps, birthday timeline, and guides to leap years and date differences.",
        "heading": "Age Calculator Online",
        "intro": "Calculate exact age from a date of birth to today or any target date, then explore clear guides that explain the result and common real-world use cases.",
        "type": "website",
        "includeInSitemap": true,
        "updated": "2026-11-21",
        "sections": [
            {
                "title": "How to use the age calculator",
                "paragraphs": [
                    "Enter a date of birth, then choose today or a different target date. Select Calculate Age to see complete years, remaining months, and remaining days. Use the calendar, or choose Enter day, month & year instead to type each number directly. For the sample date 14 May 1992, enter Day 14, Month 05, and Year 1992; there is no need to scroll through past years.",
                    "For an age on a past or future date, keep the same birth date and change the target. A target before the birth date is rejected. You can also calculate the interval between two future dates for planning."
                ],
                "bullets": [
                    "For age today, the target defaults to your device's current local date after you enter a birth date.",
                    "For a deadline, enter the exact cut-off date instead of today.",
                    "The result is calendar age. It does not decide school, legal, medical, or immigration eligibility."
                ]
            },
            {
                "title": "How age is calculated: years, months, and days",
                "paragraphs": [
                    "We count complete calendar years first. Starting from that anniversary, we find the largest number of complete months up to the target, then count the calendar days left over. A missing anniversary day is moved to the last day of that month: January 31 plus one month becomes February 28, or February 29 in a leap year.",
                    "The year calculation is target year minus birth year, reduced by one if that year's anniversary has not yet arrived. Remaining months are between 0 and 11. Each month candidate is measured from the last full-year anniversary, rather than repeatedly adding a month and letting the date drift.",
                    "Total months means 12 times the complete years plus the remaining complete months. Total days counts calendar boundaries between the dates, with the start excluded and the end reached. Weeks are complete groups of seven days. These units describe the same interval in different ways; do not add them together."
                ]
            },
            {
                "title": "Worked example: read an age result step by step",
                "bullets": [
                    "14 May 1992 to 14 May 2026: 34 completed years.",
                    "14 May to 14 November 2026: 6 completed months.",
                    "14 November to 20 November 2026: 6 remaining days."
                ],
                "paragraphs": [
                    "For a sample birth date of 14 May 1992 and a target of 20 November 2026, the result is 34 years, 6 months, and 6 days. Six months are complete; the remaining 6 days do not make another calendar month. The next month anniversary would be 14 December, which is after the target.",
                    "Try the example link below, then change only the target date. The large age result and the total-unit boxes describe that selected date. The separate Live Age Now panel follows today, so it can show a different age when your target is in the past or future."
                ],
                "examples": [
                    {
                        "start": "1992-05-14",
                        "end": "2026-11-20",
                        "expected": [
                            34,
                            6,
                            6
                        ],
                        "totalDays": 12608
                    },
                    {
                        "start": "2000-10-01",
                        "end": "2030-09-30",
                        "expected": [
                            29,
                            11,
                            29
                        ],
                        "totalDays": 10956
                    },
                    {
                        "start": "2000-10-01",
                        "end": "2030-10-01",
                        "expected": [
                            30,
                            0,
                            0
                        ],
                        "totalDays": 10957
                    }
                ],
                "links": [
                    {
                        "href": "/#dob=1992-05-14&target=2026-11-20",
                        "label": "Open the 14 May 1992 example"
                    }
                ]
            },
            {
                "title": "Past dates, future dates, and month-end examples",
                "paragraphs": [
                    "Born October 1, 2000? On September 30, 2030 the age is 29 years, 11 months, 29 days. On October 1, 2030 it is exactly 30 years. A future target is a calendar calculation; it does not predict anything about a person's life.",
                    "For a birth date of January 31, 2024 and a target of March 1, 2024, the first complete month ends on February 29. The answer is 0 years, 1 month, 1 day, with 30 total calendar days. This month-end convention explains why another tool may give a different breakdown.",
                    "To find age on an earlier event, such as a graduation or a family photograph, use that event date as the target. For March 15, 1990 to September 25, 2010, the answer is 20 years, 6 months, 10 days."
                ]
            },
            {
                "title": "Leap years and February 29 birthdays",
                "paragraphs": [
                    "In the Gregorian calendar, a year is a leap year if it is divisible by 4, except century years must also be divisible by 400. Thus 2000 and 2024 are leap years, while 1900 and 2100 are not.",
                    "This site uses February 28 as the anniversary of February 29 in non-leap years, for both age and birthday countdowns. A February 29, 2024 birth reaches 1 calendar year here on February 28, 2025. The convention is for this tool; consult the relevant institution for an official age rule."
                ],
                "links": [
                    {
                        "href": "/leap-year-age-calculator",
                        "label": "See the February 29 guide and more boundary examples"
                    },
                    {
                        "href": "https://aa.usno.navy.mil/faq/leap_years",
                        "label": "Calendar reference: U.S. Naval Observatory leap-year rule"
                    }
                ]
            },
            {
                "title": "Calendar totals and the live counter",
                "paragraphs": [
                    "Date-only totals deliberately ignore daylight-saving clock changes. From one calendar date to the next is one day, even when local clocks move forward or back. Total hours, minutes, and seconds are conversions using 24 hours per calendar day, not a measurement from a recorded birth time.",
                    "After a calculation for a past birth date, the live counter shows age now using the device's local clock, while the total-unit summary uses your chosen target date. No birth time is requested, so the live hours, minutes, and seconds assume birth at local midnight. The birthday countdown measures real elapsed time to local midnight and can therefore reflect a clock change."
                ]
            },
            {
                "title": "Your dates and sharing",
                "paragraphs": [
                    "Calculations run in your browser without an account. Entered dates are not sent to a calculation server. Share Result and WhatsApp include the selected dates in a link only when you choose to share it. Anyone with that link can read those dates.",
                    "New links keep dates after the # fragment, which browsers do not send in the page request. Older links with date query parameters still work; those parameters can appear in hosting logs. Avoid sharing a real date of birth if you prefer to keep it private."
                ],
                "links": [
                    {
                        "href": "/privacy-policy",
                        "label": "Read the privacy policy"
                    }
                ]
            },
            {
                "title": "If the answer is different from what you expected",
                "paragraphs": [
                    "Check the two dates before changing the calculation method. A swapped day and month can still be a valid date, so the calculator cannot always recognize that mistake. The manual fields label each part explicitly. A date such as 31 April is invalid because April has only 30 days.",
                    "If a result is one year lower than a quick subtraction, check whether the birthday has happened by the target date. If total weeks seems low, remember that it counts only complete groups of seven days. A blank or incomplete date must be finished before the calculator can produce a result."
                ],
                "bullets": [
                    "Use a four-digit year between 1000 and 3000. The same Gregorian rules are applied throughout this range; historical calendar reforms are not reconstructed.",
                    "For an age today that looks wrong near midnight, check your device date and timezone. For a saved record, choose a fixed target rather than relying on today.",
                    "Compare the target-date result with another target-date result, rather than comparing it with a live counter or a decimal estimate."
                ],
                "links": [
                    {
                        "href": "/how-to-calculate-age",
                        "label": "Verify the calendar steps by hand"
                    },
                    {
                        "href": "/contact-us",
                        "label": "Report an example that still looks incorrect"
                    }
                ]
            }
        ]
    },
    {
        "path": "/age-difference-calculator",
        "title": "Age Difference Calculator - Compare Two Birth Dates Online",
        "description": "Calculate the age gap between two people or dates in years, months, and days with a simple age difference calculator and practical examples.",
        "heading": "Age Difference Calculator",
        "intro": "Compare two birth dates to see the exact age gap in calendar years, months, and days.",
        "type": "website",
        "includeInSitemap": true,
        "updated": "2026-11-20",
        "sections": [
            {
                "title": "How to compare two birth dates",
                "paragraphs": [
                    "An age gap is the interval between two birth dates. Put the older person's birth date in Earlier Birth Date and the younger person's in Later Birth Date, then select Calculate Difference. If you reverse the order, the tool asks you to correct it.",
                    "The result gives complete calendar years, remaining months, and days, followed by total units. No names or current ages are needed. Both people continue aging, but the interval between their birth dates stays fixed."
                ]
            },
            {
                "title": "Worked example: a sibling age gap",
                "paragraphs": [
                    "Suppose one sibling was born on March 15, 1990 and the other on September 25, 1993. Three complete years end on March 15, 1993; six months end on September 15; ten more days reach September 25. Their birth-date interval is 3 years, 6 months, 10 days.",
                    "Subtracting their ages in whole years on a particular day can give a different number. Between the older sibling's birthday and the younger sibling's birthday, that subtraction changes by one even though the birth-date interval has not changed. Use the dates when you need the actual gap."
                ],
                "examples": [
                    {
                        "start": "1990-03-15",
                        "end": "1993-09-25",
                        "expected": [
                            3,
                            6,
                            10
                        ],
                        "totalDays": 1290
                    },
                    {
                        "start": "2020-12-31",
                        "end": "2021-01-01",
                        "expected": [
                            0,
                            0,
                            1
                        ],
                        "totalDays": 1
                    },
                    {
                        "start": "2000-06-15",
                        "end": "2000-06-15",
                        "expected": [
                            0,
                            0,
                            0
                        ],
                        "totalDays": 0
                    }
                ]
            },
            {
                "title": "Calendar age gap versus total days",
                "paragraphs": [
                    "A calendar gap uses actual month lengths. It cannot be converted to days by assuming every month has 30 days. For January 31, 2024 to March 1, 2024, the answer is 1 month and 1 day, but 30 total days.",
                    "The algorithm counts complete years, then complete months from the last full-year anniversary, then the remaining calendar days. Missing days clamp to month end; February 29 anniversaries use February 28 in non-leap years. Total days excludes the starting date and is unaffected by daylight-saving changes.",
                    "Total weeks is the number of complete seven-day groups. Total hours and seconds are date-only conversions using 24-hour days, because the tool does not ask for birth times or birth locations. For people born on the same date, all displayed units are zero even if their birth times differ."
                ]
            },
            {
                "title": "Using an age gap in records",
                "paragraphs": [
                    "Keep both original birth dates with the result if you need to reproduce a comparison later. The calendar breakdown is convenient for a family note; total days is a consistent unit for comparing several intervals.",
                    "A gap alone does not establish anyone's current age or eligibility. Use the main age calculator for age on a specific reference date. For a comparison of events rather than people, the date difference page explains how to count inclusive days."
                ]
            },
            {
                "title": "Why subtracting current ages can be misleading",
                "paragraphs": [
                    "For the siblings born on 15 March 1990 and 25 September 1993, consider two reference dates in 2026. On 1 March they are 35 and 32 in completed years: subtraction gives 3. On 20 March they are 36 and 32: subtraction gives 4. Neither subtraction describes the full birth-date interval of 3 years, 6 months, and 10 days.",
                    "The younger sibling does not become farther away in age when the older one has a birthday. What changed is the rounded whole-year description. If you need both current ages, calculate each birth date against the same reference date separately."
                ],
                "table": {
                    "caption": "The same siblings, two different days in 2026",
                    "headers": [
                        "Reference date",
                        "Older sibling",
                        "Younger sibling",
                        "Whole-year subtraction"
                    ],
                    "rows": [
                        [
                            "1 March 2026",
                            "35 years",
                            "32 years",
                            "3 years"
                        ],
                        [
                            "20 March 2026",
                            "36 years",
                            "32 years",
                            "4 years"
                        ]
                    ]
                }
            },
            {
                "title": "A useful way to record a family comparison",
                "paragraphs": [
                    "Write the two full dates in chronological order and state whether your note uses calendar years and months or a total number of days. For a family timeline, the calendar wording is usually easier to read. For sorting several gaps from shortest to longest, compare total days instead of treating a month as a fixed number.",
                    "For people born around midnight in different countries, this tool compares the dates you provide. It cannot identify which birth happened first in absolute time without birth times and timezones. Similarly, a zero result for twins means the dates match; it does not imply the births were simultaneous."
                ],
                "links": [
                    {
                        "href": "/",
                        "label": "Calculate each person's age on the same reference date"
                    },
                    {
                        "href": "/date-difference-calculator",
                        "label": "Compare other events using calendar days"
                    }
                ]
            }
        ],
        "faqs": [
            {
                "question": "Which person is older?",
                "answer": "The person with the earlier birth date is older. Enter that date first. The calculator reports the positive gap rather than labeling named people."
            },
            {
                "question": "Do leap years change the gap?",
                "answer": "Leap days within the interval count in total days. The birth dates stay fixed; our calendar breakdown uses month-end clamping, including February 28 for February 29 anniversaries in non-leap years."
            },
            {
                "question": "Why is the difference between current ages sometimes different?",
                "answer": "Whole-year ages leave out months and days. When one birthday has happened this year and the other has not, subtracting those rounded ages hides part of the gap."
            },
            {
                "question": "Can it compare twins?",
                "answer": "It can compare calendar birth dates. It cannot distinguish birth times within one date, and it does not convert between birth-location timezones."
            }
        ]
    },
    {
        "path": "/birthday-countdown-calculator",
        "title": "Birthday Countdown Calculator - Days Until Your Next Birthday",
        "description": "Find the exact number of days, hours, minutes, and seconds until the next birthday and understand how birthday countdowns are calculated.",
        "heading": "Birthday Countdown Calculator",
        "intro": "Check how long it is until the next birthday and use the countdown for planning milestones, parties, and reminders.",
        "type": "website",
        "includeInSitemap": true,
        "updated": "2026-11-20",
        "sections": [
            {
                "title": "How to use the birthday countdown",
                "paragraphs": [
                    "Enter a date of birth and the countdown starts automatically. It finds the birthday anniversary in the device's current year. If that date has passed, it uses next year's anniversary. There is no Calculate button on this tool.",
                    "The display updates each second while the page is open. On the birthday itself it displays a birthday message for the whole local day. Closing the page does not create a reminder, notification, or calendar event."
                ]
            },
            {
                "title": "What the days, hours, minutes, and seconds mean",
                "paragraphs": [
                    "The endpoint is midnight at the start of the birthday in your device's timezone. Days are complete 24-hour periods remaining; hours, minutes, and seconds show the remainder. For example, at noon on September 25, a September 27 birthday is 1 day and 12 hours away, assuming no clock change between the dates.",
                    "The date difference between September 25 and September 27 is two calendar days. That differs from the countdown because half of September 25 has already passed. Use Date Difference if you want calendar dates without time-of-day effects."
                ]
            },
            {
                "title": "Timezone and daylight-saving behavior",
                "paragraphs": [
                    "The tool uses your device clock and local timezone, not the birthplace or party venue. A friend in another timezone may see a different countdown at the same moment. Correct your device clock if the countdown appears wrong.",
                    "A daylight-saving transition can shorten or lengthen the elapsed time to midnight by an hour. The countdown uses actual milliseconds to that local midnight, so it accounts for the offset change. It does not promise a fixed multiple of 24 hours for a given number of calendar dates."
                ]
            },
            {
                "title": "February 29 and birthdays happening today",
                "paragraphs": [
                    "For a February 29 birthday, we use February 28 in a non-leap year. In a leap year the endpoint is February 29. This matches the anniversary convention of the age calculator on this site.",
                    "For example, on February 28, 2025, someone born on February 29 sees the birthday-today message. On February 28, 2028, the countdown continues until February 29. After that birthday day finishes, the next anniversary is calculated afresh for the following year.",
                    "This is a planning convention. If your family celebrates on March 1 in a non-leap year, use the date difference tool with your chosen celebration date. The calculator does not set an official legal anniversary."
                ]
            },
            {
                "title": "Read a countdown across the birthday boundary",
                "paragraphs": [
                    "These examples all use a 27 September birthday and the same local timezone, with no clock change in the interval. Notice that the days box drops to zero before the birthday begins. That is expected: the hours box still describes time remaining.",
                    "At midnight on the birthday, the page changes to its birthday message. It keeps that message for the whole date rather than counting toward next year immediately. On the following day, it starts using the next anniversary."
                ],
                "table": {
                    "caption": "Example countdown to 27 September 2026",
                    "headers": [
                        "Local time when checked",
                        "What the display means"
                    ],
                    "rows": [
                        [
                            "25 September, 00:00",
                            "2 days remain"
                        ],
                        [
                            "25 September, 12:00",
                            "1 day and 12 hours remain"
                        ],
                        [
                            "26 September, 23:00",
                            "0 days and 1 hour remain"
                        ],
                        [
                            "27 September, any time",
                            "Birthday today"
                        ],
                        [
                            "28 September, 00:00",
                            "The next target is 27 September 2027"
                        ]
                    ]
                }
            },
            {
                "title": "Plan the celebration separately from the birthday",
                "paragraphs": [
                    "A party on Saturday and a birthday on Monday have different endpoints. This tool follows the birth-date anniversary. Use Date Difference for the number of calendar days until a chosen celebration date, and enter the party time in your own calendar if you need a timed reminder.",
                    "The page does not stay active after you close it, and browsers may pause background tabs. When updates resume, the countdown is recalculated from the current device clock instead of relying on how many ticks were missed. Refresh the page if the device timezone has changed while it was open."
                ],
                "bullets": [
                    "For someone in another timezone, agree which local birthday date and location you are planning around.",
                    "For a birthday during a clock change, expect the time remaining to reflect the shorter or longer local day.",
                    "For a future date of birth, use a date interval instead. This birthday tool expects a person who has already been born."
                ],
                "links": [
                    {
                        "href": "/date-difference-calculator",
                        "label": "Count calendar days until a party"
                    },
                    {
                        "href": "/leap-year-age-calculator",
                        "label": "Understand February 29 anniversaries"
                    }
                ]
            }
        ],
        "faqs": [
            {
                "question": "Why does it show zero days before the birthday?",
                "answer": "Zero days means fewer than 24 hours remain. Check the hours and minutes. On the birthday's local calendar day, the tool shows a birthday message instead."
            },
            {
                "question": "Does it count down to my birth time?",
                "answer": "No. No birth time is requested. The endpoint is the start of the birthday at local midnight."
            },
            {
                "question": "Can I use it for an upcoming first birthday?",
                "answer": "Yes. Enter a past birth date and the next anniversary is calculated. A date of birth in the future is rejected because the countdown is for someone already born."
            },
            {
                "question": "Will I receive a reminder?",
                "answer": "No. The page only displays a live countdown while open. It does not send emails, save a reminder, or request notification access."
            }
        ]
    },
    {
        "path": "/date-difference-calculator",
        "title": "Date Difference Calculator - Difference Between Two Dates",
        "description": "Measure the difference between two dates in years, months, days, weeks, hours, and seconds with a clear date difference calculator.",
        "heading": "Date Difference Calculator",
        "intro": "Measure the span between any two calendar dates for projects, timelines, applications, and personal planning.",
        "type": "website",
        "includeInSitemap": true,
        "updated": "2026-11-20",
        "sections": [
            {
                "title": "How to measure the interval between dates",
                "paragraphs": [
                    "Enter the earlier date as Start Date and the later date as End Date, then select Calculate Difference. The result shows the calendar span and a total-unit summary. Equal dates return zero. Reversed dates show an error instead of a negative duration.",
                    "Use it for project milestones, anniversaries, or dates in a personal record. Every calendar day counts, including weekends and holidays. This is not a business-day calculator."
                ]
            },
            {
                "title": "Worked example: January 31 to March 1, 2024",
                "paragraphs": [
                    "One full month from January 31 ends on February 29, the last day of February in 2024. One more day reaches March 1. The calendar result is 0 years, 1 month, 1 day.",
                    "The same interval is 30 total days, 4 complete weeks, or 720 hours using 24-hour days. Four complete weeks leave 2 days. Total months is 1; it excludes the remaining day. The calendar breakdown and the totals are alternative views, not quantities to add together."
                ],
                "examples": [
                    {
                        "start": "2024-01-31",
                        "end": "2024-03-01",
                        "expected": [
                            0,
                            1,
                            1
                        ],
                        "totalDays": 30
                    },
                    {
                        "start": "2024-01-31",
                        "end": "2024-03-31",
                        "expected": [
                            0,
                            2,
                            0
                        ],
                        "totalDays": 60
                    },
                    {
                        "start": "2025-02-28",
                        "end": "2025-03-01",
                        "expected": [
                            0,
                            0,
                            1
                        ],
                        "totalDays": 1
                    },
                    {
                        "start": "2026-09-25",
                        "end": "2026-09-25",
                        "expected": [
                            0,
                            0,
                            0
                        ],
                        "totalDays": 0
                    }
                ]
            },
            {
                "title": "Elapsed dates versus inclusive day counts",
                "paragraphs": [
                    "The calculator measures the number of calendar boundaries crossed. September 25 to September 26 is 1 day. September 25 to September 25 is 0 days.",
                    "If your task counts both the starting and ending dates as included days, add one to Total Days. A trip covering September 25, 26, and 27 includes 3 dates, while the interval from September 25 to September 27 is 2 days. Choose the convention that matches your task before using the number."
                ],
                "table": {
                    "caption": "Choose the count that matches the question",
                    "headers": [
                        "Question",
                        "25 to 27 September",
                        "Same start and end date"
                    ],
                    "rows": [
                        [
                            "Elapsed calendar days (calculator output)",
                            "2 days",
                            "0 days"
                        ],
                        [
                            "Calendar dates covered, including both endpoints",
                            "3 dates: 25, 26 and 27",
                            "1 date"
                        ],
                        [
                            "How to obtain the inclusive count",
                            "Add 1 to Total Days",
                            "Add 1 to Total Days"
                        ]
                    ]
                }
            },
            {
                "title": "Month lengths, leap years, and clock changes",
                "paragraphs": [
                    "We count complete years first, then complete months from the last full-year anniversary, then remaining calendar days. When a destination month lacks the original day, we use its last day. February 29 anniversaries therefore use February 28 in non-leap years.",
                    "Total days uses the calendar dates without local timezone offsets. A spring clock change does not turn a two-date interval into less than one day. Hours, minutes, and seconds multiply that calendar-day total by 24, 1,440, and 86,400. For exact elapsed time between timestamps, you need a tool that also accepts times and timezones."
                ]
            },
            {
                "title": "Use the right units for a project or personal timeline",
                "paragraphs": [
                    "For a project that starts on Monday and reaches a milestone the next Monday, seven calendar days have elapsed. This remains true when the interval contains a weekend. If you mean days when a particular office is open, you need its working-week and holiday rules; subtracting two days per week is not enough for every interval.",
                    "For an overnight stay from 25 to 27 September, the two date boundaries correspond to two nights when each night is included once. For a festival held on all three dates, the inclusive count is three event days. The calculator supplies the elapsed interval; the purpose determines whether an extra endpoint date is relevant."
                ]
            },
            {
                "title": "Why adding months one at a time can give a different answer",
                "paragraphs": [
                    "A month-end adjustment should not permanently change the day you are counting from. Starting at 31 January 2024, one month ends on 29 February. Two months measured from the original January anchor end on 31 March, not 29 March. This calculator tests each month against the original day at the last completed year anniversary.",
                    "That is why the table shows exactly two calendar months from 31 January to 31 March. There are 60 total days in that particular interval. In a non-leap year the same pair of month and day values spans 59 days, so the calendar label alone does not determine a fixed duration in hours."
                ],
                "links": [
                    {
                        "href": "/how-to-calculate-age",
                        "label": "Follow the anniversary method step by step"
                    },
                    {
                        "href": "/leap-year-age-calculator",
                        "label": "Check the effect of leap days"
                    }
                ]
            }
        ],
        "faqs": [
            {
                "question": "Are both start and end dates included?",
                "answer": "The start is excluded when measuring elapsed days. If your task includes both endpoint dates, add one to Total Days."
            },
            {
                "question": "Are weekends and holidays excluded?",
                "answer": "No. Every calendar date counts. Business-day deadlines need a holiday calendar and the applicable rule."
            },
            {
                "question": "Can I compare dates in the future?",
                "answer": "Yes. Both dates can be past or future, as long as the end is on or after the start."
            },
            {
                "question": "Why are calendar months different from total days divided by 30?",
                "answer": "Calendar months vary from 28 to 31 days. This tool counts completed calendar months, with month-end clamping, instead of using a 30-day average."
            }
        ]
    }
];
