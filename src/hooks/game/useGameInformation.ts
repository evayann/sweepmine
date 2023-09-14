import { useCallback, useMemo, useState } from "react";
import { GameStateService } from "./useGameState";

export type ClickAction = 'reveal' | 'flag' | 'camera';

export interface GameInformation {
    clickAction: ClickAction;
    dimension: { x: number, y: number };
    numberOfBombs: number;
}

export interface GameInformationService {
    clickActionIsFlag: boolean;
    clickActionIsReveal: boolean;
    clickActionIsCameraMove: boolean;
    dimension: { x: number, y: number };

    editGameInformation: (props: Partial<GameInformation>) => void;
    clickAction: (clickAction: ClickAction) => void;
}

export function useGameInformation(gameStateService: GameStateService): GameInformationService {
    const [gameInformation, setGameInformation] = useState<GameInformation>(() => ({ clickAction: 'reveal', dimension: { x: 16, y: 16 }, numberOfBombs: 40 }));

    const editGameInformation = (props: Partial<GameInformation>) => {
        if (!gameStateService.isInGame) throw new Error(`Can't assign new props ${JSON.stringify(props)} if isn't in-game !`);
        setGameInformation({ ...gameInformation, ...props });
    }

    const clickAction = useCallback((clickAction: ClickAction) => editGameInformation({ clickAction }), []);

    return useMemo(() => ({
        get clickActionIsFlag() {
            return gameInformation.clickAction === 'flag';
        },
        get clickActionIsReveal() {
            return gameInformation.clickAction === 'reveal';
        },
        get clickActionIsCameraMove() {
            return gameInformation.clickAction === 'camera';
        },
        dimension: gameInformation.dimension,

        editGameInformation,
        clickAction,

    }), [gameInformation]);
}
