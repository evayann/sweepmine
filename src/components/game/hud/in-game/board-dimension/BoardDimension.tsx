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
    const xInput = useRef<HTMLInputElement>(null);
    const yInput = useRef<HTMLInputElement>(null);

    const settingsMenuRef = useRef(null);
    const [isSettingsMenuOpen, open] = useCloseOutsideRef(settingsMenuRef);

    return (
        <>
            <Button invisible className="settings" onClick={open}>
                <SettingsLogo width="32px" height="32px" />
            </Button>
            {isSettingsMenuOpen && (
                <div ref={settingsMenuRef} className="board-dimension">
                    <div className="board-dimension-inputs">
                        <input
                            ref={xInput}
                            type="number"
                            value={width}
                            onChange={(newX: ChangeEvent<HTMLInputElement>) =>
                                updateDimension({ x: +newX.target.value, y: +(yInput.current?.value ?? height) })
                            }
                        />
                        <input
                            ref={yInput}
                            type="number"
                            value={height}
                            onChange={(newY: ChangeEvent<HTMLInputElement>) =>
                                updateDimension({ x: +(xInput.current?.value ?? width), y: +newY.target.value })
                            }
                        />
                    </div>
                    <div className="board-bomb">
                        <BombLogo className="logo" />
                        <input type="number" value={10} />
                    </div>
                    <Input type="number" />
                    <Button> Update </Button>
                </div>
            )}
        </>
    );
}
