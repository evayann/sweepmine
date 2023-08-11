export type Cursor = 'pointer';

export class CursorService {
    private static DEFAULT_CURSOR = 'inherit';

    private state: Partial<Record<Cursor, number>> = {};

    askOne(cursor: Cursor): void {
        this.state[cursor] = (this.state[cursor] ?? 0) + 1;
        this.updateCursorToMaxWanted();
    }

    removeOne(cursor: Cursor): void {
        const nbVoice = this.state[cursor] ?? 0;
        if (nbVoice <= 0) return;
        this.state[cursor] = nbVoice - 1;
        this.updateCursorToMaxWanted();
    }

    private updateCursorToMaxWanted(): void {
        const defaultCursor = { cursorType: CursorService.DEFAULT_CURSOR, number: 0 };
        const maxAskedCursorType = Object.entries(this.state).reduce((acc, [cursorType, number]) =>
            acc.number < number ? { cursorType, number } : acc
            , defaultCursor);
        document.body.style.cursor = maxAskedCursorType.cursorType;
    }
}