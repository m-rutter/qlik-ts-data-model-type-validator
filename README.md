# qlik-ts-ident-checker

Helps enable app specific compile and run time type checking when using Qlik
fields and variables in your Engine-API or Mashup typescript projects

## Install

```sh
# npm
npm install qlik-ts-ident-checker
# or yarn
yarn add qlik-ts-ident-checker
```

## Explanation

A very small library (< 1KB gzipped + minified) with no dependencies that helps
enable app specific compile and run time type checking for your typescript Qlik
Engine-API/Core or Qlik Sense mashup projects. Can be used in plain javascript
projects if you get a bit creative.

This library takes a reference to an Engine-API or Capabilities API app instance
and:

-   Suggests a field and a variable `string enum` definition to use in your
    project which repersents all field and variable identifiers defined an app's
    load script
-   Can validate those enums at runtime to alert you to changes
    -   e.g. that a field or variable has been created or dropped by a change in
        the load script whether by design or by accident
    -   "oh, I didn't realise that you were using that customer field. I
        accidentally commented out that entire section of the load script. Sorry
        for causing hours of fruitless debugging."
-   If these enums are used in inline Qlik expressions within your project, then
    updating the enums will create compile time errors in `tsc`, thus
    highlighting necessary changes that need to be made to reflect the the new
    load script

## Suggested Usage

### Setup

```ts
/* loadScriptIdentifiers.ts */
import { checkDataModelIdentifiers } from 'qlik-ts-ident-checker';

// Field enum suggested from a previous run
export enum Field {
    UNIT_VALUE = 'UNIT_VALUE',
    // ...
}

// Variable enum suggested from a previous run
export enum Variable {
    vCurrentMonth = 'vCurrentMonth',
    // ...
}

// Export function to validate the enums at runtime
export async function validate(app: any) {
    const result = await checkDataModelIdentifiers(
        'enigma',
        app,
        Field,
        Variable,
    );

    if (!result.fields.matching) {
        console.warn('Mismatch between qlik and project fields', result.fields);
    }

    if (!result.variables.matching) {
        console.warn(
            'Mismatch between qlik and project variables',
            result.variables,
        );
    }
}
```

### Validation

```ts
/* somewhere.ts */
import { validate } from './loadScriptIdentifiers.ts';

// ...

const app = await qix.openDoc('super-important-client-project');

// I suggest you only validate in development builds
if (development) {
    validate(app);
}
```

### Inline expression usage

```ts
/* somewhereElse.ts */
import { Variable } from './loadScriptIdentifiers.ts';

// ...

const currentMonth = await app.evaluate(`$(${Variable.vCurrentMonth})`);
```

## Type defintions (for quick reference)

```ts
/**
 * Result of validation checks
 */
interface IdentifierCheckResult {
    fields: IdentifierKindInfo;
    variables: IdentifierKindInfo;
}

interface IdentifierKindInfo {
    /** If true, then optionally provided enum matches current data model */
    matching: boolean;
    /** Suggested new enum definition that matches current data model */
    newEnumString: string;
    /** List of identifers in current data model */
    identifiersInQlik: string[];
    /** List of identifers in optionally provided enum */
    identifiersInEnum: string[];
    /** List of identifiers in current data model, but not within optionally provided enum */
    inQlikNotInEnum: string[];
    /** List of identifiers in optionally provided enum, but not within the current data model */
    inEnumNotInQlik: string[];
}

/**
 * Type repersenting a typescript string enum
 */
declare type StringEnum<K extends string> =
    | Record<K, string>
    | {
          [key: string]: string;
      };

/**
 *
 * @param appType indicate whether using the Engine API via enigma or the Capabilities API
 * @param app an app instance that corresponds to the appType
 * @param fields optionally provide an enum repersenting the fields available in the data model to validate
 * @param variables optionally provide an enum repersenting the variables available in the data model to validate
 */
export declare function checkDataModelIdentifiers<K extends string>(
    appType: 'enigma' | 'capabilities',
    app: any,
    fields?: StringEnum<K>,
    variables?: StringEnum<K>,
): Promise<IdentifierCheckResult>;
```
