import { useEffect, useRef, useState } from "react";
import { MineSweeper } from "../models/minesweeper";
import { Vec2, Vector2 } from "three";

export const useMinesweeper = (dimension: { x: number, y: number }, numberOfBombInField: number) => {
    let minesweeperRef = useRef(new MineSweeper());
    const ms = minesweeperRef.current;

    const [id, setId] = useState(() => 0);
    const [caseList, setCaseList] = useState(() => ms.caseList);
    const [gameState, setGameState] = useState(() => ms.gameState);

    const update = (): void => {
        setCaseList(ms.caseList);
        setGameState(ms.gameState);
    };

    useEffect(() => {
        ms.resize(dimension).updateBombNumber(numberOfBombInField);
        update();
    }, [dimension, numberOfBombInField]);

    const revealCase = (x: number, y: number, exceptCaseList: Vec2[]): void => {
        ms.revealCase(x, y, exceptCaseList);
        update();
    };

    const resetGame = (): void => {
        ms.reset();
        setId((value) => value + 1);
        update();
    };

    return {
        revealCase,
        resetGame,
        caseList,
        gameState,
        id
    }
};