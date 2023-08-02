export type GameState = { state: 'menu' } | { state: 'in-game' } | { state: 'finish', isWin: boolean };

export class GameStateService {
    private gameState: GameState = { state: 'menu' };

    get isInGame(): boolean {
        return this.gameState.state === 'in-game';
    }

    get isInMenu(): boolean {
        return this.gameState.state === 'menu';
    }

    get isGameOver(): boolean {
        return this.gameState.state === 'finish';
    }

    toGame(): void {
        this.gameState = { state: 'in-game' };
    }

    toMenu(): void {
        this.gameState = { state: 'menu' };
    }

    toGameOver(isWin: boolean): void {
        this.gameState = { state: 'finish', isWin };
    }
}