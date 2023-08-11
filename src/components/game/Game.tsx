import { Canvas, ThreeEvent } from '@react-three/fiber';
import { Case } from './Case';
import { Case as CaseModel } from '../../models/minesweeper';
import { Camera } from './Camera';
import { useMinesweeper } from '../../hooks/useMinesweeper';
import { useTimer } from '../../hooks/useTimer';
import { useGameState } from '../../hooks/useGameState';
import { useEffect } from 'react';
import { map } from '../../utils/calculations';

interface DisplayCase extends CaseModel {
    displayPosition: [number, number, number];
    bombExplosionInSecond?: number;
    hasFlag?: boolean;
}

export interface GameProps {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

export function Game({ dimension, numberOfBombs }: GameProps) {
    const { gameStateService } = useGameState();
    const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
    const { resetGame, revealCase, caseList, gameState, id: gameId } = useMinesweeper(dimension, numberOfBombs);
    const gameNotFinish = gameState.state !== 'finish';
    const gameFinish = gameState.state === 'finish';

    const board = {
        width: 10,
        height: 10,
        get halfWidth(): number {
            return this.width / 2;
        },
        get halfHeight(): number {
            return this.width / 2;
        },
    };
    const scaleFactor = { x: board.width / dimension.x, y: board.height / dimension.y };
    const displayCaseList: DisplayCase[] = caseList.map((caseModel) => {
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
        };
    });

    useEffect(() => {
        resetGame();
    }, [gameStateService.isInMenu()]);

    useEffect(() => {
        if (!gameFinish) return;
        stopTimer();
        gameStateService.toGameOver(gameState.isWin);
    }, [gameFinish]);

    return (
        <>
            {(gameStateService.isInGame() || gameStateService.isGameOver()) && (
                <Canvas style={{ gridRow: 1, gridColumn: 1 }}>
                    <Camera enableControl={gameNotFinish} />
                    <ambientLight />
                    {/* <axesHelper /> */}

                    {displayCaseList.map((_case, index) => (
                        <Case
                            position={_case.displayPosition}
                            scale={[scaleFactor.x, 1, scaleFactor.y]}
                            isReveal={_case.isReveal}
                            caseModel={_case}
                            explosionTimeInSecond={_case.bombExplosionInSecond ?? 0}
                            key={`Grid-${gameId}-Case-${_case.position.x}-${_case.position.y}:${index + 1}}`}
                            onClick={(pointerEvent: ThreeEvent<MouseEvent>) => {
                                pointerEvent.stopPropagation();
                                if (gameFinish) return;
                                if (!isRunning) startTimer();
                                revealCase(_case.position.x, _case.position.y);
                            }}
                        />
                    ))}
                </Canvas>
            )}
        </>
    );
}
