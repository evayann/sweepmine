import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const typedButtonStyle = {
    invisible: {
        padding: 0,
        border: 0,
        background: 'unset',
        display: 'flex',
        justifyContent: 'center',

        '&:hover': {
            backgroundColor: 'unset',
        },

        '& > svg': {
            transition: 'var(--hover-scale-transition)',
        },
        '&:hover > svg': {
            scale: 'var(--hover-scale)',
        },
    },
    callToAction: {
        color: 'var(--text-primary)',
        backgroundColor: 'var(--call-to-action)',
    },
    primary: {
        color: 'var(--text-primary)',
        backgroundColor: 'var(--primary)',
    },
    secondary: {
        color: 'var(--text-secondary)',
        backgroundColor: 'var(--secondary)',
    },
};

export const Button = styled.button<{
    invisible?: boolean;
    callToAction?: boolean;
    primary?: boolean;
    secondary?: boolean;
}>`
    cursor: pointer;
    border: none;
    border-radius: 4rem;

    font-weight: 700;

    transition: background-color 0.3s ease-in-out;

    &:hover {
        filter: brightness(120%);
    }

    ${(props) => {
        if (props.invisible) return typedButtonStyle.invisible;
        if (props.secondary) return typedButtonStyle.secondary;
        if (props.callToAction) return typedButtonStyle.callToAction;
        return typedButtonStyle.primary;
    }}
`;

export const MotionButton = motion(Button);
