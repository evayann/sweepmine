import { Billboard, Text } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useMemo, useState } from 'react';
import { DisplayCase } from '../../../interfaces/case.interface';
import { ExplodableBomb } from '../../dumb';
import { Flag } from './Flag';
import { useThemeColor } from '../../../hooks/useThemeColor';

export interface CaseProps extends GroupProps {
    displayCase: DisplayCase;
    explosionTimeInSecond: number;
}

export function Case({ displayCase, explosionTimeInSecond, ...otherProps }: CaseProps) {
    const [revealAnimationEnd, setReavealAnimationEnd] = useState(false);
    const [explosionPercent, setExplosionPercent] = useState(0);

    const theme = useThemeColor();
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
            <Text outlineColor="white" outlineWidth={0.03} color="black" anchorX="center" anchorY="middle">
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

    const topCaseColor = useMemo(() => {
        if (displayCase.isHover) return 'red';
        if (displayCase.hasFlag) return 'darkgreen';
        return theme.primary;
    }, [displayCase.isHover, displayCase.hasFlag, displayCase.isReveal]);

    return (
        <group {...otherProps}>
            <mesh>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshBasicMaterial color={displayCase.isHover && !displayCase.isReveal ? 'hotpink' : theme.secondary} />
            </mesh>
            {!revealAnimationEnd && (
                <motion.mesh
                    variants={variants.caseTop}
                    animate={!displayCase.isReveal ? '' : 'disapear'}
                    onAnimationComplete={() => setReavealAnimationEnd(true)}
                    position={[0, 0.5, 0]}
                >
                    <boxGeometry args={[1, 0.2, 1]} />
                    <meshBasicMaterial color={topCaseColor} />
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
                    {/* <Svg src={FlagSvg} position={[-0.5, 0.5, 0]} scale={[0.04, 0.04, 0.04]} skipFill={true}></Svg> */}
                    <Flag position={[-0.5, 0.5, 0]} scale={[0.04, 0.04, 0.04]} />
                </Billboard>
            )}
        </group>
    );
}
