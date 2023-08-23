import { ChangeEvent, Fragment } from 'react';

import './RadioButton.css';

export interface RadioButtonProps {
    id: string;
    list: string[];
    onChange?: (newSelected: any) => void;
    defaultSelected?: string;
}

export function RadioButton({ id, list, onChange, defaultSelected }: RadioButtonProps) {
    return (
        <div id="radio-button">
            {list.map((item, index) => {
                const key = `radio-select-${id}-${item}-${index}`;
                return (
                    <Fragment key={key}>
                        <input
                            type="radio"
                            id={key}
                            name={`radio-${id}`}
                            value={item}
                            defaultChecked={defaultSelected === item}
                            {...(onChange
                                ? {
                                      onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                          e.stopPropagation();
                                          onChange(item);
                                      },
                                  }
                                : {})}
                        />
                        <label htmlFor={key} style={{ textAlign: 'center' }}>
                            {item}
                        </label>
                    </Fragment>
                );
            })}
        </div>
    );
}
