/** @jsxImportSource react */

import { createContext } from 'react';
import { CursorService, useCursorService } from '../services/cursorService';
import { GameStateService, useGameStateService } from '../services/game/stateService';
import { GameTimeService, useGameTimeService } from '../services/game/timeService';

export const GameContext = createContext<{
    cursorService: CursorService;
    gameStateService: GameStateService;
    gameTimeService: GameTimeService;
}>(null as any);
export function GameProvider({ children }: any) {
    const gameStateService = useGameStateService();
    const gameTimeService = useGameTimeService();
    const cursorService = useCursorService();

    return (
        <GameContext.Provider value={{ cursorService, gameStateService, gameTimeService }}>
            {children}
        </GameContext.Provider>
    );
}
