import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const typedButtonStyle = {
    invisible: {
        padding: 0,
        border: 0,
        background: 'unset',

        '&:hover': {
            backgroundColor: 'unset',
        },
    },
};

export const Button = styled.button<{ invisible?: boolean }>`
    cursor: pointer;
    border: none;
    border-radius: 4rem;

    color: white;
    background-color: var(--qwik-dark-blue, red);

    font-weight: 700;

    transition: background-color 0.3s ease-in-out;

    &:hover {
        color: lightgray;
        background-color: gray;
    }

    ${(props) => {
        if (props.invisible) return typedButtonStyle.invisible;
    }}
`;

export const MotionButton = motion(Button);
