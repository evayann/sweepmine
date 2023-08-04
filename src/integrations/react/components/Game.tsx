/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react';
import { Canvas, CanvasProps, ThreeEvent } from '@react-three/fiber';
import { Case } from './Case';
import { Case as CaseModel } from '~/models/minesweeper';
import { map } from '~/utils/calculations';
import { RadioButton } from './dumb/radio-button/radio-button';
import { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useMinesweeper } from '../hooks/useMinesweeper';
import { GameEndMenu } from './menu/GameEndMenu';
import { Camera } from './game/Camera';
import { Hud, MotionHud } from './dumb/hud/Hud';
import { HudRoot } from './dumb/hud/HudRoot';
import { GameProvider } from '../gameContext';
import { CursorService } from '../services/cursorService';
import { Button } from './dumb/Button';
import { GameStateService } from '../services/gameStateService';

export interface MineSweeperProps extends CanvasProps {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

interface DisplayCase extends CaseModel {
    displayPosition: [number, number, number];
    bombExplosionInSecond?: number;
    hasFlag?: boolean;
}

export function ReactMineSweeper({ dimension, numberOfBombs, style, ...otherProps }: MineSweeperProps) {
    // const [lightPosition, setLightPosition] = useState([10, 10, 10]);
    // useFrame(({ clock }) => setLightPosition([10, 10, 10]));
    const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
    const { resetGame, revealCase, caseList, gameState, id: gameId } = useMinesweeper(dimension, numberOfBombs);
    const gameNotFinish = gameState.state !== 'finish';
    const gameFinish = gameState.state === 'finish';

    useEffect(() => {
        if (!gameNotFinish) stopTimer();
    }, [gameNotFinish]);

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

    const center = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const gameStateService = new GameStateService();

    return (
        <GameProvider value={{ cursorService: new CursorService(), gameStateService }}>
            <div
                {...otherProps}
                style={{ ...style, display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr' }}
            >
                <Canvas style={{ gridRow: 1, gridColumn: 1 }}>
                    <Camera enableControl={gameNotFinish} />
                    <ambientLight />
                    <axesHelper />

                    <pointLight position={[10, 10, 10]} />
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
                <HudRoot>
                    {gameState.state === 'in-progress' && (
                        <Hud
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Button onClick={() => gameStateService.toGame()}>Start to explode !</Button>
                        </Hud>
                    )}
                    {gameNotFinish && (
                        <Hud
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <RadioButton id="left-click" defaultSelected="bomb" list={['bomb', 'flag']}></RadioButton>
                            <p> Time : {time.toFixed(1)} seconds</p>
                        </Hud>
                    )}
                    {!gameNotFinish && (
                        <MotionHud animate={{ opacity: 1 }} transition={{ duration: 20 }} style={{ ...center }}>
                            <GameEndMenu
                                isWin={gameState.isWin}
                                restartCallback={() => {
                                    resetGame();
                                    resetTimer();
                                }}
                            />
                        </MotionHud>
                    )}
                </HudRoot>
            </div>
        </GameProvider>
    );
}

export const Minesweeper = qwikify$(ReactMineSweeper, {
    eagerness: 'visible',
    tagName: 'game',
});
