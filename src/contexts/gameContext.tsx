/** @jsxImportSource react */

import { createContext } from 'react';
import { CursorService, useCursor } from '../hooks/game/useCursor';
import { GameStateService, useGameState } from '../hooks/game/useGameState';
import { TimeService, useTimer } from '../hooks/game/useTimer';

export const GameContext = createContext<{
    cursorService: CursorService;
    gameStateService: GameStateService;
    gameTimeService: TimeService;
}>(null as any);
export function GameProvider({ children }: any) {
    const gameStateService = useGameState();
    const gameTimeService = useTimer();
    const cursorService = useCursor();

    return (
        <GameContext.Provider value={{ cursorService, gameStateService, gameTimeService }}>
            {children}
        </GameContext.Provider>
    );
}
