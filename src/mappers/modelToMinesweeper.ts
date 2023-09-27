import { Vec2, Vector2 } from 'three';
import { DisplayCase } from '../interfaces/case.interface';
import { Case as CaseModel } from "../models/minesweeper";
import { map } from "../utils/calculations";

export function modelToDisplayCase(caseModel: CaseModel, dimension: Vec2, board: any, scale: Vec2): DisplayCase {
    const x = map(
        caseModel.position.x,
        0,
        dimension.x - 1,
        -board.halfWidth + scale.x / 2,
        board.halfWidth - scale.x / 2
    );
    const z = map(
        caseModel.position.y,
        0,
        dimension.y - 1,
        -board.halfHeight + scale.y / 2,
        board.halfHeight - scale.y / 2
    );

    return {
        ...caseModel,
        appear: true,
        displayPosition: [x, 0, z],
        bombExplosionInSecond: caseModel.isBomb ? 20 + Math.random() * 2 : undefined,
        scale,
        hasFlag: false,
        isHover: false,
        isExplosive: false,
        distanceToCenter: caseModel.position.distanceTo(new Vector2(dimension.x / 2, dimension.y / 2))
    };
}