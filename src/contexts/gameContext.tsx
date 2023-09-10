import { createContext } from 'react';
import { GameStateService, useGameState } from '../hooks/game/useGameState';
import { TimeService, useTimer } from '../hooks/game/useTimer';
import { CameraService, useCameraService } from '../hooks/game/useCamere';
import { GameInformationService, useGameInformation } from '../hooks/game/useGameInformation';

export const GameContext = createContext<{
    gameStateService: GameStateService;
    gameInformationService: GameInformationService;
    gameTimeService: TimeService;
    cameraService: CameraService;
}>(null as any);
export function GameProvider({ children }: any) {
    const gameStateService = useGameState();
    const gameInformationService = useGameInformation(gameStateService);
    const gameTimeService = useTimer();
    const cameraService = useCameraService();

    return (
        <GameContext.Provider value={{ gameStateService, gameInformationService, gameTimeService, cameraService }}>
            {children}
        </GameContext.Provider>
    );
}
