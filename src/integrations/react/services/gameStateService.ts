export type GameState = { state: 'menu' } | { state: 'in-progress' } | { state: 'finish', isWin: boolean };

export class GameStateService {
    private state: GameState = { state: 'menu' };

    toGame(): void {
        this.state = { state: 'in-progress' };
    }

    toMenu(): void {
        this.state = { state: 'menu' };
    }

    toGameOver(isWin: boolean): void {
        this.state = { state: 'finish', isWin };
    }
}