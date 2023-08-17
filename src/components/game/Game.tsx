import { Canvas, ThreeEvent } from '@react-three/fiber';
import { Case } from './Case';
import { Camera } from './Camera';
import { useMinesweeper } from '../../hooks/useMinesweeper';
import { useGameState } from '../../hooks/useGameState';
import { useEffect, useMemo, useState } from 'react';
import { DisplayCase } from '../../interfaces/case.interface';
import { modelToDisplayCase } from '../../mappers/modelToMinesweeper';

export interface GameProps {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

export function Game({ dimension, numberOfBombs }: GameProps) {
    const { gameStateService, gameTimeService } = useGameState();
    const [displayCaseList, setDisplayCaseList] = useState<DisplayCase[]>(() => []);
    const [displayGame, setDisplayGame] = useState(() => true);
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
        setDisplayCaseList(caseList.map((_case) => modelToDisplayCase(_case, dimension, board, scaleFactor)));
    }, [caseList, dimension, board]);

    useEffect(() => {
        gameTimeService.startTimer();
    }, [gameStateService.isInGame]);

    useEffect(() => {
        gameTimeService.stopTimer();
    }, [gameStateService.isGameOver]);

    useEffect(() => {
        resetGame();
    }, [gameStateService.isInMenu]);

    useEffect(() => {
        if (!gameFinish) return;
        gameStateService.toGameOver(gameState.isWin);
    }, [gameFinish]);

    useEffect(() => {
        const game = gameStateService.isInGame || gameStateService.isGameOver;
        setDisplayGame(game);
        setGameBlur(gameStateService.isPaused);
    }, [gameStateService.isPaused, gameStateService.isInGame, gameStateService.isGameOver]);

    return (
        <>
            {displayGame && (
                <Canvas style={{ gridRow: 1, gridColumn: 1, filter: `${gameBlur ? 'blur(16px)' : ''}` }}>
                    <Camera isInGame={gameStateService.isInGame} isPaused={gameStateService.isPaused} />
                    <ambientLight />

                    {displayCaseList.map((_case, index) => (
                        <Case
                            position={_case.displayPosition}
                            scale={[_case.scale.x, 1, _case.scale.y]}
                            isReveal={_case.isReveal}
                            caseModel={_case}
                            explosionTimeInSecond={_case.bombExplosionInSecond ?? 0}
                            key={`Grid-${gameId}-Case-${_case.position.x}-${_case.position.y}:${index + 1}}`}
                            onPointerEnter={(pointerEvent: ThreeEvent<MouseEvent>) => {
                                pointerEvent.stopPropagation();
                                if (gameStateService.isPaused) return;

                                if (_case.isReveal || !gameStateService.isInGame) return;

                                _case.isHover = true;
                            }}
                            onPointerOut={(pointerEvent: ThreeEvent<MouseEvent>) => {
                                _case.isHover = false;
                            }}
                            onClick={(pointerEvent: ThreeEvent<MouseEvent>) => {
                                pointerEvent.stopPropagation();
                                if (gameStateService.isPaused || gameFinish) return;
                                revealCase(_case.position.x, _case.position.y);
                            }}
                        />
                    ))}
                </Canvas>
            )}
        </>
    );
}
