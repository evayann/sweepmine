export function clamp(x: number, min: number, max: number) {
    return Math.max(Math.min(x, max), min);
}

export function map(x: number, oldMin: number, oldMax: number, newMin: number, newMax: number, clampValue = false) {
    const value = (x - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin;
    if (!clampValue) return value;
    const parameters: [number, number, number] = (newMin < newMax) ? [value, newMin, newMax] : [value, newMax, newMin];
    return clamp(...parameters);
}