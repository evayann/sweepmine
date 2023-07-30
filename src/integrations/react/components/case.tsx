/** @jsxImportSource react */

import { Billboard, Text } from '@react-three/drei';
import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Case as CaseModel } from '~/models/minesweeper';
import { useGameState } from '../hooks/useGameState';

export interface CaseProps extends GroupProps {
    isReveal: boolean;
    caseModel: CaseModel;
}

export function Case(props: CaseProps) {
    const { isReveal, caseModel, ...otherProps } = props;
    const [isHover, setIsHover] = useState(false);
    const { cursorService } = useGameState();

    const cursorType = 'pointer';
    useEffect(() => {
        if (isHover) cursorService.askOne(cursorType);
        else cursorService.removeOne(cursorType);

        return () => {
            if (isHover) cursorService.removeOne(cursorType);
        };
    }, [isHover]);

    const show = {
        caseNumber: isReveal && !caseModel.isBomb && caseModel.numberOfBombsArround !== 0,
        bomb: isReveal && caseModel.isBomb,
    };

    const actionsByState: Record<string, Record<string, () => void>> = {
        hoverStart: {
            isReveal: () => setIsHover(true),
        },
        hoverEnd: {
            isReveal: () => setIsHover(false),
        },
    };

    const pointerAction = (action: string) => (pointerEvent: ThreeEvent<PointerEvent>) => {
        pointerEvent.stopPropagation();
        if (isReveal) return;
        actionsByState[action].isReveal();
    };

    const CaseNumber: JSX.Element = (
        <Billboard position={[0, 0.8, 0]}>
            <Text outlineColor="white" outlineWidth={0.01} color="black" anchorX="center" anchorY="middle">
                {caseModel.numberOfBombsArround}
            </Text>
        </Billboard>
    );

    return (
        <group {...otherProps} onPointerEnter={pointerAction('hoverStart')} onPointerLeave={pointerAction('hoverEnd')}>
            <mesh>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshBasicMaterial color={isHover && !isReveal ? 'hotpink' : 'orange'} />
            </mesh>
            {!isReveal && (
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[1, 0.2, 1]} />
                    <meshBasicMaterial color={isHover && !isReveal ? 'red' : 'green'} />
                </mesh>
            )}
            {show.caseNumber && CaseNumber}
            {show.bomb && (
                <mesh position={[0, 0.6, 0]} scale={[0.35, 0.4, 0.35]}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial color={'green'} flatShading />
                </mesh>
            )}
        </group>
    );
}
