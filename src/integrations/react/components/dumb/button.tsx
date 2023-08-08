import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Button = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 4rem;
    background-color: var(--qwik-dark-blue, red);

    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: red;
    }
`;

export const MotionButton = motion(Button);
