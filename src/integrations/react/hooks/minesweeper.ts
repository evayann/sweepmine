import { useRef, useState } from "react";
import { Case, MineSweeper } from "~/models/mine-sweeper";

export const useMinesweeper = (dimension: { x: number, y: number }, numberOfBombInField: number) => {
    const minesweeperRef = useRef(new MineSweeper(dimension, numberOfBombInField))
    const minesweeper = minesweeperRef.current;

    const [caseList, setCaseList] = useState(minesweeper.caseList);

    const reset = () => minesweeperRef.current = new MineSweeper(dimension, numberOfBombInField);
    const revealCase = (x: number, y: number): void => {
        minesweeper.revealCase(x, y);
        setCaseList(minesweeper.caseList);
    };

    return {
        reset,
        revealCase,
        caseList
    }
};