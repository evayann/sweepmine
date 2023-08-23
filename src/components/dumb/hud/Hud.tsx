import { MotionProps, motion } from 'framer-motion';
import { Ref, forwardRef } from 'react';

export interface HudProps extends MotionProps {
    id?: string;
    margin?: string;
    center?: boolean;
    bottom?: boolean;
}

export const Hud = forwardRef(function (
    { id, margin, center, bottom, style, children, ...otherProps }: HudProps,
    ref: Ref<HTMLDivElement>
) {
    const marginUnit = margin
        ?.split('')
        .filter((character) => isNaN(+character))
        .join('');
    const doubleMargin = margin && marginUnit ? `${+margin.replace(marginUnit, '') * 2}${marginUnit}` : undefined;
    return (
        <motion.div
            {...(id ? { id } : {})}
            ref={ref}
            style={{
                display: 'flex',
                overflow: 'hidden',
                ...(doubleMargin
                    ? { margin, width: `calc(100% - ${doubleMargin})`, height: `calc(100% - ${doubleMargin})` }
                    : {}),

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
