/**
 * Creates an automatic translation keys adapter using Proxy
 */
export function createTranslationKeysAdapter<T extends object>(basePath: string): T {
    return new Proxy({} as T, {
        get(_, prop: string | symbol) {
            if (typeof prop === 'string') {
                return `${basePath}.${prop}`;
            }
            return undefined;
        }
    });
}
