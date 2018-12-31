export const withEnigma = async (app: EngineAPI.IApp): Promise<any> => {
    const fieldListObject: EngineAPI.IFieldListObject = await app.createSessionObject(
        {
            qFieldListDef: {
                qShowHidden: false,
                qShowSemantic: false,
                qShowSrcTables: false,
                qShowSystem: false,
            },
            qInfo: { qId: '', qType: 'FieldList' },
        },
    );

    const variableListObj = await app.createSessionObject({
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
            qType: 'variable',
        },
    });

    const variableLayout = (await variableListObj.getLayout()) as any;
    const fieldLayout = (await fieldListObject.getLayout()) as any;

    app.destroySessionObject(variableListObj.id);
    app.destroySessionObject(fieldListObject.id);

    return;
};
