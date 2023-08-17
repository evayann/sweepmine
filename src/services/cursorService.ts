import { useEffect, useState } from "react";

export type Cursor = 'pointer';

export interface CursorService {
    askRender: (cursor: Cursor) => void;
    askUnrender: (cursor: Cursor) => void;
}

const DEFAULT_CURSOR = 'inherit';
export function useCursorService(): CursorService {
    const [cursorState, setCursorState] = useState<Record<Cursor, number>>(() => ({ pointer: 0 }));

    useEffect(() => {
        const defaultCursor = { cursorType: DEFAULT_CURSOR, number: 0 };
        const maxAskedCursorType = Object.entries(cursorState).reduce((acc, [cursorType, number]) =>
            acc.number < number ? { cursorType, number } : acc
            , defaultCursor);
        document.body.style.cursor = maxAskedCursorType.cursorType;
    }, [cursorState]);

    return {
        askRender(cursor: Cursor) {
            setCursorState({ ...cursorState, [cursor]: cursorState[cursor] + 1 });
        },
        askUnrender(cursor: Cursor) {
            const newValue = Math.max(0, cursorState[cursor] - 1);
            setCursorState({ ...cursorState, [cursor]: newValue });
        }
    }
}