
export const faqs = [
    {
        question: "How is age calculated so accurately?",
        answer: "Our calculator determines the time difference between two dates down to the day. It calculates the total number of full years, then the remaining full months, and finally the leftover days. This method provides a precise chronological age."
    },
    {
        question: "Does this calculator account for leap years?",
        answer: "Yes, absolutely. By using native Date objects and calculating the difference based on calendar months and days, leap years and the varying number of days in each month are automatically factored into the calculation for accuracy."
    },
    {
        question: "Is my date of birth saved on your server?",
        answer: "No. Your privacy is our top priority. All calculations are performed directly in your browser. We do not store any of your personal data, including your date of birth."
    },
    {
        question: "Why does the Age Summary show a different number of months than the main result?",
        answer: "The main result ('Your Age Is') breaks your age down into years, then months, then days. The Age Summary shows the *total* duration in a single unit. For example, a 2-year-old is '2 years, 0 months, and 0 days' old, but they are also '24 months' old in total."
    },
    {
        question: "Can I use this for things other than my age?",
        answer: "Absolutely! The calculator is a versatile date difference tool. You can use it to find the duration of a project, count down to a special event, or calculate the time between any two dates."
    },
    {
        question: "How does the calculator handle timezones?",
        answer: "The calculator uses the timezone set on your local computer or device. The age is calculated based on full days, so timezone differences typically do not affect the result in years, months, and days unless the calculation is done right around midnight."
    },
    {
        question: "What should I do if the result seems incorrect?",
        answer: "Please double-check that you have entered the dates correctly in the DD-MM-YYYY format. Most discrepancies are due to a simple input error, like swapping the month and day. Our calculation method is highly accurate for standard calendar dates."
    },
    {
        question: "What is chronological age?",
        answer: "Chronological age is the exact amount of time a person has been alive, measured in years, months, and days from their date of birth. It's the most common way of expressing age."
    },
    {
        question: "Can I use this to calculate future or past ages?",
        answer: "Yes. You can set the 'Age at the Date of' to any date in the future or past to see how old you were or will be on that specific day."
    }
];

export const aboutContent = "Welcome to AgeCalculater.com, your premier destination for instantly and accurately determining chronological age and time durations. Our tool is more than just a simple 'how old am I' calculator; it's a comprehensive date-to-date calculator designed for a variety of needs. Whether you're tracking milestones for a project as a milestone tracker, counting down to a special anniversary, verifying age for official purposes, or simply curious about your age down to the very second with our age finder, our platform delivers. Experience the passage of time with our unique live age counter, explore fun facts, and enjoy a seamless, user-friendly interface designed for clarity and precision.";

export const howItWorksContent = "Our age calculator achieves its high accuracy by employing a detailed, multi-step method that respects the calendar's complexity. Instead of using a simplified average (like 365.25 days per year), it first determines the number of full years that have passed. Then, from the remaining period, it calculates the full months, intelligently accounting for the different lengths of each month (e.g., 28, 30, or 31 days). Finally, it calculates the remaining days. This process inherently and correctly handles leap years, including February 29th, ensuring that the result for years, months, and days is precise and reflects the actual calendar duration, not just an approximation.";

export const funFactsContent = [
    "On Venus, a day is longer than a year. A day on Venus lasts for 243 Earth days, while its year is only 225 Earth days long.",
    "The oldest person ever whose age has been independently verified is Jeanne Calment of France, who lived to be 122 years and 164 days old.",
    "In some East Asian cultures, a person is considered one year old at birth and gets a year older on New Year's Day, not their birthday. This is known as East Asian age reckoning.",
    "To keep our clocks in sync with Earth's rotation, a 'leap second' is occasionally added to Coordinated Universal Time (UTC). This accounts for the planet's slowing rotation.",
    "A 'galactic year' is the time it takes our Solar System to orbit the center of the Milky Way galaxy once—approximately 230 million Earth years.",
    "If you could travel at the speed of light, you would age much slower than people on Earth due to time dilation, a concept from Einstein's theory of relativity.",
    "The term 'fortnight' comes from the Old English 'fēowertyne niht,' meaning 'fourteen nights'.",
    "The bowhead whale is one of the longest-living mammals on Earth, capable of living for over 200 years."
];