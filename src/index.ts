import { withEnigma } from './withEnigma';
import { withCapabilities } from './withCapabilities';
import { generateStringEnum } from './generateStringEnum';

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
type StringEnum<K extends string> =
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
export async function checkDataModelIdentifiers<K extends string>(
    appType: 'enigma' | 'capabilities',
    app: any,
    fields: StringEnum<K> = {},
    variables: StringEnum<K> = {},
): Promise<IdentifierCheckResult> {
    let qlikFieldIdentifiers: string[];
    let qlikVariableIdentifiers: string[];

    if (appType == 'enigma') {
        [qlikFieldIdentifiers, qlikVariableIdentifiers] = await withEnigma(
            app as EngineAPI.IApp,
        );
    } else if (appType == 'capabilities') {
        [
            qlikFieldIdentifiers,
            qlikVariableIdentifiers,
        ] = await withCapabilities(app as AppAPI.IApp);
    } else {
        throw new Error(
            `App type must be either "enigma" or "capabilities". "${appType}" is not a valid option`,
        );
    }

    const enumFieldIdentifiers = Object.values(fields);
    const enumVariableIdentifiers = Object.values(variables);

    return {
        fields: createReport(
            'Field',
            qlikFieldIdentifiers,
            enumFieldIdentifiers,
        ),
        variables: createReport(
            'Variable',
            qlikVariableIdentifiers,
            enumVariableIdentifiers,
        ),
    };
}

function createReport(
    kind: 'Field' | 'Variable',
    qlikIdentifiers: string[],
    enumIdentifiers: string[],
): IdentifierKindInfo {
    const qlikSet = new Set(qlikIdentifiers);
    const enumSet = new Set(enumIdentifiers);

    const inQlikNotInEnum = [...difference(qlikSet, enumSet)];
    const inEnumNotInQlik = [...difference(enumSet, qlikSet)];

    return {
        matching: inQlikNotInEnum.length === 0 && inEnumNotInQlik.length === 0,
        newEnumString: generateStringEnum(qlikIdentifiers, kind),
        identifiersInQlik: qlikIdentifiers,
        identifiersInEnum: enumIdentifiers,
        inQlikNotInEnum: inQlikNotInEnum,
        inEnumNotInQlik: inEnumNotInQlik,
    };
}

/**
 * Finds the difference between two sets. Why isn't this part of the `Set` API?
 */
function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    const differenceSet = new Set(setA);

    for (const elem of setB) {
        differenceSet.delete(elem);
    }

    return differenceSet;
}
