export function isObject(o: unknown): o is object {
    return typeof o === 'object' &&
        !Array.isArray(o) &&
        o !== null;
}