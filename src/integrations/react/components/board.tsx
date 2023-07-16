/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react';
import { CameraControls, Html, OrthographicCamera } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { Case } from './case';
import { Case as CaseModel } from '~/models/minesweeper';
import { map } from '~/utils/calculations';
import { useMinesweeper } from '~/integrations/react/hooks/useMinesweeper';
import { RadioButton } from './radio-button/radio-button';

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
    const { resetGame, revealCase, caseList, gameState } = useMinesweeper(dimension, numberOfBombs);
    const gameNotFinish = gameState.state !== 'finish';

    const scaleFactor = { x: 10 / dimension.x, y: 10 / dimension.y };
    const displayCaseList: DisplayCase[] = caseList.map((caseModel) => {
        const x = map(caseModel.position.x, 0, dimension.x, -5, 5);
        const z = map(caseModel.position.y, 0, dimension.y, -5, 5);
        return {
            ...caseModel,
            displayPosition: [x, 0, z],
        };
    });

    return (
        <Canvas orthographic>
            <CameraControls enabled={gameNotFinish} />
            <OrthographicCamera
                makeDefault
                zoom={1}
                top={7}
                bottom={-7}
                left={7}
                right={-7}
                near={5}
                far={200}
                position={[10, 5, 10]}
            />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {displayCaseList.map((_case, index) => (
                <Case
                    position={_case.displayPosition}
                    scale={[scaleFactor.x, 1, scaleFactor.y]}
                    isReveal={_case.isReveal}
                    caseModel={_case}
                    key={`Case-${index}`}
                    onClick={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();
                        revealCase(_case.position.x, _case.position.y);
                    }}
                />
            ))}
            {!gameNotFinish && (
                <Html center sprite>
                    <p>You {gameState.isWin ? 'win' : 'loose'} in XXX secondes !</p>
                    <button onClick={resetGame}> Restart </button>
                </Html>
            )}
            <Html center style={{ translate: '0 500%' }}>
                <RadioButton id="left-click" defaultSelected="bomb" list={['bomb', 'flag']}></RadioButton>
            </Html>
        </Canvas>
    );
}

export const MinesweeperBoard = qwikify$(ReactMineSweeper, {
    eagerness: 'visible',
    tagName: 'game',
});
