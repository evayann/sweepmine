/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react';
import { CameraControls, CameraShake, Html } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { Case } from './case';
import { Case as CaseModel } from '~/models/minesweeper';
import { map } from '~/utils/calculations';
import { useMinesweeper } from '~/integrations/react/hooks/useMinesweeper';
import { RadioButton } from './dumb/radio-button/radio-button';
import { Button } from './dumb/button';
import { useEffect, useState } from 'react';
import { useTimer } from '../hooks/useTimer';

export interface MineSweeperProps {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

interface DisplayCase extends CaseModel {
    displayPosition: [number, number, number];
    hasFlag?: boolean;
}

export function ReactMineSweeper({ dimension, numberOfBombs }: MineSweeperProps) {
    // const [lightPosition, setLightPosition] = useState([10, 10, 10]);
    // useFrame(({ clock }) => setLightPosition([10, 10, 10]));
    const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
    const { resetGame, revealCase, caseList, gameState, id: gameId } = useMinesweeper(dimension, numberOfBombs);
    const gameNotFinish = gameState.state !== 'finish';

    useEffect(() => {
        if (!gameNotFinish) stopTimer();
    }, [gameNotFinish]);

    const board = {
        width: 10,
        height: 10,
        get halfWidth() {
            return this.width / 2;
        },
        get halfHeight() {
            return this.width / 2;
        },
    };
    const scaleFactor = { x: board.width / dimension.x, y: board.height / dimension.y };
    const displayCaseList: DisplayCase[] = caseList.map((caseModel) => {
        const x = map(caseModel.position.x, 0, dimension.x - 1, -board.halfWidth + 1, board.halfWidth - 1);
        const z = map(caseModel.position.y, 0, dimension.y - 1, -board.halfHeight + 1, board.halfHeight - 1);
        return {
            ...caseModel,
            displayPosition: [x, 0, z],
        };
    });

    return (
        <Canvas
            orthographic
            camera={{ zoom: 40, position: [10, 5, 10], top: 7, bottom: -7, left: 7, right: 7, near: 5, far: 2000 }}
        >
            <CameraControls maxPolarAngle={Math.PI / 2} enabled={gameNotFinish} />
            {/* <CameraShake
                maxPitch={0.05}
                maxRoll={0.05}
                maxYaw={0.05}
                pitchFrequency={0.3}
                rollFrequency={0.3}
                yawFrequency={0.3}
            /> */}
            <ambientLight />
            <axesHelper />

            <pointLight position={[10, 10, 10]} />
            {displayCaseList.map((_case, index) => (
                <Case
                    position={_case.displayPosition}
                    scale={[scaleFactor.x, 1, scaleFactor.y]}
                    isReveal={_case.isReveal}
                    caseModel={_case}
                    key={`Grid-${gameId}-Case-${_case.position.x}-${_case.position.y}:${index + 1}}`}
                    onClick={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();
                        if (!isRunning) startTimer();
                        revealCase(_case.position.x, _case.position.y);
                    }}
                />
            ))}
            {!gameNotFinish && (
                <Html
                    center
                    sprite
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',

                        backgroundColor: 'red',

                        borderRadius: '2rem',
                        padding: '1rem',
                    }}
                >
                    <p style={{ textAlign: 'center' }}>You {gameState.isWin ? 'win' : 'loose'} in XXX secondes !</p>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            resetGame();
                            resetTimer();
                        }}
                    >
                        Restart
                    </Button>
                </Html>
            )}
            <Html center style={{ translate: '0 200%' }}>
                <RadioButton id="left-click" defaultSelected="bomb" list={['bomb', 'flag']}></RadioButton>
                <p> Time : {time.toFixed(1)} seconds</p>
            </Html>
        </Canvas>
    );
}

export const MinesweeperBoard = qwikify$(ReactMineSweeper, {
    eagerness: 'visible',
    tagName: 'game',
});
