import { Signal, useComputed$, useSignal, $, useOnWindow } from "@builder.io/qwik";

export const useScrollPositionPercent = (): Readonly<Signal<number>> => {
    const scroll = useSignal(0);
    useOnWindow('scroll', $(() => scroll.value = window.scrollY / (document.body.scrollHeight - window.innerHeight)));
    return useComputed$(() => scroll.value);
};