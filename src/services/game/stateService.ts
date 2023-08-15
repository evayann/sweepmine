/** @jsxImportSource react */

import { useCallback, useMemo, useState } from "react";

export type GameState = { state: 'menu' } | { state: 'in-game', isPaused: boolean } | { state: 'finish', isWin: boolean };
export interface GameStateService {
    isInMenu: boolean;
    isInGame: boolean;
    isGameOver: boolean;
    isWin: boolean;
    isPaused: boolean;

    pause: () => void;
    play: () => void;

    toMenu: () => void;
    toGame: () => void;
    toGameOver: (isWin: boolean) => void;
}

export function useGameStateService(): GameStateService {
    const [gameState, setGameState] = useState<GameState>(() => ({ state: 'menu' }));

    const toMenu = useCallback(() => setGameState({ state: 'menu' }), []);
    const toGame = useCallback(() => setGameState({ state: 'in-game', isPaused: false }), []);
    const toGameOver = useCallback((isWin: boolean) => setGameState({ state: 'finish', isWin }), []);

    const toggleInGamePausedState = (type: 'pause' | 'play') => {
        if (gameState.state !== 'in-game') throw new Error(`Can't ${type} if isn't in-game !`);
        setGameState({ ...gameState, isPaused: type === 'pause' });
    }
    const pause = useCallback(() => toggleInGamePausedState('pause'), [gameState]);
    const play = useCallback(() => toggleInGamePausedState('play'), [gameState]);

    return useMemo(() => ({
        get isInMenu() {
            return gameState.state === 'menu';
        },
        get isInGame() {
            return gameState.state === 'in-game';
        },
        get isGameOver() {
            return gameState.state === 'finish';
        },
        get isWin() {
            return gameState.state === 'finish' && gameState.isWin;
        },
        get isPaused() {
            return gameState.state === 'in-game' && gameState.isPaused;
        },

        pause,
        play,

        toMenu,
        toGame,
        toGameOver,
    }), [gameState]);
}
