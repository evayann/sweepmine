import { createContext } from 'react';
import { GameStateService, useGameState } from '../hooks/game/useGameState';
import { TimeService, useTimer } from '../hooks/game/useTimer';
import { CameraService, useCameraService } from '../hooks/game/useCamera';
import { GameInformationService, useGameInformation } from '../hooks/game/useGameInformation';
import { BoardService, useBoard } from '../hooks/game/useBoard';

export const GameContext = createContext<{
    gameStateService: GameStateService;
    gameInformationService: GameInformationService;
    boardService: BoardService;
    gameTimeService: TimeService;
    cameraService: CameraService;
}>(null as any);
export function GameProvider({ children }: any) {
    const gameStateService = useGameState();
    const gameInformationService = useGameInformation(gameStateService);
    const gameTimeService = useTimer();
    const boardService = useBoard();
    const cameraService = useCameraService();

    return (
        <GameContext.Provider
            value={{
                gameStateService,
                gameInformationService,
                boardService,
                gameTimeService,
                cameraService,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
