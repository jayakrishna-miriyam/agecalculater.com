export interface FAQEntry {
    question: string;
    answer: string;
}

export interface SectionContent {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
}

export interface PageMeta {
    path: string;
    title: string;
    description: string;
    heading: string;
    intro: string;
    type: 'website' | 'article';
    includeInSitemap?: boolean;
    noindex?: boolean;
    sections?: SectionContent[];
}

export interface ToolDirectoryItem {
    href: string;
    label: string;
    summary: string;
    highlights: string[];
}

export const siteUrl = 'https://agecalculater.com';

export const primaryNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-tools', label: 'All Tools' },
    { href: '/age-difference-calculator', label: 'Age Difference' },
    { href: '/birthday-countdown-calculator', label: 'Birthday Countdown' },
    { href: '/date-difference-calculator', label: 'Date Difference' },
    { href: '/how-to-calculate-age', label: 'Guides' },
];

export const footerLinks = [
    { href: '/about-us', label: 'About' },
    { href: '/contact-us', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-and-conditions', label: 'Terms' },
    { href: '/disclaimer', label: 'Disclaimer' },
];

export const homepageFaqs: FAQEntry[] = [
    {
        question: 'What is an age calculator?',
        answer:
            'An age calculator measures the exact time between a date of birth and a target date. Instead of guessing with rough averages, it works through the calendar to return full years, remaining months, and leftover days.',
    },
    {
        question: 'How do I calculate my age from date of birth?',
        answer:
            'Enter your date of birth, choose today or another target date, and run the calculation. The result shows how many full birthdays have passed, then counts the remaining calendar months and days after the last full year.',
    },
    {
        question: 'Is this age calculator accurate?',
        answer:
            'The calculation is designed for calendar accuracy in years, months, and days. It compares actual month lengths and leap years rather than using a fixed 365-day shortcut.',
    },
    {
        question: 'Does it handle leap years?',
        answer:
            'Yes. Leap years are handled naturally because the calculator compares real calendar dates, including February with 28 or 29 days depending on the year.',
    },
    {
        question: 'How is a February 29 birthday calculated?',
        answer:
            'A February 29 birth date is preserved as entered. When a target year is not a leap year, the age still advances based on the calendar sequence around late February and early March, which is why people may see official rules vary by institution.',
    },
    {
        question: 'Can I calculate age on a future date?',
        answer:
            'Yes. Choose any future date to estimate age for admissions, milestone planning, birthdays, or form eligibility checks. This is useful when rules apply on a specific cut-off day rather than today.',
    },
    {
        question: 'Can I calculate age for school admission?',
        answer:
            'Yes. Many families use an age calculator to compare a child’s date of birth with a school cut-off date. The result helps you prepare, but final eligibility should always be confirmed with the school or board.',
    },
    {
        question: 'Is my date of birth stored?',
        answer:
            'The calculator inputs used for the visible result are processed in your browser. Analytics or hosting systems may still record general site usage, but the calculator does not require an account profile storing your date of birth to work.',
    },
    {
        question: 'Why might another calculator show a different result?',
        answer:
            'Differences usually come from date format confusion, timezone handling near midnight, or a site using approximate month lengths. When comparing tools, make sure both are using the same target date and local calendar interpretation.',
    },
    {
        question: 'Can I use this result for legal documents?',
        answer:
            'The calculator is useful for preparation and double-checking, but legal, immigration, exam, employment, and medical decisions should always rely on the rules published by the relevant authority.',
    },
];

export const pageDefinitions: PageMeta[] = [
    {
        path: '/all-tools',
        title: 'All Tools - AgeCalculater.com',
        description:
            'Browse all available tools on AgeCalculater.com, including age calculation, age difference, birthday countdown, date difference, child age, and leap-year guides.',
        heading: 'All Tools',
        intro:
            'Explore every available calculator and supporting tool page in one place so visitors can quickly choose the right option.',
        type: 'website',
        includeInSitemap: true,
    },
    {
        path: '/',
        title: 'Age Calculator Online - Calculate Exact Age in Years, Months and Days',
        description:
            'Use our free age calculator online to find exact age in years, months, and days, learn how age is calculated, and explore guides for admission, passports, and leap-year birthdays.',
        heading: 'Age Calculator Online',
        intro:
            'Calculate exact age from a date of birth to today or any target date, then explore clear guides that explain the result and common real-world use cases.',
        type: 'website',
        includeInSitemap: true,
    },
    {
        path: '/age-difference-calculator',
        title: 'Age Difference Calculator - Compare Two Birth Dates Online',
        description:
            'Calculate the age gap between two people or dates in years, months, and days with a simple age difference calculator and practical examples.',
        heading: 'Age Difference Calculator',
        intro:
            'Compare two birth dates to see the exact age gap in calendar years, months, and days.',
        type: 'website',
        includeInSitemap: true,
    },
    {
        path: '/birthday-countdown-calculator',
        title: 'Birthday Countdown Calculator - Days Until Your Next Birthday',
        description:
            'Find the exact number of days, hours, minutes, and seconds until the next birthday and understand how birthday countdowns are calculated.',
        heading: 'Birthday Countdown Calculator',
        intro:
            'Check how long it is until the next birthday and use the countdown for planning milestones, parties, and reminders.',
        type: 'website',
        includeInSitemap: true,
    },
    {
        path: '/date-difference-calculator',
        title: 'Date Difference Calculator - Difference Between Two Dates',
        description:
            'Measure the difference between two dates in years, months, days, weeks, hours, and seconds with a clear date difference calculator.',
        heading: 'Date Difference Calculator',
        intro:
            'Measure the span between any two calendar dates for projects, timelines, applications, and personal planning.',
        type: 'website',
        includeInSitemap: true,
    },
    {
        path: '/how-to-calculate-age',
        title: 'How to Calculate Age Manually - Formula, Steps and Examples',
        description:
            'Learn how to calculate age manually using full years, remaining months, and leftover days, with simple worked examples.',
        heading: 'How To Calculate Age',
        intro:
            'This guide explains the manual method behind age calculation so you can verify a result without relying only on a tool.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'The basic formula',
                paragraphs: [
                    'Age is the time between a date of birth and a chosen target date. The practical method is not to divide total days by a rough yearly average. Instead, you count full years first, then the remaining full months, and finally the leftover days.',
                    'That order matters because calendars are irregular. Months have 28, 29, 30, or 31 days, and leap years introduce an extra day in February. A person who is 10 years and 11 months old is not the same as someone who is simply a certain number of days divided by 365.',
                ],
                bullets: [
                    'Step 1: Subtract birth year from target year.',
                    'Step 2: Reduce one year if the birthday has not occurred yet in the target year.',
                    'Step 3: Count remaining months after the last full birthday.',
                    'Step 4: Count remaining days after the last full month.',
                ],
            },
            {
                title: 'Worked example',
                paragraphs: [
                    'Suppose the date of birth is January 15, 1995 and the target date is June 7, 2026. The full-year difference is 31 years. Because June 7 comes after January 15, all 31 full years count.',
                    'From January 15, 2026 to June 7, 2026 there are 4 full months and 23 days remaining. The final age is 31 years, 4 months, and 23 days.',
                ],
            },
            {
                title: 'When manual checks are useful',
                paragraphs: [
                    'Manual age checks help when you need to confirm school cut-off dates, visa or passport form fields, age limits for exams, or milestone timing for records. Even when you use a calculator, understanding the method makes it easier to catch input mistakes.',
                ],
            },
        ],
    },
    {
        path: '/leap-year-age-calculator',
        title: 'Leap Year Age Calculator Guide - February 29 Birthdays Explained',
        description:
            'Understand how leap years affect age calculations, especially for February 29 birthdays, with examples and practical notes.',
        heading: 'Leap Year Age Calculator',
        intro:
            'Leap years add edge cases that matter for exact calendar math, especially when someone is born on February 29.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'Why leap years matter',
                paragraphs: [
                    'A leap year adds February 29, which means the calendar does not repeat with exactly the same day count every year. Good age calculators account for this instead of flattening every year to a single average length.',
                    'For most birth dates, leap years quietly affect the total day count behind the scenes. For a February 29 birthday, the effect is much more visible because the birthday itself does not appear every year.',
                ],
            },
            {
                title: 'How to use this guide',
                bullets: [
                    'Use your exact birth date, including February 29 when applicable.',
                    'Compare the result for both leap and non-leap target years if you are checking a special case.',
                    'Read the explanation before relying on the result for official paperwork.',
                    'Confirm any legal interpretation with the institution making the decision.',
                ],
            },
            {
                title: 'How February 29 birthdays are usually interpreted',
                paragraphs: [
                    'For informational age calculation, the key point is that the person continues to age normally from year to year even if the exact date is absent in a non-leap year. Some institutions treat February 28 as the practical equivalent, while others use March 1 for certain legal or administrative rules.',
                    'Because these policies vary, an online calculator should explain the calendar result clearly and encourage users to verify official rules for legal decisions.',
                ],
                bullets: [
                    'Leap-year birthdays still require exact calendar handling.',
                    'Official interpretation can differ by agency or country.',
                    'A calculator result is helpful, but policy documents have final authority.',
                ],
            },
        ],
    },
    {
        path: '/child-age-calculator',
        title: 'Child Age Calculator - Calculate Baby and Toddler Age',
        description:
            'Calculate baby and toddler age in years, months, and days and learn when month-by-month age tracking is most useful.',
        heading: 'Child Age Calculator',
        intro:
            'Child age is often tracked more closely than adult age, especially during the first two years when months and weeks matter for records and milestones.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'Why child age is often expressed in months',
                paragraphs: [
                    'For infants and toddlers, saying a child is 14 months old is more precise than saying 1 year old. Pediatric visits, growth tracking, nursery enrollment, and developmental milestones often use months because changes happen quickly.',
                    'A good child age calculator helps parents and caregivers move between date of birth, exact age today, and age on a future admission or appointment date.',
                ],
            },
            {
                title: 'How to use this tool',
                bullets: [
                    'Enter the child’s date of birth accurately.',
                    'Choose today for a current age check or another date for an appointment or admission deadline.',
                    'Read the age in both years and months when the child is still very young.',
                    'Use the result as a planning aid, then verify any official requirement with the nursery, clinic, or school.',
                ],
            },
            {
                title: 'Typical use cases',
                bullets: [
                    'Checking nursery or preschool eligibility dates',
                    'Preparing pediatric or vaccination records',
                    'Tracking monthly milestones for babies',
                    'Planning birthday milestones and keepsake records',
                ],
            },
        ],
    },
    {
        path: '/age-calculator-for-school-admission',
        title: 'Age Calculator for School Admission - Check Cut-Off Date Eligibility',
        description:
            'Use an age calculator for school admission planning, compare a child’s birth date with a cut-off date, and understand what to verify with the school.',
        heading: 'Age Calculator For School Admission',
        intro:
            'School admission often depends on a cut-off date, so families need more than a simple birthday-to-today calculation.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'How parents use admission age checks',
                paragraphs: [
                    'Schools frequently ask whether a child has reached a required age by a fixed date such as June 1, September 1, or the first day of class. In that situation, you want the child’s exact age on the official cut-off date rather than their current age.',
                    'That makes a target-date age calculator especially useful because it shows the age as of the exact day the school uses.',
                ],
            },
            {
                title: 'How to use this tool for admissions',
                bullets: [
                    'Find the official school cut-off date first.',
                    'Enter the child’s date of birth and set the target date to the school’s rule date.',
                    'Review the exact age shown on that date, not just the age today.',
                    'Keep the result with your planning notes, but rely on the school’s published policy for the final decision.',
                ],
            },
            {
                title: 'What to confirm with the school',
                bullets: [
                    'The official cut-off date',
                    'Whether age must be reached on or before that date',
                    'Whether local rules allow exceptions or waivers',
                    'Which documents are accepted as proof of birth date',
                ],
            },
        ],
    },
    {
        path: '/age-calculator-for-passport-visa',
        title: 'Age Calculator for Passport and Visa Forms - Practical Guide',
        description:
            'Use an age calculator to prepare passport and visa forms, verify target-date age, and avoid common date-entry mistakes.',
        heading: 'Age Calculator For Passport And Visa',
        intro:
            'Passport, visa, and identity applications often involve age-sensitive questions, especially for minors, validity windows, or eligibility categories.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'Where age checks help on travel documents',
                paragraphs: [
                    'Applicants may need to confirm whether someone is under a certain age on the submission date, interview date, or travel date. Parents may also want to check a child’s age at planned departure when rules differ for infants, children, and adults.',
                    'The main benefit of a calculator here is speed and error reduction. It helps you avoid mistakes caused by date format confusion or manual counting.',
                ],
            },
            {
                title: 'How to use this tool for forms',
                bullets: [
                    'Check whether the relevant office cares about age on the application date, interview date, or travel date.',
                    'Enter the person’s date of birth and then choose that exact target date.',
                    'Use the result to double-check age-sensitive form sections before submitting.',
                    'Always compare the result against the official passport or visa instructions.',
                ],
            },
            {
                title: 'Important caution',
                paragraphs: [
                    'Immigration and passport rules are official requirements, not calculator rules. Always rely on the embassy, consulate, passport office, or government instructions for the final decision.',
                ],
            },
        ],
    },
    {
        path: '/about-us',
        title: 'About Us - AgeCalculater.com',
        description:
            'Learn why AgeCalculater.com exists, what the site is designed to do, and how to contact the team behind the calculator and guides.',
        heading: 'About Us',
        intro:
            'AgeCalculater.com was created to offer a straightforward way to calculate age and understand the dates behind the result.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'What this site is for',
                paragraphs: [
                    'The goal of this site is to combine a simple age calculator with useful explanatory content. Many visitors do not just want a number. They want to know how age is calculated, how leap years affect the answer, and how to use the result for school, travel, or personal planning.',
                    'We aim to publish clear, original guidance that helps users verify dates more confidently instead of relying on thin tool pages with little context.',
                ],
            },
            {
                title: 'Editorial approach',
                paragraphs: [
                    'Calculator outputs are generated from the on-page inputs. Supporting content is written to explain the method, common use cases, and important limitations. Where official requirements matter, we encourage users to confirm the result with the relevant authority.',
                    'Last updated: June 7, 2026.',
                ],
            },
            {
                title: 'Contact',
                paragraphs: ['For site questions, corrections, or feedback, contact hello@agecalculater.com.'],
            },
        ],
    },
    {
        path: '/contact-us',
        title: 'Contact Us - AgeCalculater.com',
        description:
            'Contact AgeCalculater.com for feedback, correction requests, partnerships, or support questions about the age calculator and guides.',
        heading: 'Contact Us',
        intro:
            'Questions and corrections are welcome. We use this page for user feedback, content updates, and support requests related to the site.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'How to reach us',
                paragraphs: [
                    'Email: hello@agecalculater.com',
                    'Expected response time: within 2 to 3 business days.',
                    'If you are reporting a calculation issue, include the dates you entered and the result you expected so the problem can be reviewed properly.',
                ],
            },
            {
                title: 'What this inbox is for',
                bullets: [
                    'Feedback about the calculator or content',
                    'Requests to correct factual errors',
                    'Technical problems such as broken pages or form issues',
                    'General business or partnership enquiries',
                ],
            },
        ],
    },
    {
        path: '/privacy-policy',
        title: 'Privacy Policy - AgeCalculater.com',
        description:
            'Read the privacy policy for AgeCalculater.com, including how browser-side calculations work, analytics use, cookies, and advertising disclosures.',
        heading: 'Privacy Policy',
        intro:
            'This privacy policy explains what information may be processed when you use AgeCalculater.com and how advertising and analytics disclosures apply.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'Browser-side calculations',
                paragraphs: [
                    'The visible age calculations on this site are designed to run in your browser from the dates you enter on the page. The date values are used to generate the displayed result and do not need to be stored as a user account profile for the calculator to work.',
                ],
            },
            {
                title: 'Analytics and basic technical data',
                paragraphs: [
                    'Like many websites, this site may use analytics and hosting logs to understand traffic, diagnose technical problems, and improve the experience. That may include information such as browser type, device information, referring pages, and general usage events.',
                ],
            },
            {
                title: 'Cookies and advertising',
                paragraphs: [
                    'Third-party vendors, including Google, may use cookies to serve ads based on a user’s prior visits to this website or other websites.',
                    'Google’s advertising cookies enable Google and its partners to serve ads based on your visit to this site and or other sites on the internet.',
                    'Users may opt out of personalized advertising by visiting Google Ads Settings, or they may review broader opt-out options through www.aboutads.info where available.',
                ],
            },
            {
                title: 'Contact for privacy questions',
                paragraphs: ['For privacy-related questions, contact hello@agecalculater.com.'],
            },
        ],
    },
    {
        path: '/terms-and-conditions',
        title: 'Terms and Conditions - AgeCalculater.com',
        description:
            'Review the terms and conditions for using AgeCalculater.com, including acceptable use, content ownership, and limitation of liability.',
        heading: 'Terms And Conditions',
        intro:
            'These terms explain the basic conditions for using the site and its calculator tools.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'Use of the site',
                paragraphs: [
                    'AgeCalculater.com is provided for informational and general utility purposes. You agree to use the site lawfully and not to interfere with its operation, attempt unauthorized access, or misuse the service.',
                ],
            },
            {
                title: 'No guarantee of suitability for every official purpose',
                paragraphs: [
                    'We work to keep the calculator and content useful and clear, but we do not guarantee that the site will satisfy every legal, regulatory, educational, employment, medical, or immigration requirement.',
                ],
            },
            {
                title: 'Content ownership',
                paragraphs: [
                    'Site content, branding, and presentation remain the property of AgeCalculater.com unless otherwise stated. Short quotations may be referenced with proper attribution where applicable.',
                ],
            },
            {
                title: 'Changes to these terms',
                paragraphs: ['These terms may be updated as the site changes. Continued use of the site means you accept the current version.'],
            },
        ],
    },
    {
        path: '/disclaimer',
        title: 'Disclaimer - AgeCalculater.com',
        description:
            'Read the AgeCalculater.com disclaimer covering informational use, legal and medical limitations, and verification with official sources.',
        heading: 'Disclaimer',
        intro:
            'The calculator and supporting articles are intended to be useful, but they are not a substitute for official advice or formal decision-making rules.',
        type: 'article',
        includeInSitemap: true,
        sections: [
            {
                title: 'Informational use only',
                paragraphs: [
                    'Results on this site are provided for informational convenience. They are suitable for everyday planning and double-checking, but they should not be treated as legal, medical, academic, employment, or immigration advice.',
                ],
            },
            {
                title: 'Verify with official sources',
                bullets: [
                    'School admissions should be verified with the school or board.',
                    'Passport and visa requirements should be verified with the relevant government authority.',
                    'Medical or developmental interpretations should be confirmed with qualified professionals.',
                    'Employment or exam age limits should be checked against the official notice or policy.',
                ],
            },
        ],
    },
    {
        path: '/404',
        title: 'Page Not Found - AgeCalculater.com',
        description:
            'The page you requested could not be found. Explore the main age calculator and related guides instead.',
        heading: 'Page Not Found',
        intro:
            'The link you followed does not match a live page on this site. Use the navigation below to return to the main tools and guides.',
        type: 'website',
        noindex: true,
    },
];

export const pageMap = Object.fromEntries(pageDefinitions.map((page) => [page.path, page]));

export const relatedResources = [
    { href: '/all-tools', label: 'All Tools' },
    { href: '/age-difference-calculator', label: 'Age Difference Calculator' },
    { href: '/birthday-countdown-calculator', label: 'Birthday Countdown Calculator' },
    { href: '/date-difference-calculator', label: 'Date Difference Calculator' },
    { href: '/leap-year-age-calculator', label: 'Leap Year Age Calculator' },
    { href: '/child-age-calculator', label: 'Child Age Calculator' },
    { href: '/age-calculator-for-school-admission', label: 'School Admission Age Guide' },
    { href: '/age-calculator-for-passport-visa', label: 'Passport and Visa Age Guide' },
];

export const toolDirectory: ToolDirectoryItem[] = [
    {
        href: '/',
        label: 'Age Calculator',
        summary: 'Calculate exact age from a date of birth to today or any custom date.',
        highlights: ['Years, months, and days', 'Live age counter', 'Shareable result links'],
    },
    {
        href: '/age-difference-calculator',
        label: 'Age Difference Calculator',
        summary: 'Compare two birth dates and measure the exact age gap.',
        highlights: ['Calendar-based comparison', 'Useful for siblings or records', 'Shows total units too'],
    },
    {
        href: '/birthday-countdown-calculator',
        label: 'Birthday Countdown Calculator',
        summary: 'See how long remains until the next birthday in real time.',
        highlights: ['Live countdown', 'Great for planning events', 'Simple date entry'],
    },
    {
        href: '/date-difference-calculator',
        label: 'Date Difference Calculator',
        summary: 'Measure the span between any two dates for planning, records, or deadlines.',
        highlights: ['Years to seconds', 'Project and deadline friendly', 'Clear summary boxes'],
    },
    {
        href: '/leap-year-age-calculator',
        label: 'Leap Year Age Calculator',
        summary: 'Understand leap-year handling and February 29 birthday edge cases.',
        highlights: ['Explains leap-year logic', 'Helpful for special birthdays', 'Policy caution included'],
    },
    {
        href: '/child-age-calculator',
        label: 'Child Age Calculator',
        summary: 'Track child age in a way that is useful for babies, toddlers, and admissions.',
        highlights: ['Month-focused guidance', 'Caregiver friendly', 'Admission and clinic use cases'],
    },
    {
        href: '/age-calculator-for-school-admission',
        label: 'School Admission Age Tool',
        summary: 'Plan around cut-off dates and understand how to check school age eligibility.',
        highlights: ['Cut-off date workflow', 'Parent-friendly guidance', 'Checklist for verification'],
    },
    {
        href: '/age-calculator-for-passport-visa',
        label: 'Passport and Visa Age Tool',
        summary: 'Use age calculations to prepare travel and identity forms with fewer date mistakes.',
        highlights: ['Submission-date planning', 'Minor traveler use cases', 'Official-rule reminder'],
    },
];
