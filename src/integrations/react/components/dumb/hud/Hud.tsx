/** @jsxImportSource react */

import { motion } from 'framer-motion-3d';
import { HTMLAttributes, LegacyRef, MutableRefObject, forwardRef } from 'react';

export interface HudProps extends HTMLAttributes<HTMLDivElement> {
    center?: boolean;
}

export const Hud = forwardRef(function (
    { center, style, children, ...otherProps }: HudProps,
    ref: LegacyRef<HTMLDivElement> | undefined
) {
    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                height: '100%',
                ...(center
                    ? { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }
                    : {}),
                ...style,
            }}
            {...otherProps}
        >
            {children}
        </div>
    );
});

export const MotionHud = motion(Hud);
