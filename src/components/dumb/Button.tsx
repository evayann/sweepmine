import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Button = styled.button`
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
`;

export const MotionButton = motion(Button);
