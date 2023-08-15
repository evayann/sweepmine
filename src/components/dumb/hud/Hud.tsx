import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes, LegacyRef, Ref, forwardRef } from 'react';

export interface HudProps extends MotionProps {
    margin?: number | string;
    center?: boolean;
    bottom?: boolean;
}

export const Hud = forwardRef(function (
    { margin, center, bottom, style, children, ...otherProps }: HudProps,
    ref: Ref<HTMLDivElement>
) {
    return (
        <motion.div
            ref={ref}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                ...(margin ? { margin } : {}),

                ...(center ? { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } : {}),
                ...(bottom ? { flexDirection: 'row', alignItems: 'flex-end' } : {}),

                ...style,
            }}
            {...otherProps}
        >
            {children}
        </motion.div>
    );
});
