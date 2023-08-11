import { GroupProps } from '@react-three/fiber';
import { BombModel } from './BombModel';
import { MutableRefObject, useRef } from 'react';
import { ExtendedGroup } from '../../../hooks/useExplode';

export function Bomb(props: GroupProps) {
    const bombModel = useRef<ExtendedGroup>() as MutableRefObject<ExtendedGroup>;
    return <BombModel ref={bombModel} {...props} />;
}
