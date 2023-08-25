import { isObject } from "./misc";

export type Range = { min: number, max?: number, step?: number };

export function range(range: Range): number[];
export function range(min: number, max?: number, step?: number): number[];
export function range(min: Range | number, max?: number, step?: number): number[] {
    const rangeObject: Range | undefined = isObject(min) ? min : undefined;
    if (rangeObject) return range(rangeObject.min, rangeObject.max, rangeObject.step)

    const _min = min as number;
    if (max === undefined) return range(0, _min, 1);
    const _step = step ?? 1;
    return [...Array(Math.round((max - _min) * 1 / _step)).keys()].map(i => i * _step + _min);
}

export type Range2D = {
    width: Range;
    height: Range;
}
export function range2D({ width, height }: Range2D): [number, number][] {
    return range(width).flatMap((x: number) => range(height).map((y: number): [number, number] => [x, y]));
}


export function zip<T extends unknown[][]>(
    ...listOfList: T
): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
    const shortestListLength = Math.min(...listOfList.map(list => list.length));
    // @ts-expect-error
    return range(shortestListLength).map((i: number) => listOfList.map(list => list[i]));
}

export function zipLongest<T extends unknown[][]>(
    ...listOfList: T
): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
    const longestListLength = Math.max(...listOfList.map(list => list.length));
    // @ts-expect-error
    return range(longestListLength).map((i: number) => listOfList.map(list => list[i]));
}