import { ReactComponent as BombLogo } from '../../../../../assets/bomb.svg';
import { ReactComponent as SettingsLogo } from '../../../../../assets/settings.svg';
import { useCloseOutsideRef } from '../../../../../hooks/game/useFocus';

import { ChangeEvent, useRef } from 'react';
import { Button, Input } from '../../../../dumb';

import './BoardDimension.css';

export interface BoardDimensionProps {
    width: number;
    height: number;
    updateDimension: (dimension: { x: number; y: number }) => void;
}

export function BoardDimension({ width, height, updateDimension }: BoardDimensionProps) {
    const settingsMenuRef = useRef(null);
    const [isSettingsMenuOpen, open] = useCloseOutsideRef(settingsMenuRef);

    return (
        <>
            <Button invisible className="settings" onClick={open}>
                <SettingsLogo width="32px" height="32px" />
            </Button>

            {isSettingsMenuOpen && (
                <form
                    ref={settingsMenuRef}
                    className="board-dimension"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target);
                        const getValue = (name: string): any => e.currentTarget[name]?.value;

                        const dimension = {
                            x: getValue('dimension-x'),
                            y: getValue('dimension-y'),
                        };

                        updateDimension(dimension);
                    }}
                >
                    <div className="board-dimension-inputs">
                        <p> Dimension </p>
                        <Input type="number" name="dimension-x" defaultValue={width} />
                        <Input type="number" name="dimension-y " defaultValue={height} />
                    </div>

                    <div className="board-bomb">
                        <BombLogo className="logo" />
                        <Input type="number" name="nb-bomb" />
                    </div>

                    <Button type="submit"> Update </Button>
                </form>
            )}
        </>
    );
}
