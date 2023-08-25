import { Canvas, ThreeEvent } from '@react-three/fiber';
import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../../../hooks/useGame';
import { useMinesweeper } from '../../../hooks/useMinesweeper';
import { DisplayCase } from '../../../interfaces/case.interface';
import { modelToDisplayCase } from '../../../mappers/modelToMinesweeper';
import { Camera } from './Camera';
import { Case } from './Case';
import { Case as CaseModel } from '../../../models/minesweeper';
import { zipLongest, zip } from '../../../utils/iteration';

export interface BoardProps {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

export function Board({ dimension, numberOfBombs }: BoardProps) {
    const { gameStateService, gameTimeService } = useGame();
    const [displayCaseList, setDisplayCaseList] = useState<DisplayCase[]>(() => []);
    const [gameBlur, setGameBlur] = useState(() => false);
    const { resetGame, revealCase, caseList, gameState, id: gameId } = useMinesweeper(dimension, numberOfBombs);
    const gameFinish = gameState.state === 'finish';

    const board = useMemo(
        () => ({
            width: 10,
            height: 10,
            get halfWidth(): number {
                return this.width / 2;
            },
            get halfHeight(): number {
                return this.width / 2;
            },
        }),
        []
    );

    useEffect(() => {
        const scaleFactor = { x: board.width / dimension.x, y: board.height / dimension.y };
        const newDisplayCaseList = zipLongest(caseList, displayCaseList).map(
            ([caseModel, displayCase]: [CaseModel, DisplayCase | undefined]) => {
                const _case = modelToDisplayCase(caseModel, dimension, board, scaleFactor);

                if (!displayCase) return _case;

                _case.hasFlag = displayCase.hasFlag;
                return _case;
            }
        );
        setDisplayCaseList(newDisplayCaseList);
    }, [caseList, dimension, board]);

    useEffect(() => {
        gameTimeService.resetTimer();
    }, []);

    useEffect(() => {
        gameTimeService.stopTimer();
    }, [gameStateService.isGameOver]);

    useEffect(() => {
        resetGame();
    }, [gameStateService.isInMenu]);

    useEffect(() => {
        if (!gameFinish) return;
        gameStateService.toGameOver(gameState.isWin);

        const newDisplayCaseList = displayCaseList.map(({ isBomb, isReveal, ...otherProps }) => ({
            ...otherProps,
            isBomb,
            isReveal: isBomb ? true : isReveal,
        }));
        setDisplayCaseList(newDisplayCaseList);
    }, [gameFinish]);

    useEffect(() => {
        setGameBlur(gameStateService.isPaused);
    }, [gameStateService.isPaused]);

    return (
        <Canvas style={{ gridRow: 1, gridColumn: 1, filter: `${gameBlur ? 'blur(16px)' : ''}` }}>
            <Camera isInGame={gameStateService.isInGame} isPaused={gameStateService.isPaused} />
            <ambientLight />

            {displayCaseList.map((_case, index) => (
                <Case
                    position={_case.displayPosition}
                    scale={[_case.scale.x, 1, _case.scale.y]}
                    displayCase={_case}
                    explosionTimeInSecond={_case.bombExplosionInSecond ?? 0}
                    key={`Grid-${gameId}-Case-${_case.position.x}-${_case.position.y}:${index + 1}}`}
                    onPointerEnter={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();

                        if (gameStateService.isPaused) return;

                        if (_case.isReveal || !gameStateService.isInGame) return;

                        _case.isHover = true;
                    }}
                    onPointerOut={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();
                        if (!_case.isHover) return;
                        _case.isHover = false;
                    }}
                    onClick={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();
                        if (gameStateService.isPaused || _case.isReveal || gameFinish) return;

                        if (gameStateService.clickActionIsFlag) {
                            _case.hasFlag = !_case.hasFlag;
                            return;
                        }

                        if (_case.hasFlag) return;

                        revealCase(_case.position.x, _case.position.y);
                        _case.isExplosive = _case.isBomb;
                    }}
                />
            ))}
        </Canvas>
    );
}
