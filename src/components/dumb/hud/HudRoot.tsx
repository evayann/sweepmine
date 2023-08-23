import { HTMLAttributes, Ref, forwardRef } from 'react';

import './HudRoot.css';

export interface HudRootProps extends HTMLAttributes<HTMLDivElement> {}

export const HudRoot = forwardRef(function ({ children, style }: HudRootProps, ref: Ref<HTMLDivElement>) {
    return (
        <div id="hud" ref={ref} style={style}>
            {children}
        </div>
    );
});
