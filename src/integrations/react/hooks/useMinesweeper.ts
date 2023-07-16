import { useRef, useState } from "react";
import { MineSweeper } from "~/models/minesweeper";

export const useMinesweeper = (dimension: { x: number, y: number }, numberOfBombInField: number) => {
    let minesweeperRef = useRef(new MineSweeper(dimension, numberOfBombInField));
    const ms = minesweeperRef.current;

    const [caseList, setCaseList] = useState(ms.caseList);
    const [gameState, setGameState] = useState(ms.gameState);

    const revealCase = (x: number, y: number): void => {
        ms.revealCase(x, y);
        update();
    };

    const resetGame = (): void => {
        ms.reset();
        update();
    };

    const update = (): void => {
        setCaseList(ms.caseList);
        setGameState(ms.gameState);
    };

    return {
        revealCase,
        resetGame,
        caseList,
        gameState
    }
};