type QlikFieldIdents = string[];
type QlikVariableIdents = string[];

/**
 * @unimplemented
 * @param app capabilities api app instance
 */
export async function withCapabilities(
    app: AppAPI.IApp,
): Promise<[QlikFieldIdents, QlikVariableIdents]> {
    throw new Error('Capabilities option not yet implemented');
}
