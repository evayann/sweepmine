/** @jsxImportSource react */

import { createContext } from 'react';
import { CursorService } from '../services/cursorService';
import { GameStateService, useGameStateService } from '../services/gameStateService';

export const GameContext = createContext<{ cursorService: CursorService; gameStateService: GameStateService }>(
    null as any
);
export function GameProvider({ children }: any) {
    const gameStateService = useGameStateService();
    const cursorService = new CursorService();

    return <GameContext.Provider value={{ cursorService, gameStateService }}>{children}</GameContext.Provider>;
}
