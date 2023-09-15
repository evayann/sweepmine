import styled from '@emotion/styled';

const typedInputStyle = {
    text: {
        padding: 0,
        border: 0,
        background: 'unset',

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
    number: {
        '&:before': {
            content: '-',
        },
        '&:after': {
            content: '+',
        },
    },
};

export const Input = styled.input<{ text?: boolean; number?: boolean }>`
    font-size: 1rem;
    width: 50%;

    &[type="number"] {
        position: relative;

        &::after,
        &::before {
            position: absolute;
            font-size: 32px;
            color: white;
            top: 0;
            z-index: 1000;
        }

        &::before {
            content: '-';

            left: 0;
        }

        &::after {
            content: '+';

            right: 0;
        },
    }
    ${(props) => {
        if (props.text) return typedInputStyle.text;
    }}
`;
