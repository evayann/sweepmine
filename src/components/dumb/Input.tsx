import { ReactComponent as MinusLogo } from '../../assets/minus.svg';
import { ReactComponent as AddLogo } from '../../assets/add.svg';

import styled from '@emotion/styled';
import { InputHTMLAttributes, useState } from 'react';
import { Button } from './Button';

const StyledInput = styled.input`
    font-size: 1rem;

    &[type='number'] {
        border: none;

        /* Remove default spinner */
        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &:focus {
        }
    }
`;

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useState(+(props.value ?? 0));

    if (props.type !== 'number') return <StyledInput {...props} />;

    return (
        <span
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                border: '1px solid black',
                borderRadius: '10rem',
                padding: '6px',
            }}
        >
            <Button
                invisible
                type="button"
                style={{ width: '20%' }}
                onClick={() => setValue(Math.max(value - 1, +(props.min ?? -Infinity)))}
            >
                <MinusLogo style={{ aspectRatio: 1 }} />
            </Button>

            <StyledInput {...props} value={value} style={{ width: '50%' }} />

            <Button
                invisible
                type="button"
                style={{ width: '20%' }}
                onClick={() => setValue(Math.min(value + 1, +(props.max ?? Infinity)))}
            >
                <AddLogo style={{ aspectRatio: 1 }} />
            </Button>
        </span>
    );
}
