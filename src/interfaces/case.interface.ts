import { Case as CaseModel } from '../models/minesweeper';

export interface DisplayCase extends CaseModel {
    displayPosition: [number, number, number];
    bombExplosionInSecond?: number;
    hasFlag: boolean;
    scale: { x: number, y: number }
    isHover: boolean;
    isExplosive: boolean;
}