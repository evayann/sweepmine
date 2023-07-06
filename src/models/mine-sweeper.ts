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

    private get potentialBombCaseList(): Case[] {
        return this.caseList.filter(_case => !_case.isBomb);
    }

    private get isFirstRevealed(): boolean {
        return this.caseList.filter(_case => _case.isReveal).length === 1;
    }

    private cases: Record<string, Case>;

    constructor(private dimension: { x: number, y: number }, private numberOfBombInField: number) {
        const numberOfCase = dimension.x * dimension.y;
        if (numberOfCase < numberOfBombInField) throw new Error(`Cannot have ${numberOfBombInField} bombs in a field of ${numberOfCase} cases.`);
        const caseList = range2D({ width: { min: 0, max: dimension.x }, height: { min: 0, max: dimension.y } });
        this.cases = caseList.reduce((acc, [x, y]) => ({ ...acc, [id(x, y)]: generateCase(x, y) }), {});
    }

    revealCase(x: number, y: number): void {
        const _case = this.getCase(x, y);
        if (!_case) throw new Error(`MineSweeper ModelError: Cannot select case (${x}, ${y}). Dimension of grid: ${this.dimension.x}x${this.dimension.y}`);

        _case.isReveal = true;

        if (!this.isFirstRevealed) return;
        this.generateBombInField();
    }

    private getCase(x: number, y: number): Case | undefined {
        return this.cases[id(x, y)];
    }

    private generateBombInField(): void {
        range(this.numberOfBombInField).forEach(() => {
            const _case = randomInList(this.potentialBombCaseList);
            _case.isBomb = true;
        });
    }
}