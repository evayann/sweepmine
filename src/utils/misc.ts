export function isObject(o: unknown): o is object {
    return typeof o === 'object' &&
        !Array.isArray(o) &&
        o !== null;
}

export function camelCaseToKebabCase(camelCase: string): string {
    return camelCase.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
}