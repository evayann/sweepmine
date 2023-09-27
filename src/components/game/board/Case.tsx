import { Billboard, Text } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { motion as motion3d } from 'framer-motion-3d';
import { useMemo, useState } from 'react';
import { DisplayCase } from '../../../interfaces/case.interface';
import { ExplodableBomb } from '../../dumb';
import { Flag } from './Flag';
import { useTheme } from '../../../hooks/useTheme';

export interface CaseProps extends GroupProps {
    displayCase: DisplayCase;
    explosionTimeInSecond: number;
}

export function Case({ displayCase, explosionTimeInSecond, ...otherProps }: CaseProps) {
    const [revealAnimationEnd, setReavealAnimationEnd] = useState(false);
    const [explosionPercent, setExplosionPercent] = useState(0);

    const { theme } = useTheme();
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
        case: {
            appear: {
                y: 1,
                transition: {
                    y: 0,
                },
            },
            disapear: {
                y: 0,
                transition: {
                    y: -1,
                },
            },
        },
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
        <motion3d.group
            /*{...otherProps}*/ variants={variants.case}
            // animate={'appear'}
            onAnimationComplete={() => console.log('toto')}
            position={[displayCase.displayPosition[0], 10, displayCase.displayPosition[2]]}
        >
            <mesh>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshBasicMaterial color={displayCase.isHover && !displayCase.isReveal ? 'hotpink' : theme.secondary} />
            </mesh>
            {!revealAnimationEnd && (
                <motion3d.mesh
                    variants={variants.caseTop}
                    animate={!displayCase.isReveal ? '' : 'disapear'}
                    onAnimationComplete={() => setReavealAnimationEnd(true)}
                    position={[0, 0.5, 0]}
                >
                    <boxGeometry args={[1, 0.2, 1]} />
                    <meshBasicMaterial color={topCaseColor} />
                </motion3d.mesh>
            )}
            {show.caseNumber && CaseNumber}
            {show.bomb && (
                <motion3d.group
                    animate={{ opacity: [0, 1, 0.5, 0.9, 0.7, 1], scale: [0, 1] }}
                    transition={{ type: 'spring', stiffness: 100, scale: { duration: 1 }, opacity: { duration: 1.5 } }}
                >
                    <ExplodableBomb
                        position={[0, 0.6, 0]}
                        scale={0.3}
                        isExplosive={false}
                        explosionPercent={explosionPercent}
                    />
                </motion3d.group>
            )}
            {displayCase.hasFlag && (
                <Billboard position={[0, 0.8, 0]}>
                    <Flag position={[-0.5, 0.5, 0]} scale={[0.04, 0.04, 0.04]} />
                </Billboard>
            )}
        </motion3d.group>
    );
}
