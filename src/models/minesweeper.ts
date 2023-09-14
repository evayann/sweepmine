import { range2D, range } from "../utils/iteration";
import { randomInList } from "../utils/random";

export type GameState = { state: 'in-progress' } | { state: 'finish', isWin: boolean };

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

    gameState!: GameState;

    private cases!: Record<string, Case>;
    private dimension: { x: number, y: number };
    private numberOfBombInField: number;

    constructor() {
        this.dimension = { x: 5, y: 5 };
        this.numberOfBombInField = 10;
        this.reset();
    }

    revealCase(x: number, y: number): MineSweeper {
        const _case = this.getCase(x, y);
        if (!_case) throw new Error(`MineSweeper ModelError: Cannot select case (${x}, ${y}). Dimension of grid: ${this.dimension.x}x${this.dimension.y}`);

        _case.isReveal = true;

        if (this.isFirstRevealed)
            this.generateBombInField(x, y);

        if (_case.isBomb)
            return this.finishGame(false);

        this.revealNeighbours(x, y);

        if (this.onlyBombLeft)
            return this.finishGame(true);

        return this;
    }

    resize(dimension: { x: number, y: number }): MineSweeper {
        this.dimension = dimension;
        this.reset();
        return this;
    }

    updateBombNumber(numberOfBombInField: number): MineSweeper {
        this.numberOfBombInField = numberOfBombInField;
        this.reset();
        return this;
    }

    reset(): MineSweeper {
        const numberOfCase = this.dimension.x * this.dimension.y;
        if (numberOfCase < this.numberOfBombInField) throw new Error(`Cannot have ${this.numberOfBombInField} bombs in a field of ${numberOfCase} cases.`);

        console.log(this)
        const caseList = range2D({ width: { min: 0, max: this.dimension.x }, height: { min: 0, max: this.dimension.y } });
        this.cases = caseList.reduce((acc, [x, y]) => ({ ...acc, [id(x, y)]: generateCase(x, y) }), {});
        this.gameState = { state: 'in-progress' };

        return this;
    }

    private finishGame(isWin: boolean): MineSweeper {
        this.gameState = { state: 'finish', isWin };
        return this;
    }

    private revealNeighbours(x: number, y: number): void {
        if (this.hasBombAsNeighbour(x, y)) return;

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
        const neigbourOffsetList = range2D({ width: { min: -1, max: 2 }, height: { min: -1, max: 2 } });
        return neigbourOffsetList.map(([xOffset, yOffset]) => this.getCase(x + xOffset, y + yOffset)).filter(_case => _case) as Case[];
    }

    private hasBombAsNeighbour(x: number, y: number): boolean {
        return this.getNeighbourListOf(x, y).some(_case => _case.isBomb);
    }

    private generateBombInField(firstX: number, firstY: number): void {
        range(this.numberOfBombInField).forEach(() => {
            const potentialBombCaseList = this.notBombCaseList.filter(_case => _case.position.x !== firstX || _case.position.y !== firstY);
            const _case = randomInList(potentialBombCaseList);
            _case.isBomb = true;
            const { x, y } = _case.position;
            const neigbourList = this.getNeighbourListOf(x, y);
            neigbourList.forEach(neigbour => neigbour.numberOfBombsArround++);
        });
    }
}