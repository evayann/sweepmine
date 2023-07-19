import { styled } from "styled-vanilla-extract/qwik";

export const Button = styled.button`
    background-color: var(--app-light-background);
    border-radius: var(--app-border-radius);

    &:hover {
        cursor: pointer;
    }
`;