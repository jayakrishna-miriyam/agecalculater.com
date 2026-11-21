import type { PageMeta } from '../types.ts';

export const guidePages: PageMeta[] = [
    {
        "path": "/how-to-calculate-age",
        "title": "How to Calculate Age Manually - Formula, Steps and Examples",
        "description": "Learn how to calculate age manually using full years, remaining months, and leftover days, with simple worked examples.",
        "heading": "How To Calculate Age",
        "intro": "This guide explains the manual method behind age calculation so you can verify a result without relying only on a tool.",
        "type": "article",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "The basic formula",
                "paragraphs": [
                    "Age is the time between a date of birth and a chosen target date. The practical method is not to divide total days by a rough yearly average. Instead, you count full years first, then the remaining full months, and finally the leftover days.",
                    "That order matters because calendars are irregular. Months have 28, 29, 30, or 31 days, and leap years introduce an extra day in February. A person who is 10 years and 11 months old is not the same as someone who is simply a certain number of days divided by 365."
                ],
                "bullets": [
                    "Step 1: Subtract birth year from target year.",
                    "Step 2: Reduce one year if the birthday has not occurred yet in the target year.",
                    "Step 3: Count remaining months after the last full birthday.",
                    "Step 4: Count remaining days after the last full month."
                ]
            },
            {
                "title": "A calculation you can check on paper",
                "paragraphs": [
                    "Suppose the date of birth is January 15, 1995 and the target date is June 7, 2026. The full-year difference is 31 years. Because June 7 comes after January 15, all 31 full years count.",
                    "From January 15, 2026 to June 7, 2026 there are 4 full months and 23 days remaining. The final age is 31 years, 4 months, and 23 days.",
                    "Write each reached date beside the step. After 31 full years, the anchor is 15 January 2026. Four months reach 15 May; five would reach 15 June and pass the target of 7 June. From 15 May to 31 May is 16 days, then 31 May to 7 June adds 7 more days. The remainder is 23 days."
                ],
                "examples": [
                    {
                        "start": "1995-01-15",
                        "end": "2026-06-07",
                        "expected": [
                            31,
                            4,
                            23
                        ],
                        "totalDays": 11466
                    },
                    {
                        "start": "1995-01-15",
                        "end": "2026-01-14",
                        "expected": [
                            30,
                            11,
                            30
                        ],
                        "totalDays": 11322
                    },
                    {
                        "start": "1995-01-15",
                        "end": "2026-01-15",
                        "expected": [
                            31,
                            0,
                            0
                        ],
                        "totalDays": 11323
                    }
                ],
                "links": [
                    {
                        "href": "/#dob=1995-01-15&target=2026-06-07",
                        "label": "Load the worked example in the calculator"
                    }
                ]
            },
            {
                "title": "When manual checks are useful",
                "paragraphs": [
                    "Manual age checks help when you need to confirm school cut-off dates, visa or passport form fields, age limits for exams, or milestone timing for records. Even when you use a calculator, understanding the method makes it easier to catch input mistakes."
                ]
            },
            {
                "title": "Handle missing days before counting the remainder",
                "paragraphs": [
                    "If an anniversary falls on a day missing from its destination month, this site uses the last day of that month. For January 31, 2024 to March 1, 2024, the month anniversary is February 29. There is one day left after it, giving 1 month and 1 day. Subtracting 31 from the number of days in February can otherwise produce a negative remainder.",
                    "For February 29, 2024 to February 28, 2025, our anniversary convention gives 1 year exactly. When checking another calculator, first check whether it uses February 28 or March 1. Both the convention and the target date matter."
                ]
            },
            {
                "title": "Check the result in a second unit",
                "paragraphs": [
                    "For March 15, 1990 to September 25, 2026, 36 complete years and 6 months gives 438 complete months, followed by 10 remaining days. Multiplying 438 by 30 would not recover total days because months have different lengths.",
                    "For a small interval, count midnight boundaries on a calendar. January 1 to January 8 is 7 days, or 1 complete week. Counting both endpoint dates instead gives 8 included dates. State which question you are answering."
                ],
                "links": [
                    {
                        "href": "/",
                        "label": "Try these examples in the age calculator"
                    },
                    {
                        "href": "/date-difference-calculator",
                        "label": "Compare calendar breakdowns and total days"
                    }
                ]
            },
            {
                "title": "A reusable worksheet for any pair of dates",
                "bullets": [
                    "Write the birth date and target date with the month spelled out so the format is unambiguous.",
                    "Find the latest yearly anniversary that is on or before the target. Count those completed years.",
                    "Keep that anniversary as your anchor. Try 0 to 11 months from it, clamping a missing day to month end; keep the latest candidate that does not pass the target.",
                    "Count calendar-day boundaries from that candidate to the target. Record this as the remaining days.",
                    "Check that the target is not before birth, that the months are between 0 and 11, and that no remainder is negative."
                ],
                "paragraphs": [
                    "If the target is the same as the birth date, every part is zero. If it is exactly an anniversary under the chosen convention, the remaining months and days are zero. These two checks catch many mistakes before you compare larger totals."
                ]
            },
            {
                "title": "Three shortcuts that do not give an exact calendar age",
                "table": {
                    "caption": "Common shortcuts and their limitations",
                    "headers": [
                        "Shortcut",
                        "Why it can fail",
                        "Use instead"
                    ],
                    "rows": [
                        [
                            "Target year minus birth year",
                            "Ignores whether the birthday has happened",
                            "Check the anniversary before accepting the year count"
                        ],
                        [
                            "Total days divided by 365 or 365.25",
                            "Produces a duration estimate, not completed birthdays",
                            "Count actual calendar anniversaries"
                        ],
                        [
                            "Borrow 30 days whenever days are negative",
                            "February and 31-day months do not have 30 days",
                            "Use actual reached dates and month lengths"
                        ]
                    ]
                },
                "paragraphs": [
                    "A decimal age can be useful when a particular analysis defines its own year length. It is a different measurement from this calculator's years, months, and days. Do not round a decimal value up to decide that a birthday has occurred."
                ]
            },
            {
                "title": "Record enough information to reproduce the answer",
                "paragraphs": [
                    "An age without a reference date quickly becomes ambiguous. A clear note is: born 15 January 1995; age on 7 June 2026: 31 years, 4 months, 23 days; Gregorian calendar, month-end clamping. The date pair and convention are more useful than a result copied alone.",
                    "The tool accepts years from 1000 to 3000 and applies Gregorian month rules throughout. It does not translate historical Julian dates, regional calendar changes, lunar calendars, or time-of-birth records. Convert the source record using an appropriate calendar reference before entering dates from another system."
                ],
                "links": [
                    {
                        "href": "https://aa.usno.navy.mil/faq/leap_years",
                        "label": "Calendar reference: U.S. Naval Observatory leap-year rule"
                    },
                    {
                        "href": "/contact-us",
                        "label": "Send a reproducible calculation question"
                    }
                ]
            }
        ],
        "updated": "2026-11-20",
        "faqs": [
            {
                "question": "Should I round up when the next birthday is close?",
                "answer": "No. Completed years increase on the anniversary used by the calculation, not when it is nearby. Keep the remaining months and days if you need more detail."
            },
            {
                "question": "Can I subtract the day, month, and year numbers separately?",
                "answer": "Only with careful calendar borrowing and a defined month-end convention. Counting reached anniversaries first is easier to check and avoids negative or inconsistent remainders."
            },
            {
                "question": "Why does the result mention a calendar convention?",
                "answer": "An anniversary such as 31 January plus one month may not exist in the destination month. The site uses the last day of that month so the result is reproducible."
            }
        ]
    },
    {
        "path": "/leap-year-age-calculator",
        "title": "Leap Year Age Calculator Guide - February 29 Birthdays Explained",
        "description": "Understand how leap years affect age calculations, especially for February 29 birthdays, with examples and practical notes.",
        "heading": "Leap Year Age Calculator",
        "intro": "Leap years add edge cases that matter for exact calendar math, especially when someone is born on February 29.",
        "type": "article",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "Why leap years matter",
                "paragraphs": [
                    "A leap year adds February 29, which means the calendar does not repeat with exactly the same day count every year. Good age calculators account for this instead of flattening every year to a single average length.",
                    "For most birth dates, leap years quietly affect the total day count behind the scenes. For a February 29 birthday, the effect is much more visible because the birthday itself does not appear every year."
                ]
            },
            {
                "title": "How to use this guide",
                "bullets": [
                    "Use your exact birth date, including February 29 when applicable.",
                    "Compare the result for both leap and non-leap target years if you are checking a special case.",
                    "Read the explanation before relying on the result for official paperwork.",
                    "Confirm any legal interpretation with the institution making the decision."
                ]
            },
            {
                "title": "Calendar age and celebration date are separate choices",
                "paragraphs": [
                    "A person born on 29 February still completes years of age between leap days. Counting only the times 29 February has appeared would count matching calendar dates, not the person's age.",
                    "This site uses 28 February as the anniversary when 29 February is missing. A family may choose a different celebration date. If a form or institution specifies an anniversary rule, follow that wording for that task; this page does not establish an official rule."
                ],
                "bullets": [
                    "Keep the real birth date as 29 February in the calculator.",
                    "Use the target date to compare dates around the anniversary.",
                    "Treat a chosen party date as a separate planning date."
                ]
            },
            {
                "title": "The exact convention used on this site",
                "paragraphs": [
                    "This calculator moves a missing anniversary to the last available day of the month. February 29 therefore becomes February 28 in non-leap years. The birthday countdown follows the same convention. This is a calculation choice, not a claim about the rule in any particular jurisdiction.",
                    "For a birth date of February 29, 2024: February 27, 2025 gives 0 years, 11 months, 29 days; February 28 gives 1 year; March 1 gives 1 year and 1 day. In 2028 the full fourth anniversary is February 29."
                ],
                "examples": [
                    {
                        "start": "2024-02-29",
                        "end": "2025-02-27",
                        "expected": [
                            0,
                            11,
                            29
                        ],
                        "totalDays": 364
                    },
                    {
                        "start": "2024-02-29",
                        "end": "2025-02-28",
                        "expected": [
                            1,
                            0,
                            0
                        ],
                        "totalDays": 365
                    },
                    {
                        "start": "2024-02-29",
                        "end": "2025-03-01",
                        "expected": [
                            1,
                            0,
                            1
                        ],
                        "totalDays": 366
                    },
                    {
                        "start": "2024-02-29",
                        "end": "2028-02-29",
                        "expected": [
                            4,
                            0,
                            0
                        ],
                        "totalDays": 1461
                    }
                ]
            },
            {
                "title": "Recognize leap years and verify totals",
                "paragraphs": [
                    "A Gregorian year divisible by 4 is a leap year unless it is a century year not divisible by 400. The year 2000 was a leap year; 2100 is not. Use valid dates rather than assuming every four-year interval has an identical structure.",
                    "February 28 to March 1 is 2 calendar days in 2024 and 1 in 2025. It is a different question from asking how many birthday anniversaries someone has reached. Extra leap days contribute to total days without adding extra complete years."
                ],
                "links": [
                    {
                        "href": "/birthday-countdown-calculator",
                        "label": "Count down using the same anniversary convention"
                    },
                    {
                        "href": "https://aa.usno.navy.mil/faq/leap_years",
                        "label": "Calendar reference: U.S. Naval Observatory leap-year rule"
                    }
                ]
            },
            {
                "title": "Check the February 29 input before changing it",
                "paragraphs": [
                    "If manual entry rejects 29 February, check the year. The date is valid in 2024 and 2028, but not in 2025. The year 2000 is a leap year because it is divisible by 400; the year 2100 is not. Do not change a genuine leap-day birth to 28 February just to make a non-leap target year look similar.",
                    "The birth year and target year have different jobs. The birth year tells us whether the original date exists. The target year tells us which anniversary date is available for comparison. You can therefore enter a valid 29 February birth and choose 28 February in a later non-leap year without editing the birth date."
                ]
            },
            {
                "title": "Why two correct-looking calendars can disagree by a day",
                "paragraphs": [
                    "Check the convention first. A system that waits until 1 March for a non-leap anniversary will not cross its whole-year boundary on the same day as this site. Changing between those conventions affects the years/months/days description near the boundary; it does not change the number of calendar days between two fixed inputs.",
                    "When comparing results, note the original birth date, target date, and anniversary rule. Use total days as a separate check of the date interval, then compare the calendar breakdown under the same convention."
                ],
                "links": [
                    {
                        "href": "/#dob=2024-02-29&target=2025-02-28",
                        "label": "Try the non-leap anniversary example"
                    },
                    {
                        "href": "/date-difference-calculator",
                        "label": "Check the elapsed calendar days"
                    }
                ]
            }
        ],
        "updated": "2026-11-20",
        "faqs": [
            {
                "question": "Does someone born on February 29 age once every four years?",
                "answer": "No. Matching February 29 dates occur less often, but completed years still pass. This tool uses February 28 in years without February 29."
            },
            {
                "question": "Should I enter February 28 for a leap-day birth?",
                "answer": "No. Enter the actual birth date in its original leap year. The calculator applies the stated anniversary convention when evaluating the target date."
            },
            {
                "question": "Does this page tell me a legal birthday rule?",
                "answer": "No. It explains this calculator's convention. Check the applicable institution's instructions when a decision depends on a particular anniversary rule."
            }
        ]
    },
    {
        "path": "/child-age-calculator",
        "title": "Child Age Calculator - Calculate Baby and Toddler Age",
        "description": "Calculate baby and toddler age in years, months, and days and learn when month-by-month age tracking is most useful.",
        "heading": "Child Age Calculator",
        "intro": "Child age is often tracked more closely than adult age, especially during the first two years when months and weeks matter for records and milestones.",
        "type": "article",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "Why child age is often expressed in months",
                "paragraphs": [
                    "For a young child, 14 completed months describes more of the timeline than 1 completed year. A dated family note can preserve the remaining days as well: 14 months and 15 days is more specific than either whole number alone.",
                    "Use this page to calculate chronological age for an appointment date, a family record, or a monthly photo. Choose the date the record refers to rather than assuming that today is always the right target."
                ]
            },
            {
                "title": "How to use this tool",
                "bullets": [
                    "Enter the child’s date of birth accurately.",
                    "Choose today for a current age check or another date for an appointment or admission deadline.",
                    "Read the age in both years and months when the child is still very young.",
                    "Use the result as a planning aid, then verify any official requirement with the nursery, clinic, or school."
                ]
            },
            {
                "title": "Typical use cases",
                "bullets": [
                    "Writing an age beside a dated family photograph",
                    "Checking age on a planned nursery visit or appointment",
                    "Comparing completed months with completed weeks",
                    "Planning a first or second birthday keepsake"
                ]
            },
            {
                "title": "Worked example: complete months versus weeks",
                "paragraphs": [
                    "For a child born on January 31, 2024, the date March 1, 2024 gives 1 complete month and 1 day. The interval is 30 calendar days, or 4 complete weeks with 2 days left. Four weeks is only 28 days, so a month should not be treated as exactly four weeks.",
                    "For a birth date of April 10, 2025 and an appointment date of June 25, 2026, the result is 1 year, 2 months, 15 days. Total complete months is 14. Record the target date with the age so the note still makes sense later."
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
                        "start": "2025-04-10",
                        "end": "2026-06-25",
                        "expected": [
                            1,
                            2,
                            15
                        ],
                        "totalDays": 441
                    },
                    {
                        "start": "2025-04-10",
                        "end": "2025-04-10",
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
                "title": "What this child-age tool does not measure",
                "paragraphs": [
                    "This is chronological age: elapsed calendar time since birth. It does not calculate adjusted age for premature birth, interpret development, or generate a vaccination schedule. Ask a clinician which age measure an individual record requires.",
                    "This page is intended for parents and caregivers. No child profile is created. Use invented dates for examples when reporting an issue, and avoid sharing a child's birth date through a result link unless you intend the recipient to see it."
                ]
            },
            {
                "title": "Convert the displayed result into a clear age note",
                "paragraphs": [
                    "To express the result entirely in completed months, multiply completed years by 12 and add the remaining months. Keep the remaining days separately. The example of 1 year, 2 months, and 15 days becomes 14 months and 15 days. The Total Months box shows 14, because it counts completed months only.",
                    "For weeks, divide Total Days by seven, take the whole number, and keep the remainder as days. A 30-day interval is 4 weeks and 2 days. Do not multiply completed months by four: that would turn a 31-day month into only 28 days."
                ],
                "table": {
                    "caption": "Two useful descriptions of the same child-age record",
                    "headers": [
                        "Record",
                        "What to write"
                    ],
                    "rows": [
                        [
                            "Born 31 January 2024; checked 1 March 2024",
                            "1 month and 1 day, or 4 weeks and 2 days"
                        ],
                        [
                            "Born 10 April 2025; checked 25 June 2026",
                            "14 months and 15 days"
                        ],
                        [
                            "Birth date and reference date are identical",
                            "0 elapsed days; the birth date is the starting point"
                        ]
                    ]
                }
            },
            {
                "title": "Keep monthly records consistent",
                "paragraphs": [
                    "Choose one convention and record the observation date each time. For a birth on 31 January, this tool reaches the first month anniversary on the last day of February. The second month anniversary is 31 March. It does not permanently move all later anniversaries to the 28th or 29th.",
                    "For appointments, calculate age on the appointment date even if you prepare the note a week earlier. If the appointment moves, update the target and calculate again. This gives the reader a reproducible date pair rather than an age that silently becomes out of date."
                ],
                "links": [
                    {
                        "href": "/age-calculator-for-school-admission",
                        "label": "Use a fixed school cut-off date"
                    },
                    {
                        "href": "/leap-year-age-calculator",
                        "label": "Read the February and month-end examples"
                    }
                ]
            }
        ],
        "updated": "2026-11-20",
        "faqs": [
            {
                "question": "Is 12 weeks the same as 3 months?",
                "answer": "No. Twelve weeks is 84 days. Three calendar months depend on the start date and month lengths. Use the requested unit and retain any remaining days."
            },
            {
                "question": "Does Total Months include a partial month?",
                "answer": "No. It counts complete calendar months. Use the years/months/days result to retain the additional days."
            },
            {
                "question": "Can this calculate corrected or developmental age?",
                "answer": "No. The tool only measures chronological calendar age from the birth date. It does not assess development or use an expected due date."
            }
        ]
    },
    {
        "path": "/age-calculator-for-school-admission",
        "title": "Age on a School Cut-Off Date - Admission Planning Guide",
        "description": "Calculate a child's age on a school cut-off date, compare before/on/after birthday examples, and prepare a clear record of the dates to confirm with the school.",
        "heading": "Age Calculator For School Admission",
        "intro": "School admission often depends on a cut-off date, so families need more than a simple birthday-to-today calculation.",
        "type": "article",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "How parents use admission age checks",
                "paragraphs": [
                    "Schools frequently ask whether a child has reached a required age by a fixed date such as June 1, September 1, or the first day of class. In that situation, you want the child’s exact age on the official cut-off date rather than their current age.",
                    "That makes a target-date age calculator especially useful because it shows the age as of the exact day the school uses."
                ]
            },
            {
                "title": "How to use this tool for admissions",
                "bullets": [
                    "Find the official school cut-off date first.",
                    "Enter the child’s date of birth and set the target date to the school’s rule date.",
                    "Review the exact age shown on that date, not just the age today.",
                    "Keep the result with your planning notes, but rely on the school’s published policy for the final decision."
                ]
            },
            {
                "title": "What to confirm with the school",
                "bullets": [
                    "The official cut-off date",
                    "Whether age must be reached on or before that date",
                    "Whether local rules allow exceptions or waivers",
                    "Which documents are accepted as proof of birth date"
                ]
            },
            {
                "title": "An illustrative cut-off example",
                "paragraphs": [
                    "Suppose a hypothetical school requires a child to be 5 on or before September 1, 2026. A birth date of September 1, 2021 gives exactly 5 years on that date. A birth date of September 2, 2021 gives 4 years, 11 months, 30 days. That one-day difference can matter when the stated condition requires a completed fifth birthday.",
                    "This is an example of reading a condition, not a current admission rule for any school or location. The calculator returns age only. It does not check waivers, residence, grade placement, application dates, or required evidence."
                ],
                "examples": [
                    {
                        "start": "2021-08-31",
                        "end": "2026-09-01",
                        "expected": [
                            5,
                            0,
                            1
                        ],
                        "totalDays": 1827
                    },
                    {
                        "start": "2021-09-01",
                        "end": "2026-09-01",
                        "expected": [
                            5,
                            0,
                            0
                        ],
                        "totalDays": 1826
                    },
                    {
                        "start": "2021-09-02",
                        "end": "2026-09-01",
                        "expected": [
                            4,
                            11,
                            30
                        ],
                        "totalDays": 1825
                    }
                ]
            },
            {
                "title": "Keep the rule and the date together",
                "paragraphs": [
                    "Copy the exact cut-off wording into your planning notes and record its source and school year. A rule for last year may not apply to the upcoming intake. Distinguish \"before\" from \"on or before\" and ask the school about leap-day birthdays or any unclear wording.",
                    "Use the target date field to reproduce the calculation. Do not substitute the first day of lessons for the published cut-off unless the school says they are the same."
                ],
                "links": [
                    {
                        "href": "/how-to-calculate-age",
                        "label": "Check the age manually"
                    }
                ]
            },
            {
                "title": "Separate the application deadline from the age cut-off",
                "paragraphs": [
                    "An application deadline says when a form is due. An age cut-off says when age is measured. The first day of class is a third date. They may be different, so copying the nearest date from an admissions page can produce the wrong age for the question you are answering.",
                    "For example, imagine applications close on 1 June but age is measured on 1 September. A child whose birthday is in July has not yet reached that birthday in June but has reached it by September. Enter 1 September as the target for the age check. This is a hypothetical example, not a rule for a particular school."
                ]
            },
            {
                "title": "A simple planning record to take to the school",
                "table": {
                    "caption": "Keep the source and calculation together",
                    "headers": [
                        "Item",
                        "What to record"
                    ],
                    "rows": [
                        [
                            "Programme and intake",
                            "The exact school, grade or programme, and school year"
                        ],
                        [
                            "Source",
                            "The official notice or page and the date you checked it"
                        ],
                        [
                            "Age condition",
                            "The exact wording, including before or on or before"
                        ],
                        [
                            "Dates used",
                            "Date of birth and the published age cut-off date"
                        ],
                        [
                            "Result",
                            "Completed years, months, and days on that cut-off"
                        ],
                        [
                            "Open question",
                            "Any exception, leap-day wording, or document requirement to clarify"
                        ]
                    ]
                },
                "paragraphs": [
                    "Keep this as a personal planning note. The calculator does not verify the source, submit an application, or issue an eligibility certificate. If the published wording is unclear, ask the school a specific question using the two dates rather than relying on a rounded age such as almost five."
                ]
            }
        ],
        "updated": "2026-11-20",
        "faqs": [
            {
                "question": "Should I choose today or the first day of school?",
                "answer": "Choose the date named in the school's age rule. Neither today nor the first day of classes should replace that date unless the instructions make them the same."
            },
            {
                "question": "Does 4 years and 11 months count as 5?",
                "answer": "The calculator reports 4 completed years. It does not round that up. Only the institution can explain how its own condition or exceptions apply."
            },
            {
                "question": "Will the calculator confirm admission eligibility?",
                "answer": "No. It measures age on the entered date. Other conditions and the final decision remain with the school or relevant authority."
            }
        ]
    },
    {
        "path": "/age-calculator-for-passport-visa",
        "title": "Age Calculator for Passport and Visa Forms - Practical Guide",
        "description": "Use an age calculator to prepare passport and visa forms, verify target-date age, and avoid common date-entry mistakes.",
        "heading": "Age Calculator For Passport And Visa",
        "intro": "Prepare a clear age-on-date record for a form by checking the birth date, reference date, and requested date format. This guide does not determine passport or visa eligibility.",
        "type": "article",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "Where age checks help on travel documents",
                "paragraphs": [
                    "Applicants may need to confirm whether someone is under a certain age on the submission date, interview date, or travel date. Parents may also want to check a child’s age at planned departure when rules differ for infants, children, and adults.",
                    "The main benefit of a calculator here is speed and error reduction. It helps you avoid mistakes caused by date format confusion or manual counting."
                ]
            },
            {
                "title": "How to use this tool for forms",
                "bullets": [
                    "Check whether the relevant office cares about age on the application date, interview date, or travel date.",
                    "Enter the person’s date of birth and then choose that exact target date.",
                    "Use the result to double-check age-sensitive form sections before submitting.",
                    "Always compare the result against the official passport or visa instructions."
                ]
            },
            {
                "title": "Important caution",
                "paragraphs": [
                    "Immigration and passport rules are official requirements, not calculator rules. Always rely on the embassy, consulate, passport office, or government instructions for the final decision."
                ]
            },
            {
                "title": "Example: the target date changes the answer",
                "paragraphs": [
                    "For a birth date of December 10, 2008, the age on a hypothetical application date of December 9, 2026 is 17 years, 11 months, 29 days. On December 10 it is exactly 18. This example illustrates a birthday boundary only; it does not identify a passport or visa age requirement.",
                    "If a form asks for age on a particular date, use that date even when the appointment, departure, and application dates differ. When it asks only for date of birth, copy the date from the relevant document rather than entering a calculated age."
                ],
                "examples": [
                    {
                        "start": "2008-12-10",
                        "end": "2026-12-09",
                        "expected": [
                            17,
                            11,
                            29
                        ],
                        "totalDays": 6573
                    },
                    {
                        "start": "2008-12-10",
                        "end": "2026-12-10",
                        "expected": [
                            18,
                            0,
                            0
                        ],
                        "totalDays": 6574
                    },
                    {
                        "start": "2008-12-10",
                        "end": "2027-01-15",
                        "expected": [
                            18,
                            1,
                            5
                        ],
                        "totalDays": 6610
                    }
                ]
            },
            {
                "title": "Avoid date-format and document mistakes",
                "paragraphs": [
                    "Check whether a form requests day/month/year, month/day/year, or year-month-day. A date such as 04/05/2010 can be read two ways. The calendar input follows your browser format. The manual input labels Day, Month, and Year separately, so 4 May 2010 is Day 04, Month 05, Year 2010.",
                    "This tool does not determine visa eligibility, passport validity, permitted travel, or the definition of a minor. Find the official issuing authority's instructions for the particular application and date. No documents need to be uploaded to use this calculator."
                ]
            },
            {
                "title": "Compare reference dates without changing the birth record",
                "paragraphs": [
                    "A person may have a birthday between preparing a form and attending an appointment. Keep the birth date fixed and calculate each requested reference date separately. Label the outputs so an age on submission is not accidentally copied into a field asking for age on another date.",
                    "For the example above, 9 December and 10 December 2026 give different completed-year values. This demonstrates why a one-day difference can matter in a form; it does not imply that the age of 18 is the applicable threshold for your document. Use the authority's instructions to decide what information is actually required."
                ],
                "bullets": [
                    "If the field asks for date of birth, copy the documented date rather than a calculated age.",
                    "If the field asks for completed years on a named date, use that target and the Years value; do not round up the months.",
                    "If the form uses an unfamiliar calendar or date order, resolve that format before entering it in this Gregorian calculator.",
                    "If two source documents disagree, ask the issuing authority how to resolve the record; changing a calculator input does not correct a document."
                ]
            },
            {
                "title": "Age calculation is different from document validity",
                "paragraphs": [
                    "A birth date and a reference date can answer an age question. They cannot establish whether a passport remains valid for a journey, whether a visa permits entry, or which application category applies. Those questions need the specific document, destination, and current official instructions.",
                    "If you simply need the calendar interval between two dates printed on a document, use Date Difference and label the dates. Do not interpret that interval as permission to travel. This site does not request passport numbers, identity images, or uploads."
                ],
                "links": [
                    {
                        "href": "/date-difference-calculator",
                        "label": "Measure a date interval separately"
                    },
                    {
                        "href": "/how-to-calculate-age",
                        "label": "Verify a completed-years result manually"
                    }
                ]
            }
        ],
        "updated": "2026-11-20",
        "faqs": [
            {
                "question": "Which date should I use for a passport or visa form?",
                "answer": "Use the reference date specified in the instructions for that field. If no date is clear, ask the issuing authority rather than assuming it means departure or today."
            },
            {
                "question": "Can I enter a passport expiry date as the target?",
                "answer": "The tool can calculate age on that date, but it cannot determine passport validity or travel permission. A date-difference calculation answers a separate interval question."
            },
            {
                "question": "Do I need to upload any documents?",
                "answer": "No. The calculator needs only dates. Do not send identity documents when requesting help with a calculation."
            }
        ]
    }
];
