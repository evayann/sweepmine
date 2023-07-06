import { useState } from "react";
import { Case, MineSweeper } from "~/models/mine-sweeper";

export const useMinesweeper = (dimension: { x: number, y: number }, numberOfBombInField: number) => {
    const minesweeper = new MineSweeper(dimension, numberOfBombInField);
    console.log(minesweeper)
    const revealCase = (x: number, y: number): void => {
        minesweeper.revealCase(x, y);
        setCaseList(minesweeper.caseList);
    };
    const [caseList, setCaseList] = useState(minesweeper.caseList);

    return {
        revealCase,
        caseList
    }
    // const [cases, setCases] = useState({});

    // const caseList = (): Case[] => {
    //     return Object.values(cases);
    // }
};