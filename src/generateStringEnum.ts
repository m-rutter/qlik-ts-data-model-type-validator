/**
 * Generates an the enum, as a string, that matches either the fields or
 * variables present within the current qlik load script
 * @param identifiers - set of qlik field or variable identifiers
 * @param enumName - name of the enum definition to be created
 */
export function generateStringEnum(
    identifiers: string[] | Set<string>,
    enumName: string,
): string {
    const enumEntries = [...identifiers.values()]
        .map(v => {
            // Typescript enums cannot have numeric members as are compiled to
            // an `Object` with a reverse mapping. Allowing numberic members
            // might cause collisions at runtume. Rather than choosing to
            // discard some qlik field or variable names I've opted to pad the
            // numeric identifier with underscores.
            const identifier = Number.isNaN(Number.parseInt(v, 10))
                ? v
                : `__${v}__`;

            return `${identifier} = '${v}'`;
        })
        .join(',\n    ');

    // prettier-ignore
    return String.raw
`enum ${enumName} {
    ${enumEntries}
}`;
}
