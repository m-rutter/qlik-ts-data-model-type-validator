type QlikFieldIdents = string[];
type QlikVariableIdents = string[];

/**
 * @unimplemented
 * @param app capabilities api app instance
 */
export async function withCapabilities(
    app: AppAPI.IApp,
): Promise<[QlikFieldIdents, QlikVariableIdents]> {
    const [fieldListObject, variableListObj]: [
        EngineAPI.IFieldListObject,
        EngineAPI.IVariableListObject
    ] = await Promise.all([
        app.createGenericObject({
            qFieldListDef: {},
        }),
        app.createGenericObject({
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
