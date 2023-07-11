/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react';
import { CameraControls, OrthographicCamera } from '@react-three/drei';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { Case } from './case';
import { Case as CaseModel, MineSweeper as MineSweeperModel } from '~/models/mine-sweeper';
import { map } from '~/utils/calculations';
import { useMinesweeper } from '~/integrations/react/hooks/useMinesweeper';
import { useState } from 'react';
import { Vector3 } from 'three';

export interface MineSweeperProps {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

interface DisplayCase extends CaseModel {
    displayPosition: [number, number, number];
    isHover: boolean;
}

export function ReactMineSweeper({ dimension, numberOfBombs }: MineSweeperProps) {
    // const [lightPosition, setLightPosition] = useState([10, 10, 10]);
    // useFrame(({ clock }) => setLightPosition([10, 10, 10]));
    const { revealCase, caseList } = useMinesweeper(dimension, numberOfBombs);

    const scaleFactor = { x: 10 / dimension.x, y: 10 / dimension.y };
    const displayCaseList: DisplayCase[] = caseList.map((_case) => {
        const x = map(_case.position.x, 0, dimension.x, -5, 5);
        const z = map(_case.position.y, 0, dimension.y, -5, 5);
        return {
            ..._case,
            displayPosition: [x, 0, z],
            isHover: false,
        };
    });

    return (
        <Canvas orthographic>
            <CameraControls />
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
                    contentWhenDiscover={_case.numberOfBombsArround}
                    isHover={_case.isHover}
                    key={`Case-${index}`}
                    onClick={(pointerEvent: ThreeEvent<MouseEvent>) => {
                        pointerEvent.stopPropagation();
                        revealCase(_case.position.x, _case.position.y);
                    }}
                    onPointerOver={(pointerEvent: ThreeEvent<PointerEvent>) => {
                        pointerEvent.stopPropagation();
                        _case.isHover = true;
                    }}
                    onPointerOut={(pointerEvent: ThreeEvent<PointerEvent>) => {
                        pointerEvent.stopPropagation();
                        _case.isHover = false;
                    }}
                />
            ))}
        </Canvas>
    );
}

export const MinesweeperBoard = qwikify$(ReactMineSweeper, {
    eagerness: 'visible',
    tagName: 'game',
});
