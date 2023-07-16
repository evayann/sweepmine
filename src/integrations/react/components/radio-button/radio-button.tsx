/** @jsxImportSource react */

import { Fragment } from 'react';
import './radio-button.css';

export interface RadioButtonProps {
    id: string;
    list: string[];
    defaultSelected?: string;
}

export function RadioButton({ id, list, defaultSelected }: RadioButtonProps) {
    return (
        <div id="radio-button">
            {list.map((item, index) => (
                <Fragment key={`${id}-${item}-${index}`}>
                    <input
                        type="radio"
                        id={`radio-${item}-${index}`}
                        name={`radio-${id}`}
                        value={item}
                        defaultChecked={defaultSelected === item}
                    />
                    <label htmlFor={`radio-${item}-${index}`} style={{ textAlign: 'center' }}>
                        {item}
                    </label>
                </Fragment>
            ))}
        </div>
    );
}
