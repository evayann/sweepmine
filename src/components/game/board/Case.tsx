import { Billboard, Text, useCursor } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useEffect, useState } from 'react';
import { ExplodableBomb } from '../../dumb';
import { DisplayCase } from '../../../interfaces/case.interface';

export interface CaseProps extends GroupProps {
    displayCase: DisplayCase;
    explosionTimeInSecond: number;
}

export function Case({ displayCase, explosionTimeInSecond, ...otherProps }: CaseProps) {
    const [revealAnimationEnd, setReavealAnimationEnd] = useState(false);
    const [explosionPercent, setExplosionPercent] = useState(0);

    const [hovered, setHover] = useState(() => false);
    useCursor(hovered);

    useEffect(() => {
        setHover(displayCase.isHover);
    }, [displayCase.isHover]);

    useFrame(({ clock }) => {
        if (!displayCase.isReveal || !displayCase.isBomb) return;
        setExplosionPercent(Math.min(explosionPercent + clock.getElapsedTime() / (1000 * explosionTimeInSecond), 1));
    });

    const show = {
        caseNumber: revealAnimationEnd && !displayCase.isBomb && displayCase.numberOfBombsArround !== 0,
        bomb: revealAnimationEnd && displayCase.isBomb,
    };

    const CaseNumber: JSX.Element = (
        <Billboard position={[0, 0.8, 0]}>
            <Text outlineColor="white" outlineWidth={0.01} color="black" anchorX="center" anchorY="middle">
                {displayCase.numberOfBombsArround}
            </Text>
        </Billboard>
    );

    const variants = {
        caseTop: {
            disapear: {
                scaleX: [1, 0.5, 0.45, 1, 0],
                scaleZ: [1, 1, 0.3, 0.6, 0.1, 0],
                transition: {
                    scaleX: { delay: 0 },
                    scaleZ: { delay: 0.025 },
                },
            },
        },
    };

    return (
        <group {...otherProps}>
            <mesh>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshBasicMaterial color={displayCase.isHover && !displayCase.isReveal ? 'hotpink' : 'orange'} />
            </mesh>
            {!revealAnimationEnd && (
                <motion.mesh
                    variants={variants.caseTop}
                    animate={!displayCase.isReveal ? '' : 'disapear'}
                    onAnimationComplete={() => setReavealAnimationEnd(true)}
                    position={[0, 0.5, 0]}
                >
                    <boxGeometry args={[1, 0.2, 1]} />
                    <meshBasicMaterial color={displayCase.isHover && !displayCase.isReveal ? 'red' : 'green'} />
                </motion.mesh>
            )}
            {show.caseNumber && CaseNumber}
            {show.bomb && (
                <motion.group
                    animate={{ opacity: [0, 1, 0.5, 0.9, 0.7, 1], scale: [0, 1] }}
                    transition={{ type: 'spring', stiffness: 100, scale: { duration: 1 }, opacity: { duration: 1.5 } }}
                >
                    <ExplodableBomb
                        position={[0, 0.6, 0]}
                        scale={0.3}
                        isExplosive={false}
                        explosionPercent={explosionPercent}
                    />
                </motion.group>
            )}
            {displayCase.hasFlag && (
                <Billboard position={[0, 0.8, 0]}>
                    <Text
                        outlineColor="white"
                        outlineWidth={0.01}
                        fontSize={0.5}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Flag
                    </Text>
                </Billboard>
            )}
        </group>
    );
}
