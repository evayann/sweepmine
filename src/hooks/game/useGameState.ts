import { useCallback, useMemo, useState } from "react";

type MenuState = { state: 'menu' };
type InGameState = { state: 'in-game', isPaused: boolean, clickAction: ClickAction };
type EndGameState = { state: 'finish', isWin: boolean };
export type ClickAction = 'reveal' | 'flag' | 'camera';

export type GameState = MenuState | InGameState | EndGameState;
export interface GameStateService {
    isInMenu: boolean;
    isInGame: boolean;
    isGameOver: boolean;
    isWin: boolean;
    isPaused: boolean;
    clickActionIsFlag: boolean;

    pause: () => void;
    play: () => void;
    clickAction: (clickAction: ClickAction) => void;

    toMenu: () => void;
    toGame: () => void;
    toGameOver: (isWin: boolean) => void;
}

export function useGameState(): GameStateService {
    const [gameState, setGameState] = useState<GameState>(() => ({ state: 'menu' }));

    const toMenu = useCallback(() => setGameState({ state: 'menu' }), []);
    const toGame = useCallback(() => setGameState({ state: 'in-game', isPaused: true, clickAction: 'reveal' }), []);
    const toGameOver = useCallback((isWin: boolean) => setGameState({ state: 'finish', isWin }), []);

    const editInGameProps = (props: Partial<InGameState>) => {
        if (gameState.state !== 'in-game') throw new Error(`Can't assign new props ${props} if isn't in-game !`);
        setGameState({ ...gameState, ...props });
    }

    const pause = useCallback(() => editInGameProps({ isPaused: true }), [gameState]);
    const play = useCallback(() => editInGameProps({ isPaused: false }), [gameState]);
    const clickAction = useCallback((clickAction: ClickAction) => editInGameProps({ clickAction }), [gameState]);

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
        get clickActionIsFlag() {
            return gameState.state === 'in-game' && gameState.clickAction === 'flag';
        },

        pause,
        play,
        clickAction,

        toMenu,
        toGame,
        toGameOver,
    }), [gameState]);
}
