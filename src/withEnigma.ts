type QlikFieldIdents = string[];
type QlikVariableIdents = string[];

export async function withEnigma(
    app: EngineAPI.IApp,
): Promise<[QlikFieldIdents, QlikVariableIdents]> {
    const [fieldListObject, variableListObj]: [
        EngineAPI.IFieldListObject,
        EngineAPI.IVariableListObject
    ] = await Promise.all([
        app.createSessionObject({
            qFieldListDef: {},
            qInfo: { qId: '', qType: 'FieldList' },
        }),
        app.createSessionObject({
            qInfo: {
                qId: 'VariableList',
                qType: 'VariableList',
            },
            qVariableListDef: {
                qData: {},
                qShowConfig: true,
                qShowReserved: true,
                qType: 'variable',
            },
        }),
    ]);

    // TODO: Make PR to fix typescript definitions
    const [fieldLayout, variableLayout]: [any, any] = await Promise.all([
        fieldListObject.getLayout(),
        variableListObj.getLayout(),
    ]);

    app.destroySessionObject(variableListObj.id);
    app.destroySessionObject(fieldListObject.id);

    const fieldIdentifiers: string[] = fieldLayout.qFieldList.qItems.map(
        (f: { qName: string }) => f.qName,
    );
    const variableIdentifiers: string[] = variableLayout.qVariableList.qItems
        .filter(
            (v: EngineAPI.INxVariableListItem) =>
                v.qIsScriptCreated || v.qIsConfig || v.qIsReserved,
        )
        .map((v: EngineAPI.INxVariableListItem) => v.qName);

    return [fieldIdentifiers, variableIdentifiers];
}
