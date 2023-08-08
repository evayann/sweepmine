/** @jsxImportSource react */

import { GroupProps } from '@react-three/fiber';
import { BombModel } from './BombModel';
import { ExtendedGroup, useExplode } from '~/integrations/react/hooks/useExplode';
import { MutableRefObject, useRef } from 'react';

export interface BombProps extends GroupProps {
    explosionPercent?: number;
}

export function ExplodableBomb({ explosionPercent = 0, ...otherProps }: BombProps) {
    const bombModel = useRef<ExtendedGroup>() as MutableRefObject<ExtendedGroup>;
    useExplode({ group: bombModel, distance: 25, enableRotation: false, percent: explosionPercent });

    return <BombModel ref={bombModel} {...otherProps} />;
}
