import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAgeDetails, formatDateForInput, parseInputDate } from '../../src/utils/dateUtils.ts';

test('personalized steps and birthday timeline preserve calendar anchors', () => {
    const fixtures = [
        ['1996-09-23', '2026-11-20', '2026-09-23', '2026-10-23', '2027-09-23', 58, 307],
        ['2024-01-31', '2024-03-01', '2024-01-31', '2024-02-29', '2025-01-31', 30, 336],
        ['2024-02-29', '2025-02-28', '2025-02-28', '2025-02-28', '2026-02-28', 0, 365],
        ['2024-02-29', '2027-03-01', '2027-02-28', '2027-02-28', '2028-02-29', 1, 365],
        ['2024-02-29', '2028-02-28', '2027-02-28', '2028-01-28', '2028-02-29', 365, 1],
        ['2024-04-10', '2024-04-10', '2024-04-10', '2024-04-10', '2025-04-10', 0, 365],
        ['2030-12-31', '2031-01-01', '2030-12-31', '2030-12-31', '2031-12-31', 1, 364],
    ];
    const previous = process.env.TZ;
    try {
        for (const zone of ['UTC', 'America/Los_Angeles', 'Asia/Kolkata']) {
            process.env.TZ = zone;
            for (const [dob, target, year, month, next, since, until] of fixtures) {
                const result = calculateAgeDetails(parseInputDate(dob), parseInputDate(target));
                const context = `${dob} to ${target} in ${zone}`;
                assert.deepEqual([result.yearAnchor, result.monthAnchor, result.nextBirthday].map(formatDateForInput), [year, month, next], context);
                assert.equal(result.daysSinceBirthday, since, context);
                assert.equal(result.daysUntilBirthday, until, context);
                assert.equal((Date.parse(target) - Date.parse(month)) / 86400000, result.age.days, context);
            }
        }
    } finally { if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous; }
});
