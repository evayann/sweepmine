/** @jsxImportSource react */

import { Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';

export interface CaseProps extends GroupProps {
    isReveal: boolean;
    isHover: boolean;
    contentWhenDiscover: unknown;
}

export function Case(props: CaseProps) {
    const { isReveal, isHover, ...otherProps } = props;
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
        </group>
    );
}
