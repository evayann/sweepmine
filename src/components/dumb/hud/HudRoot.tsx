import { HTMLAttributes } from 'react';

import './hud-root.css';

export interface HudRootProps extends HTMLAttributes<HTMLDivElement> {}

export function HudRoot({ children, style }: HudRootProps) {
    return (
        <div id="hud" style={style}>
            {children}
        </div>
    );
}
