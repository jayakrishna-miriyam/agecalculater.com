const siteUrl = 'https://agecalculater.com';
const socialImageUrl =
  'https://res.cloudinary.com/miryam/image/upload/v1757368189/agecalculater.com/assets/Fav-icon-dark_webP.webp';
const defaultKeywords =
  'age calculator, calculate age online, exact age calculator, birthday calculator, date of birth calculator, live age counter, chronological age, age in years months days, age difference calculator, how old am I, find my age';

const homepageFaqs = [
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
];

const pageSeo = [
  {
    path: '/',
    title: 'Age Calculator Online - Calculate Exact Age in Years, Months and Days',
    description:
      'Use our free age calculator online to find exact age in years, months, and days, learn how age is calculated, and explore guides for admission, passports, and leap-year birthdays.',
    heading: 'Age Calculator Online',
    type: 'website',
    includeInSitemap: true,
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/all-tools',
    title: 'All Tools - AgeCalculater.com',
    description:
      'Browse all available tools on AgeCalculater.com, including age calculation, age difference, birthday countdown, date difference, child age, and leap-year guides.',
    heading: 'All Tools',
    type: 'website',
    includeInSitemap: true,
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    path: '/age-difference-calculator',
    title: 'Age Difference Calculator - Compare Two Birth Dates Online',
    description:
      'Calculate the age gap between two people or dates in years, months, and days with a simple age difference calculator and practical examples.',
    heading: 'Age Difference Calculator',
    type: 'website',
    includeInSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/birthday-countdown-calculator',
    title: 'Birthday Countdown Calculator - Days Until Your Next Birthday',
    description:
      'Find the exact number of days, hours, minutes, and seconds until the next birthday and understand how birthday countdowns are calculated.',
    heading: 'Birthday Countdown Calculator',
    type: 'website',
    includeInSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/date-difference-calculator',
    title: 'Date Difference Calculator - Difference Between Two Dates',
    description:
      'Measure the difference between two dates in years, months, days, weeks, hours, and seconds with a clear date difference calculator.',
    heading: 'Date Difference Calculator',
    type: 'website',
    includeInSitemap: true,
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/how-to-calculate-age',
    title: 'How to Calculate Age Manually - Formula, Steps and Examples',
    description:
      'Learn how to calculate age manually using full years, remaining months, and leftover days, with simple worked examples.',
    heading: 'How To Calculate Age',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/leap-year-age-calculator',
    title: 'Leap Year Age Calculator Guide - February 29 Birthdays Explained',
    description:
      'Understand how leap years affect age calculations, especially for February 29 birthdays, with examples and practical notes.',
    heading: 'Leap Year Age Calculator',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'monthly',
    priority: '0.75',
  },
  {
    path: '/child-age-calculator',
    title: 'Child Age Calculator - Calculate Baby and Toddler Age',
    description:
      'Calculate baby and toddler age in years, months, and days and learn when month-by-month age tracking is most useful.',
    heading: 'Child Age Calculator',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'monthly',
    priority: '0.75',
  },
  {
    path: '/age-calculator-for-school-admission',
    title: 'Age Calculator for School Admission - Check Cut-Off Date Eligibility',
    description:
      'Use an age calculator for school admission planning, compare a child’s birth date with a cut-off date, and understand what to verify with the school.',
    heading: 'Age Calculator For School Admission',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'monthly',
    priority: '0.75',
  },
  {
    path: '/age-calculator-for-passport-visa',
    title: 'Age Calculator for Passport and Visa Forms - Practical Guide',
    description:
      'Use an age calculator to prepare passport and visa forms, verify target-date age, and avoid common date-entry mistakes.',
    heading: 'Age Calculator For Passport And Visa',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'monthly',
    priority: '0.75',
  },
  {
    path: '/about-us',
    title: 'About Us - AgeCalculater.com',
    description:
      'Learn why AgeCalculater.com exists, what the site is designed to do, and how to contact the team behind the calculator and guides.',
    heading: 'About Us',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'yearly',
    priority: '0.5',
  },
  {
    path: '/contact-us',
    title: 'Contact Us - AgeCalculater.com',
    description:
      'Contact AgeCalculater.com for feedback, correction requests, partnerships, or support questions about the age calculator and guides.',
    heading: 'Contact Us',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'yearly',
    priority: '0.45',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy - AgeCalculater.com',
    description:
      'Read the privacy policy for AgeCalculater.com, including how browser-side calculations work, analytics use, cookies, and advertising disclosures.',
    heading: 'Privacy Policy',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'yearly',
    priority: '0.4',
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions - AgeCalculater.com',
    description:
      'Review the terms and conditions for using AgeCalculater.com, including acceptable use, content ownership, and limitation of liability.',
    heading: 'Terms And Conditions',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'yearly',
    priority: '0.4',
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer - AgeCalculater.com',
    description:
      'Read the AgeCalculater.com disclaimer covering informational use, legal and medical limitations, and verification with official sources.',
    heading: 'Disclaimer',
    type: 'article',
    includeInSitemap: true,
    changefreq: 'yearly',
    priority: '0.4',
  },
  {
    path: '/404',
    title: 'Page Not Found - AgeCalculater.com',
    description:
      'The page you requested could not be found. Explore the main age calculator and related guides instead.',
    heading: 'Page Not Found',
    type: 'website',
    noindex: true,
  },
];

module.exports = {
  defaultKeywords,
  homepageFaqs,
  pageSeo,
  siteUrl,
  socialImageUrl,
};
