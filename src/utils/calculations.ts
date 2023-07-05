export function clamp(x: number, min: number, max: number) {
    return Math.max(Math.min(x, max), min);
}

export function map(x: number, oldMin: number, oldMax: number, newMin: number, newMax: number, clampValue = false) {
    const value = (x - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin;
    if (!clampValue) return value;
    const parameters: [number, number, number] = (newMin < newMax) ? [value, newMin, newMax] : [value, newMax, newMin];
    return clamp(...parameters);
}

export function randomInteger(min?: number, max?: number): number {
    const _min = min ?? 0;
    const _max = max ?? (min !== undefined ? 0 : 1);
    return Math.round(Math.random() * Math.abs(_max - _min));
}