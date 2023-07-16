import { useSignal, $, useVisibleTask$, useComputed$, Signal } from "@builder.io/qwik";

export type Dimension = { x: number, y: number }
export const useDimensions = (): { dimension: Readonly<Signal<Dimension>>, setDimension: (dimension: Dimension) => void } => {
    const storageGameSizeName = "gameSizeDimension";
    const dimension = useSignal(() => ({ x: 5, y: 5 }));

    const setDimension = $((newDimension: Dimension) => {
        localStorage.setItem(storageGameSizeName, JSON.stringify(newDimension));
        dimension.value = { ...newDimension };
    });

    useVisibleTask$(() => {
        const localSizeString = localStorage.getItem(storageGameSizeName);
        if (!localSizeString) return;
        const localSize: Dimension = JSON.parse(localSizeString);
        dimension.value = localSize;
    });

    return {
        dimension: useComputed$(() => dimension.value),
        setDimension
    };
};