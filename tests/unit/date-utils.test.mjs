import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAge, calculateAgeSummary, calculateNextBirthdayCountdown, parseInputDate, parseDateFromString, formatDateForInput } from '../../src/utils/dateUtils.ts';
const date = value => {
    const result = parseInputDate(value);
    assert.ok(result, value);
    return result;
};

test('published worked examples and birthday boundaries', () => {
    const examples = [
        ['1990-03-15', '2026-09-25', [36, 6, 10]],
        ['1995-01-15', '2026-06-07', [31, 4, 23]],
        ['2000-10-01', '2030-09-30', [29, 11, 29]],
        ['2000-10-01', '2030-10-01', [30, 0, 0]],
        ['2024-01-31', '2024-03-01', [0, 1, 1]],
        ['2023-01-31', '2023-03-01', [0, 1, 1]],
        ['2024-02-29', '2025-02-27', [0, 11, 29]],
        ['2024-02-29', '2025-02-28', [1, 0, 0]],
        ['2024-02-29', '2025-03-01', [1, 0, 1]],
        ['2024-02-29', '2028-02-29', [4, 0, 0]],
        ['2025-04-10', '2026-06-25', [1, 2, 15]],
        ['2021-09-02', '2026-09-01', [4, 11, 30]],
        ['2008-12-10', '2026-12-09', [17, 11, 29]],
        ['2026-09-25', '2026-09-25', [0, 0, 0]],
    ];
    for (const [start, end, expected] of examples) {
        assert.deepEqual(Object.values(calculateAge(date(start), date(end))), expected, start + ' to ' + end);
    }
});

test('date-only totals remain stable across daylight-saving timezones', () => {
    const previous = process.env.TZ;
    try {
        for (const zone of ['UTC', 'America/New_York', 'Europe/London', 'Asia/Kolkata', 'Pacific/Auckland']) {
            process.env.TZ = zone;
            assert.equal(calculateAgeSummary(date('2026-03-07'), date('2026-03-09')).days, 2, zone);
            assert.equal(calculateAgeSummary(date('2026-10-31'), date('2026-11-02')).hours, 48, zone);
            assert.deepEqual(calculateAgeSummary(date('2024-01-31'), date('2024-03-01')), { months: 1, weeks: 4, days: 30, hours: 720, minutes: 43200, seconds: 2592000 });
            assert.equal(formatDateForInput(date('2024-02-29')), '2024-02-29', zone);
        }
    } finally { if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous; }
});

test('rejects rolled-over dates, invalid strings and reversed intervals', () => {
    for (const value of ['2025-02-29', '2024-02-30', '1900-02-29', '2100-02-29', '2024-13-01', 'bad', '2024-2-01', '3001-01-01']) assert.equal(parseInputDate(value), null);
    assert.ok(parseInputDate('2000-02-29'));
    assert.equal(parseDateFromString('1x-02-2024'), null);
    assert.throws(() => calculateAge(date('2026-01-02'), date('2026-01-01')), RangeError);
    assert.throws(() => calculateAge(new Date('invalid'), new Date()), RangeError);
});

test('countdown uses local midnight, celebrates all day and rebuilds leap anniversaries', () => {
    const dob = date('2000-02-29');
    assert.equal(calculateNextBirthdayCountdown(dob, new Date(2025, 1, 28, 23, 59)).isBirthdayToday, true);
    assert.equal(calculateNextBirthdayCountdown(dob, new Date(2028, 1, 28, 12)).isBirthdayToday, false);
    assert.equal(calculateNextBirthdayCountdown(dob, new Date(2028, 1, 29, 23, 59)).isBirthdayToday, true);
    const beforeLeapYear = calculateNextBirthdayCountdown(dob, new Date(2027, 2, 1));
    assert.equal(beforeLeapYear.days, 365);
    assert.deepEqual(calculateNextBirthdayCountdown(date('2000-09-27'), new Date(2026, 8, 25, 12)), { days: 1, hours: 12, minutes: 0, seconds: 0, isBirthdayToday: false });
});

test('calendar decomposition never produces negative components across month ends', () => {
    for (const start of ['2023-01-31', '2024-02-29', '2024-08-31', '2096-02-29']) {
        const dob = date(start);
        for (let offset = 0; offset < 1600; offset++) {
            const end = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate() + offset);
            const result = calculateAge(dob, end);
            assert.ok(result.years >= 0 && result.months >= 0 && result.months <= 11 && result.days >= 0 && result.days <= 31, start + ':' + offset);
            assert.equal(calculateAgeSummary(dob, end).days, offset);
        }
    }
});
