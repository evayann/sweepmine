/** @jsxImportSource react */

import { HTMLAttributes } from 'react';

export interface HudProps extends HTMLAttributes<HTMLDivElement> {}

export function Hud({ children, style }: HudProps) {
    return <div style={{ width: '100%', height: '100%', ...style }}>{children}</div>;
}
