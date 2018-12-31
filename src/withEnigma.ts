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
                qData: {
                    tags: '/tags',
                },
                qShowConfig: true,
                qShowReserved: true,
                qType: 'VariableList',
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
    const variableIdentifiers: string[] = variableLayout.qVariableList.qItems.map(
        (v: { qName: string }) => v.qName as string,
    );

    return [fieldIdentifiers, variableIdentifiers];
}
