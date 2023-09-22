import { Canvas, ThreeEvent } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGame } from '../../../hooks/useGame';
import { useMinesweeper } from '../../../hooks/useMinesweeper';
import { DisplayCase } from '../../../interfaces/case.interface';
import { modelToDisplayCase } from '../../../mappers/modelToMinesweeper';
import { Case as CaseModel } from '../../../models/minesweeper';
import { range, zipLongest } from '../../../utils/iteration';
import { Camera } from './Camera';
import { Case } from './Case';
import { CamPosition } from '../hud/in-game/camera-position/camPosition';
import { useCursor } from '@react-three/drei';
import { Vec2, Vector2 } from 'three';

export interface BoardProps {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

export function Board({ dimension, numberOfBombs }: BoardProps) {
    const { gameStateService, gameInformationService, gameTimeService, cameraService } = useGame();
    const [displayCaseList, setDisplayCaseList] = useState<DisplayCase[]>(() => []);
    const [gameBlur, setGameBlur] = useState(() => false);
    const { resetGame, revealCase, caseList, gameState, id: gameId } = useMinesweeper(dimension, numberOfBombs);
    const gameFinish = gameState.state === 'finish';

    const [flagedCaseList, setFlagedCaseList] = useState<Vec2[]>([]);

    const [cursor, setCursor] = useState<{ hover: boolean; type?: string }>(() => ({ hover: false, type: undefined }));
    useCursor(cursor.hover, cursor.type);

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

    const canInteractWithCase = useCallback(
        (_case: CaseModel) =>
            !gameStateService.isPaused &&
            !gameInformationService.clickActionIsCameraMove &&
            !_case.isReveal &&
            !gameFinish,
        [gameStateService, gameInformationService]
    );

    const sortedCaseByDistanceOfCenter = useMemo(() => {
        const center = { x: board.halfWidth, y: board.halfHeight };
        const dist = (p1: { x: number; y: number }, p2: { x: number; y: number }) =>
            Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

        return displayCaseList.sort((a, b) => dist(a.position, center) - dist(b.position, center));
    }, [displayCaseList]);

    useEffect(() => {
        const scaleFactor = { x: board.width / dimension.x, y: board.height / dimension.y };
        const newDisplayCaseList: DisplayCase[] = zipLongest(caseList, displayCaseList)
            .map(([caseModel, displayCase]: [CaseModel, DisplayCase | undefined]) => {
                if (!caseModel) return;

                const _case = modelToDisplayCase(caseModel, dimension, board, scaleFactor);

                if (!displayCase) return _case;

                _case.hasFlag = displayCase.hasFlag;
                return _case;
            })
            .filter((caseModel) => caseModel) as DisplayCase[];

        setDisplayCaseList(newDisplayCaseList);
    }, [caseList, dimension, board]);

    useEffect(() => {
        setCursor({ hover: gameInformationService.clickActionIsCameraMove, type: 'grab' });
    }, [gameInformationService.clickActionIsCameraMove]);

    useEffect(() => {
        gameTimeService.resetTimer();
        cameraService.setPosition(CamPosition.Corner);
    }, []);

    useEffect(() => {
        gameTimeService.stopTimer();
    }, [gameStateService.isGameOver]);

    useEffect(() => {
        resetGame();
    }, [gameStateService.isInMenu]);

    useEffect(() => {
        const reloadField = async () => {
            const nbDistance = sortedCaseByDistanceOfCenter.reduce(
                (acc, _case) => new Set([...acc, Math.floor(_case.distanceToCenter)]),
                new Set<number>()
            ).size;

            const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
            for await (const distance of range(nbDistance)) {
                setDisplayCaseList(
                    displayCaseList.filter(
                        (_case) => Math.floor(_case.distanceToCenter) === nbDistance - (distance + 1)
                    )
                );
                await sleep(200);
            }
        };

        reloadField();
        resetGame();
        gameTimeService.resetTimer();
    }, [gameInformationService.dimension]);

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
            <Camera
                isInGame={gameStateService.isInGame}
                isPaused={gameStateService.isPaused}
                canMove={gameInformationService.clickActionIsCameraMove}
            />
            <ambientLight />

            {sortedCaseByDistanceOfCenter.map((_case, index) => (
                <Case
                    position={_case.displayPosition}
                    scale={[_case.scale.x, 1, _case.scale.y]}
                    displayCase={_case}
                    explosionTimeInSecond={_case.bombExplosionInSecond ?? 0}
                    key={`Grid-${gameId}-Case-${_case.position.x}-${_case.position.y}:${index + 1}}`}
                    onPointerEnter={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();

                        if (!canInteractWithCase(_case)) return;
                        setCursor({
                            hover: true,
                            type: 'pointer',
                        });
                        _case.isHover = true;
                    }}
                    onPointerOut={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();

                        if (!_case.isHover) return;
                        setCursor({ hover: false, type: undefined });
                        _case.isHover = false;
                    }}
                    onClick={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();
                        if (!canInteractWithCase(_case)) return;

                        if (gameInformationService.clickActionIsFlag) {
                            _case.hasFlag = !_case.hasFlag;
                            setFlagedCaseList([...flagedCaseList, _case.position]);
                            return;
                        }

                        if (_case.hasFlag) return;

                        revealCase(_case.position.x, _case.position.y, flagedCaseList);
                        _case.isExplosive = _case.isBomb;
                    }}
                />
            ))}
        </Canvas>
    );
}
