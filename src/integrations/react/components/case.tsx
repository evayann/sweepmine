/** @jsxImportSource react */

import { Billboard, Text } from '@react-three/drei';
import { GroupProps, ThreeEvent, useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { Case as CaseModel } from '~/models/minesweeper';

export interface CaseProps extends GroupProps {
    isReveal: boolean;
    caseModel: CaseModel;
}

export function Case(props: CaseProps) {
    const { isReveal, caseModel, ...otherProps } = props;
    const [isHover, setIsHover] = useState(false);

    const actionsByState: Record<string, Record<string, Record<string, () => void>>> = {
        hoverStart: {
            isReveal: {
                true: () => {},
                false: () => setIsHover(true),
            },
        },
        hoverEnd: {
            isReveal: {
                true: () => {},
                false: () => setIsHover(false),
            },
        },
    };
    const pointerAction = (action: string) => (pointerEvent: ThreeEvent<PointerEvent>) => {
        pointerEvent.stopPropagation();
        actionsByState[action].isReveal[`${isReveal}`]();
    };

    return (
        <group {...otherProps} onPointerOver={pointerAction('hoverStart')} onPointerOut={pointerAction('hoverEnd')}>
            <mesh>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshBasicMaterial color={isHover ? 'hotpink' : 'orange'} />
            </mesh>
            {!isReveal && (
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[1, 0.2, 1]} />
                    <meshBasicMaterial color={isHover ? 'red' : 'green'} />
                </mesh>
            )}
            {isReveal && !caseModel.isBomb && caseModel.numberOfBombsArround !== 0 && (
                <Billboard position={[0, 0.2, 0]}>
                    <Text color="black" anchorX="center" anchorY="bottom">
                        {caseModel.numberOfBombsArround}
                    </Text>
                </Billboard>
            )}
            {isReveal && caseModel.isBomb && (
                <mesh position={[0, 0.5, 0]} scale={[0.5, 1, 0.5]}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial color={'green'} flatShading />
                </mesh>
            )}
        </group>
    );
}
