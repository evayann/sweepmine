/** @jsxImportSource react */

import { useCallback, useState } from "react";

export type GameState = { state: 'menu' } | { state: 'in-game' } | { state: 'finish', isWin: boolean };
export interface GameStateService {
    isInMenu: () => boolean;
    isInGame: () => boolean;
    isGameOver: () => boolean;
    isWin: () => boolean;

    toMenu: () => void;
    toGame: () => void;
    toGameOver: (isWin: boolean) => void;
}

export function useGameStateService(): GameStateService {
    const [gameState, setGameState] = useState<GameState>(() => ({ state: 'menu' }));

    const toMenu = useCallback(() => setGameState({ state: 'menu' }), []);
    const toGame = useCallback(() => setGameState({ state: 'in-game' }), []);
    const toGameOver = useCallback((isWin: boolean) => setGameState({ state: 'finish', isWin }), []);

    const isInMenu = useCallback(() => gameState.state === 'menu', [gameState]);
    const isInGame = useCallback(() => gameState.state === 'in-game', [gameState]);
    const isGameOver = useCallback(() => gameState.state === 'finish', [gameState]);
    const isWin = useCallback(() => gameState.state === 'finish' && gameState.isWin, [gameState]);

    return {
        isInMenu,
        isInGame,
        isGameOver,
        isWin,

        toMenu,
        toGame,
        toGameOver,
    }
}
