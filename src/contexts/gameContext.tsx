/** @jsxImportSource react */

import { createContext } from 'react';
import { GameStateService, useGameState } from '../hooks/game/useGameState';
import { TimeService, useTimer } from '../hooks/game/useTimer';
import { CameraService, useCameraService } from '../hooks/game/useCamere';

export const GameContext = createContext<{
    gameStateService: GameStateService;
    gameTimeService: TimeService;
    cameraService: CameraService;
}>(null as any);
export function GameProvider({ children }: any) {
    const gameStateService = useGameState();
    const gameTimeService = useTimer();
    const cameraService = useCameraService();

    return (
        <GameContext.Provider value={{ gameStateService, gameTimeService, cameraService }}>
            {children}
        </GameContext.Provider>
    );
}
