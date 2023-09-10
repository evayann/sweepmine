import { ChangeEvent, useRef } from 'react';
import { Button } from '../../../../dumb';

import './BoardDimension.css';

export interface BoardDimensionProps {
    width: number;
    height: number;
    updateDimension: (dimension: { x: number; y: number }) => void;
}

export function BoardDimension({ width, height, updateDimension }: BoardDimensionProps) {
    const xInput = useRef<HTMLInputElement>(null);
    const yInput = useRef<HTMLInputElement>(null);

    return (
        <div className="board-dimension">
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
            <Button> Update </Button>
        </div>
    );
}
