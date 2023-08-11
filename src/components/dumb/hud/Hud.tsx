import { HTMLAttributes, LegacyRef, forwardRef } from 'react';

export interface HudProps extends HTMLAttributes<HTMLDivElement> {
    center?: boolean;
    bottom?: boolean;
}

export const Hud = forwardRef(function (
    { center, bottom, style, children, ...otherProps }: HudProps,
    ref: LegacyRef<HTMLDivElement> | undefined
) {
    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                ...(center ? { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } : {}),
                ...(bottom ? { flexDirection: 'row', alignItems: 'flex-end' } : {}),
                ...style,
            }}
            {...otherProps}
        >
            {children}
        </div>
    );
});
