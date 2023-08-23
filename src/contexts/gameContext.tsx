/** @jsxImportSource react */

import { createContext } from 'react';
import { GameStateService, useGameState } from '../hooks/game/useGameState';
import { TimeService, useTimer } from '../hooks/game/useTimer';

export const GameContext = createContext<{
    gameStateService: GameStateService;
    gameTimeService: TimeService;
}>(null as any);
export function GameProvider({ children }: any) {
    const gameStateService = useGameState();
    const gameTimeService = useTimer();

    return <GameContext.Provider value={{ gameStateService, gameTimeService }}>{children}</GameContext.Provider>;
}
