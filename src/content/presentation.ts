import type { SectionContent } from './types.ts';

const readableDate = (iso: string) => new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${iso}T00:00:00Z`));

// Display independently specified examples; never calculate the expected answer here.
export const getSectionTable = (section: SectionContent): SectionContent['table'] => section.examples ? {
    caption: 'Worked examples using this site\'s calendar method',
    headers: ['Birth / start date', 'Target / end date', 'Calendar result', 'Total days'],
    rows: section.examples.map(example => [
        readableDate(example.start), readableDate(example.end),
        example.expected.map((value, index) => `${value} ${['year', 'month', 'day'][index]}${value === 1 ? '' : 's'}`).join(', '),
        example.totalDays.toLocaleString('en-US'),
    ]),
} : section.table;
