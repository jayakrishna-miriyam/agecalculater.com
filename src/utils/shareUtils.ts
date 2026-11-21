import { siteUrl } from '../content/site.ts';
import { calculateAge, calculateAgeSummary, formatDateForInput } from './dateUtils.ts';

export const buildAgeShareContent = (dob: Date, targetDate: Date, pathname: string) => {
    const age = calculateAge(dob, targetDate);
    const totalDays = calculateAgeSummary(dob, targetDate).days;
    const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const ageText = (['years', 'months', 'days'] as const)
        .map(unit => `${age[unit]} ${age[unit] === 1 ? unit.slice(0, -1) : unit}`)
        .join(', ');

    // Share the public site even from a local preview. Dates stay in the fragment.
    const resultUrl = new URL(siteUrl);
    resultUrl.pathname = pathname;
    resultUrl.hash = new URLSearchParams({ dob: formatDateForInput(dob), target: formatDateForInput(targetDate) }).toString();
    const shareUrl = resultUrl.toString();
    const calculatorUrl = new URL('/', siteUrl).toString();
    const details = [
        `\u2022 Date of birth: ${dateFormatter.format(dob)}`,
        `\u2022 Age on: ${dateFormatter.format(targetDate)}`,
        `\u2022 Total calendar days: ${totalDays.toLocaleString('en-US')}`,
    ].join('\n');

    const formatMessage = (whatsapp: boolean) => {
        const heading = (text: string) => whatsapp ? `*${text}*` : text;
        return [
            heading('Age Calculation Result'),
            heading(ageText),
            heading('Calculation details'),
            details,
            heading('View this result'),
            shareUrl,
            heading('Find your own age'),
            `Try the free calculator:\n${calculatorUrl}`,
        ].join('\n\n');
    };

    return {
        shareUrl,
        plainMessage: formatMessage(false),
        whatsappMessage: formatMessage(true),
        // Native share receives the result URL separately, so do not duplicate it in text.
        nativeText: ['Age Calculation Result', ageText, 'Calculation details', details, 'Find your own age', calculatorUrl].join('\n\n'),
    };
};
