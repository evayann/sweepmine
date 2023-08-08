/** @jsxImportSource react */

import { useState } from "react";

export type GameState = { state: 'menu' } | { state: 'in-game' } | { state: 'finish', isWin: boolean };
export interface GameStateService {
    gameState: GameState,
    isInMenu: () => boolean;
    isInGame: () => boolean;
    isGameOver: () => boolean;
    toMenu: () => void;
    toGame: () => void;
    toGameOver: (isWin: boolean) => void;
}

export function useGameStateService(): GameStateService {
    const [gameState, setGameState] = useState<GameState>({ state: 'menu' });

    return {
        gameState,
        isInMenu: () => gameState.state === 'menu',
        isInGame: () => gameState.state === 'in-game',
        isGameOver: () => gameState.state === 'finish',
        toMenu: () => setGameState({ state: 'menu' }),
        toGame: () => setGameState({ state: 'in-game' }),
        toGameOver: (isWin: boolean) => setGameState({ state: 'finish', isWin }),
    }
}
