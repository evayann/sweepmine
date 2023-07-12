import { useRef, useState } from "react";
import { MineSweeper } from "~/models/mine-sweeper";

export const useMinesweeper = (dimension: { x: number, y: number }, numberOfBombInField: number) => {
    const minesweeperRef = useRef(new MineSweeper(dimension, numberOfBombInField))
    const minesweeper = minesweeperRef.current;

    const [caseList, setCaseList] = useState(minesweeper.caseList);
    const [gameState, setGameState] = useState(minesweeper.gameState);

    const revealCase = (x: number, y: number): void => {
        minesweeper.revealCase(x, y);
        setCaseList(minesweeper.caseList);
        setGameState(minesweeper.gameState);
    };

    return {
        revealCase,
        caseList,
        gameState
    }
};