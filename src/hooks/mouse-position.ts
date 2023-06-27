import { Signal, useSignal, useOnWindow, useComputed$, $ } from "@builder.io/qwik";

export const useScrollPositionPercent = (): Readonly<Signal<{ x: number, y: number }>> => {
    const scroll = useSignal({ x: 0, y: 0 });
    useOnWindow('mousemove', $((event: any) => scroll.value = { x: event.clientX, y: event.clientY }));
    return useComputed$(() => scroll.value);
};