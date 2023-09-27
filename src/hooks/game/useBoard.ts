import { useRef } from "react";
import { Case, MineSweeper } from "../../models/minesweeper";
import { useRerender } from "../useRerender";
import { DisplayCase } from "../../interfaces/case.interface";
import { modelToDisplayCase } from "../../mappers/modelToMinesweeper";
import { Vec2 } from "three";
import { sleep } from "../../utils/misc";

export function useBoard() {
    const boardReference = useRef(new BoardService());
    return boardReference.current;
}

export class BoardService {
    displayCaseList: DisplayCase[] = [];
    private caseList: Case[] = [];
    private minesweeper!: MineSweeper;
    private rerender = useRerender();


    createBoard({ dimension, numberOfBombs }: { dimension: Vec2, numberOfBombs: number }): void {
        this.minesweeper = new MineSweeper();
    }

    async destroyBoard(): Promise<void> {

        await sleep(1000);
        this.rerender();
    }

    loadBoard(caseList: Case[], dimension: Vec2, board: any, scaleFactor: Vec2): void {
        this.caseList = caseList;
        this.displayCaseList = caseList.map(_case => modelToDisplayCase(_case, dimension, board, scaleFactor));
        this.rerender();
    }
}