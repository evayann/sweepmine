/** @jsxImportSource react */

import { motion } from 'framer-motion-3d';
import { HTMLAttributes, LegacyRef, MutableRefObject, forwardRef } from 'react';

export interface HudProps extends HTMLAttributes<HTMLDivElement> {}

export const Hud = forwardRef(function ({ children, style }: HudProps, ref: LegacyRef<HTMLDivElement> | undefined) {
    return (
        <div ref={ref} style={{ width: '100%', height: '100%', ...style }}>
            {children}
        </div>
    );
});

export const MotionHud = motion(Hud);
