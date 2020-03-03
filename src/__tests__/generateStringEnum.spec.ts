import * as fc from 'fast-check';

import { generateStringEnum } from '../generateStringEnum';

describe('enum generation', () => {
    test('keys match values for non-numeric inputs', () => {
        const re = /[^a-zA-Z]/g;

        const nonNumericStr = fc.set(
            fc.string().map(str => str.replace(re, '')),
        );

        fc.assert(
            fc.property(nonNumericStr, items => {
                const enumStr = generateStringEnum(items, 'Field');
                for (const item of items) {
                    expect(enumStr).toContain(`'${item}' = '${item}'`);
                }
            }),
        );
    });

    test('numeric inputs get padded', () => {
        const numericStrs = fc.set(fc.nat().map(num => num.toString()));

        fc.assert(
            fc.property(numericStrs, items => {
                const enumStr = generateStringEnum(items, 'Field');
                console.log(enumStr);
                for (const item of items) {
                    expect(enumStr).toContain(`'_${item}_' = '${item}'`);
                }
            }),
        );
    });
});
