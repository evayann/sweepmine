export type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset";

export type Cursor =
    | Globals
    | "-moz-grab"
    | "-webkit-grab"
    | "alias"
    | "all-scroll"
    | "auto"
    | "cell"
    | "col-resize"
    | "context-menu"
    | "copy"
    | "crosshair"
    | "default"
    | "e-resize"
    | "ew-resize"
    | "grab"
    | "grabbing"
    | "help"
    | "move"
    | "n-resize"
    | "ne-resize"
    | "nesw-resize"
    | "no-drop"
    | "none"
    | "not-allowed"
    | "ns-resize"
    | "nw-resize"
    | "nwse-resize"
    | "pointer"
    | "progress"
    | "row-resize"
    | "s-resize"
    | "se-resize"
    | "sw-resize"
    | "text"
    | "vertical-text"
    | "w-resize"
    | "wait"
    | "zoom-in"
    | "zoom-out"
    | (string & {});

export class CursorService {
    private static DEFAULT_CURSOR = 'inherit';

    private state: Record<Cursor, number> = {};

    askOne(cursor: Cursor): void {
        if (!this.state[cursor]) this.state[cursor] = 0;
        this.state[cursor]++;
        this.updateCursorToMaxWanted();
    }

    removeOne(cursor: Cursor): void {
        const nbVoice = this.state[cursor] ?? 0;
        if (nbVoice <= 0) return;
        this.state[cursor]--;
        this.updateCursorToMaxWanted();
    }

    private updateCursorToMaxWanted(): void {
        const cursorType = Object.entries(this.state).reduce((acc, [cursorType, number]) =>
            acc.number < number ? { cursorType, number } : acc
            , { cursorType: CursorService.DEFAULT_CURSOR, number: 0 }).cursorType;
        document.body.style.cursor = cursorType;
    }
}