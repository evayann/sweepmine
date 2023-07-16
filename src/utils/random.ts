export function randomInteger(min?: number, max?: number): number {
    const _min = min ?? 0;
    const _max = max ?? (min !== undefined ? 0 : 1);
    return Math.round(Math.random() * Math.abs(_max - _min));
}

export function randomInList<T>(list: T[]): T {
    return list[randomInteger(list.length - 1)];
}