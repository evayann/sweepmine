import { useRef, useState } from "react";
import { useRerender } from "../useRerender";

type MenuState = { state: 'menu' };
type InGameState = { state: 'in-game', isPaused: boolean };
type EndGameState = { state: 'finish', isWin: boolean };
export type GameState = MenuState | InGameState | EndGameState;

export function useGameState() {
    const gameStateRef = useRef(new GameStateService());
    return gameStateRef.current;
}

export class GameStateService {
    private gameState: GameState = { state: 'menu' };
    private rerender = useRerender();

    get isInMenu(): boolean {
        return this.gameState.state === 'menu';
    }

    get isInGame(): boolean {
        return this.gameState.state === 'in-game';
    }

    get isGameOver(): boolean {
        return this.gameState.state === 'finish';
    }

    get isWin() {
        return this.isGameOver && this.endGameState.isWin;
    }

    get isPaused() {
        return this.isInGame && this.inGameState.isPaused;
    }

    private get inGameState(): InGameState {
        return this.gameState as InGameState;
    }

    private get endGameState(): EndGameState {
        return this.gameState as EndGameState;
    }

    pause(): void {
        this.updateInGameState({ isPaused: true });
    }

    play(): void {
        this.updateInGameState({ isPaused: false });
    }

    toMenu(): void {
        this.gameState = { state: 'menu' };
        this.rerender();
    }

    toGame(): void {
        this.gameState = { state: 'in-game', isPaused: true };
        this.rerender();
    }

    toGameOver(isWin: boolean): void {
        this.gameState = { state: 'finish', isWin };
        this.rerender();
    }

    private updateInGameState(props: Partial<InGameState>): void {
        if (!this.isInGame) throw new Error(`Can't assign new props ${props} if isn't in-game !`);
        const newInGameState: InGameState = { ...this.gameState as InGameState, ...props };
        this.gameState = newInGameState;
    }
}
