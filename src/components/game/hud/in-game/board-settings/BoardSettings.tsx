import { ReactComponent as BombLogo } from '../../../../../assets/bomb.svg';
import { ReactComponent as SettingsLogo } from '../../../../../assets/settings.svg';
import { useCloseOutsideRef } from '../../../../../hooks/game/useFocus';
import { Button, Input } from '../../../../dumb';

import { useRef } from 'react';

import './BoardSettings.css';

export interface BoardSettingsProps {
    width: number;
    height: number;
    updateDimension: (dimension: { x: number; y: number }) => void;
}

export function BoardSettings({ width, height, updateDimension }: BoardSettingsProps) {
    const settingsMenuRef = useRef(null);
    const [isSettingsMenuOpen, open] = useCloseOutsideRef(settingsMenuRef);

    return (
        <div style={{ position: 'relative' }}>
            <Button invisible className="settings" onClick={open}>
                <SettingsLogo />
            </Button>

            {isSettingsMenuOpen && (
                <form
                    ref={settingsMenuRef}
                    className="board-dimension"
                    onSubmit={(e) => {
                        e.preventDefault();

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
                        <Input type="number" name="dimension-x" value={width} />
                        <Input type="number" name="dimension-y" value={height} />
                    </div>

                    <div className="board-bomb">
                        <BombLogo className="logo" />
                        <Input type="number" name="nb-bomb" />
                    </div>

                    <Button type="submit"> Update </Button>
                </form>
            )}
        </div>
    );
}
