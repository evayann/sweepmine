/** @jsxImportSource react */

import { Billboard, Text } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { Vector3 } from 'three';

export interface CaseProps extends GroupProps {
    isReveal: boolean;
    isHover: boolean;
    contentWhenDiscover: any;
}

export function Case(props: CaseProps) {
    const { isReveal, isHover, contentWhenDiscover, ...otherProps } = props;

    return (
        <group {...otherProps}>
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
            {isReveal && (
                <Billboard position={[0, 0.2, 0]}>
                    <Text color="black" anchorX="center" anchorY="bottom">
                        {contentWhenDiscover}
                    </Text>
                </Billboard>
            )}
        </group>
    );
}
