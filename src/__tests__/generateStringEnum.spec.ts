import { generateStringEnum } from '../generateStringEnum';

describe('tests for enum generation', () => {
    test('simple field enum test', () => {
        const fieldSet = new Set([
            'CALENDAR_MONTH_ID',
            'DATA_FLAG',
            'NUMERATOR_VALUE',
        ]);

        const fieldEnumString = generateStringEnum(fieldSet, 'Field');

        // prettier-ignore
        const expectedResult = String.raw
`enum Field {
    'CALENDAR_MONTH_ID' = 'CALENDAR_MONTH_ID',
    'DATA_FLAG' = 'DATA_FLAG',
    'NUMERATOR_VALUE' = 'NUMERATOR_VALUE'
}`;

        expect(fieldEnumString).toEqual(expectedResult);
    });

    test('handle numeric identifiers', () => {
        const fieldSet = new Set([
            'CALENDAR_MONTH_ID',
            'DATA_FLAG',
            '2000',
            'NUMERATOR_VALUE',
        ]);

        const fieldEnumString = generateStringEnum(fieldSet, 'Field');

        // prettier-ignore
        const expectedResult = String.raw
`enum Field {
    'CALENDAR_MONTH_ID' = 'CALENDAR_MONTH_ID',
    'DATA_FLAG' = 'DATA_FLAG',
    '_2000_' = '2000',
    'NUMERATOR_VALUE' = 'NUMERATOR_VALUE'
}`;

        expect(fieldEnumString).toEqual(expectedResult);
    });
});
