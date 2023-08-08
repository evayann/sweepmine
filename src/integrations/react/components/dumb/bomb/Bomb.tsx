/** @jsxImportSource react */

import { GroupProps } from '@react-three/fiber';
import { BombModel } from './BombModel';
import { ExtendedGroup } from '~/integrations/react/hooks/useExplode';
import { MutableRefObject, useRef } from 'react';

export function Bomb(props: GroupProps) {
    const bombModel = useRef<ExtendedGroup>() as MutableRefObject<ExtendedGroup>;
    return <BombModel ref={bombModel} {...props} />;
}
