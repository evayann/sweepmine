import { useSignal, $, useVisibleTask$, useComputed$, Signal } from "@builder.io/qwik";

type GameSize = { width: number, height: number }
export const useGameSize = (): { size: Readonly<Signal<GameSize>>, setSize: (size: GameSize) => void } => {
    const storageGameSizeName = "gameSizeDimension";
    const size = useSignal({ width: 10, height: 10 });

    const setSize = $((newSize: GameSize) => {
        localStorage.setItem(storageGameSizeName, JSON.stringify(newSize));
        size.value = { ...newSize };
    });

    useVisibleTask$(() => {
        const localSizeString = localStorage.getItem(storageGameSizeName);
        if (!localSizeString) return;
        const localSize: { width: number, height: number } = JSON.parse(localSizeString);
        setSize(localSize);
    });

    return {
        size: useComputed$(() => size.value),
        setSize
    };
};