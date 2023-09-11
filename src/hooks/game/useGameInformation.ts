import { useCallback, useMemo, useState } from "react";
import { GameStateService } from "./useGameState";

export interface GameInformation {
    clickAction: 'reveal' | 'flag';
    dimension: { x: number, y: number };
    numberOfBombs: number;
}

export interface GameInformationService {
    clickActionIsFlag: boolean;
    dimension: { x: number, y: number };

    editGameInformation: (props: Partial<GameInformation>) => void;
    clickAction: (clickAction: 'reveal' | 'flag') => void;
}

export function useGameInformation(gameStateService: GameStateService): GameInformationService {
    const [gameInformation, setGameInformation] = useState<GameInformation>(() => ({ clickAction: 'reveal', dimension: { x: 16, y: 16 }, numberOfBombs: 40 }));

    const editGameInformation = (props: Partial<GameInformation>) => {
        if (!gameStateService.isInGame) throw new Error(`Can't assign new props ${JSON.stringify(props)} if isn't in-game !`);
        setGameInformation({ ...gameInformation, ...props });
    }

    const clickAction = useCallback((clickAction: 'reveal' | 'flag') => editGameInformation({ clickAction }), []);

    return useMemo(() => ({
        get clickActionIsFlag() {
            return gameStateService.isInGame && gameInformation.clickAction === 'flag';
        },
        dimension: gameInformation.dimension,

        editGameInformation,
        clickAction,

    }), [gameInformation]);
}
