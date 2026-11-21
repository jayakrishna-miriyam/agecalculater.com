import test from 'node:test';
import assert from 'node:assert/strict';
import { pageDefinitions } from '../../src/content/index.ts';
import { calculateAge, calculateAgeSummary, parseInputDate } from '../../src/utils/dateUtils.ts';

test('every published calendar example matches its fixed expected result and total days', () => {
    let count = 0;
    for (const page of pageDefinitions) {
        for (const section of page.sections ?? []) {
            for (const example of section.examples ?? []) {
                const start = parseInputDate(example.start);
                const end = parseInputDate(example.end);
                const context = `${page.path}: ${example.start} to ${example.end}`;
                assert.ok(start && end, context);
                assert.deepEqual(Object.values(calculateAge(start, end)), example.expected, context);
                assert.equal(calculateAgeSummary(start, end).days, example.totalDays, context);
                count++;
            }
            if (section.table) {
                for (const row of section.table.rows) assert.equal(row.length, section.table.headers.length, page.path + ': table column count');
            }
        }
    }
    assert.ok(count >= 20, 'Published edge-case examples should not silently disappear');
});
