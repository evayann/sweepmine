import { RefObject, useEffect, useMemo, useState } from "react";

export function useCloseOutsideRef(ref: RefObject<HTMLElement>): [boolean, () => void] {
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!ref.current?.contains(event.target as Node)) {
                setIsFocus(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return [
        isFocus,
        () => setIsFocus(true)
    ];
}