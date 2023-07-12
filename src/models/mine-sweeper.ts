import { range, range2D } from "~/utils/iteration";
import { randomInList } from "~/utils/random";

export interface Case {
    position: { x: number, y: number };
    isReveal: boolean;
    isBomb: boolean;
    numberOfBombsArround: number;
}

const generateCase = (x: number, y: number): Case => ({ position: { x, y }, isBomb: false, numberOfBombsArround: 0, isReveal: false });
const id = (x: number, y: number): string => `${x}-${y}`;

export class MineSweeper {
    get caseList(): Case[] {
        return Object.values(this.cases);
    }

    private get notBombCaseList(): Case[] {
        return this.caseList.filter(_case => !_case.isBomb);
    }

    private get isFirstRevealed(): boolean {
        return this.caseList.filter(_case => _case.isReveal).length === 1;
    }

    private get notRevealCase(): Case[] {
        return this.caseList.filter(_case => !_case.isReveal);
    }

    private get onlyBombLeft(): boolean {
        return this.notRevealCase.every(_case => _case.isBomb);
    }

    gameState: { state: 'in-progress' } | { state: 'finish', isWin: boolean };
    private cases: Record<string, Case>;

    constructor(private dimension: { x: number, y: number }, private numberOfBombInField: number) {
        const numberOfCase = dimension.x * dimension.y;
        if (numberOfCase < numberOfBombInField) throw new Error(`Cannot have ${numberOfBombInField} bombs in a field of ${numberOfCase} cases.`);
        const caseList = range2D({ width: { min: 0, max: dimension.x }, height: { min: 0, max: dimension.y } });
        this.cases = caseList.reduce((acc, [x, y]) => ({ ...acc, [id(x, y)]: generateCase(x, y) }), {});
        this.gameState = { state: 'in-progress' }
    }

    revealCase(x: number, y: number): void {
        const _case = this.getCase(x, y);
        if (!_case) throw new Error(`MineSweeper ModelError: Cannot select case (${x}, ${y}). Dimension of grid: ${this.dimension.x}x${this.dimension.y}`);

        _case.isReveal = true;

        if (_case.isBomb) return this.finishGame(false);

        if (this.onlyBombLeft) return this.finishGame(true);

        if (this.isFirstRevealed)
            this.generateBombInField(x, y);

        this.revealNeighbours(x, y);
    }

    private finishGame(isWin: boolean): void {
        this.gameState = { state: 'finish', isWin };
    }

    private revealNeighbours(x: number, y: number): void {
        const neigbourList = this.getNeighbourListOf(x, y);
        neigbourList.forEach(neigbourCase => {
            if (neigbourCase.isBomb || neigbourCase.isReveal) return;

            neigbourCase.isReveal = true;
            const { x, y } = neigbourCase.position;
            this.revealNeighbours(x, y);
        });
    }

    private getCase(x: number, y: number): Case | undefined {
        return this.cases[id(x, y)];
    }

    private getNeighbourListOf(x: number, y: number): Case[] {
        const neigbourOffsetList = range2D({ width: { min: -1, max: 1 }, height: { min: -1, max: 1 } });
        return neigbourOffsetList.map(([xOffset, yOffset]) => this.getCase(x + xOffset, y + yOffset)).filter(_case => _case) as Case[];
    }

    private generateBombInField(firstX: number, firstY: number): void {
        range(this.numberOfBombInField).forEach(() => {
            const potentialBombCaseList = this.notBombCaseList.filter(_case => _case.position.x !== firstX && _case.position.y !== firstY)
            const _case = randomInList(potentialBombCaseList);
            _case.isBomb = true;
            const { x, y } = _case.position;
            const neigbourList = this.getNeighbourListOf(x, y);
            neigbourList.forEach(neigbour => neigbour.numberOfBombsArround++);
        });
    }
}