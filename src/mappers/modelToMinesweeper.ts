import { Case as CaseModel, MineSweeper } from "../models/minesweeper";
import { DisplayCase } from '../interfaces/case.interface';
import { map } from "../utils/calculations";

export function modelToMinesweeper(minesweeper: MineSweeper) {

}

export function modelToDisplayCase(caseModel: CaseModel, dimension: any, board: any, scaleFactor: any): DisplayCase {
    const x = map(
        caseModel.position.x,
        0,
        dimension.x - 1,
        -board.halfWidth + scaleFactor.x / 2,
        board.halfWidth - scaleFactor.x / 2
    );
    const z = map(
        caseModel.position.y,
        0,
        dimension.y - 1,
        -board.halfHeight + scaleFactor.y / 2,
        board.halfHeight - scaleFactor.y / 2
    );
    return {
        ...caseModel,
        displayPosition: [x, 0, z],
        bombExplosionInSecond: caseModel.isBomb ? 20 + Math.random() * 2 : undefined,
        isHover: false,
    };
}