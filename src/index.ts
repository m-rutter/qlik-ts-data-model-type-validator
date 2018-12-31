import { withEnigma } from './withEnigma';
import { withCapabilities } from './withCapabilities';

interface StringEnum {
    [key: string]: string;
}

export async function validateDataModel(
    appType: 'enigma' | 'capabilities',
    app: EngineAPI.IApp | AppAPI.IApp,
    fields: StringEnum = {},
    variables: StringEnum = {},
) {
    if (appType == 'enigma') {
        withEnigma(app as EngineAPI.IApp);
    } else if (appType == 'capabilities') {
        withCapabilities(app as AppAPI.IApp);
    }

    // const frontEndFields: Set<string> = new Set(Object.values(fields));
    // const qlikFields: Set<string> = new Set(
    //     fieldLayout.qFieldList.qItems.map((f: { qName: string }) => f.qName),
    // );

    // const fieldsInQlikButNotinFrontEnd = Array.from(
    //     difference(qlikFields, frontEndFields),
    // );
    // const fieldsInFrontEndButNotInQlik = Array.from(
    //     difference(frontEndFields, qlikFields),
    // );

    // if (
    //     fieldsInQlikButNotinFrontEnd.length > 0 ||
    //     fieldsInFrontEndButNotInQlik.length > 0
    // ) {
    //     console.groupCollapsed('FRONTEND:Qlik DATA MODEL FIELDS MISMATCH');
    //     console.log({
    //         fieldsInFrontEndButNotInQlik,
    //     });
    //     console.log({ fieldsInQlikButNotinFrontEnd });

    //     console.log(
    //         'If you are certain Qlik is correct, replace Fields enum with this:',
    //         generateStringEnum(qlikFields, 'Fields'),
    //     );
    //     console.groupEnd();
    // }

    // const frontEndVariables: Set<string> = new Set(Object.values(variables));
    // const qlikVariables: Set<string> = new Set(
    //     variableLayout.qVariableList.qItems.map(
    //         (f: { qName: string }) => f.qName,
    //     ),
    // );

    // const variablesInQlikButNotinFrontEnd = Array.from(
    //     difference(qlikVariables, frontEndVariables),
    // );
    // const variablesInFrontEndButNotInQlik = Array.from(
    //     difference(frontEndVariables, qlikVariables),
    // );

    // if (
    //     variablesInQlikButNotinFrontEnd.length > 0 ||
    //     variablesInFrontEndButNotInQlik.length > 0
    // ) {
    //     console.groupCollapsed('FRONTEND:Qlik DATA MODEL VARIABLES MISMATCH');
    //     console.log({
    //         variablesInFrontEndButNotInQlik,
    //     });
    //     console.log({ variablesInQlikButNotinFrontEnd });

    //     console.log(
    //         'If you are certain Qlik is correct, replace Variables enum with this:',
    //         generateStringEnum(qlikVariables, 'Variables'),
    //     );
    //     console.groupEnd();
    // }
}

function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    const differenceSet = new Set(setA);

    for (const elem of setB) {
        differenceSet.delete(elem);
    }

    return differenceSet;
}
