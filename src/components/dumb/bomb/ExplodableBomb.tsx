import { GroupProps } from '@react-three/fiber';
import { BombModel } from './BombModel';
import { MutableRefObject, useRef } from 'react';
import { ExtendedGroup, useExplode } from '../../../hooks/useExplode';

export interface BombProps extends GroupProps {
    isExplosive: boolean;
    explosionDurationInS?: number;
    explosionPercent?: number;
}

export function ExplodableBomb({
    explosionPercent = 0,
    explosionDurationInS = 2,
    isExplosive,
    ...otherProps
}: BombProps) {
    const bombModel = useRef<ExtendedGroup>() as MutableRefObject<ExtendedGroup>;
    useExplode({ group: bombModel, distance: 25, enableRotation: false, percent: isExplosive ? 0 : explosionPercent });

    return <BombModel ref={bombModel} {...otherProps} />;
}
