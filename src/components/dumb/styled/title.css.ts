import { styled } from 'styled-vanilla-extract/qwik';

export const Title = styled.p`
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--app-text-${(props: any) => props.dark ? 'dark' : 'light'});
`;
