import { CanvasProps } from '@react-three/fiber';
import { GameProvider } from '../contexts/gameContext';
import { GlobalHud } from './game/GlobalHud';
import { Game } from './game/Game';
import { HTMLAttributes } from 'react';

export interface MineSweeperProps extends HTMLAttributes<HTMLDivElement> {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

export function Minesweeper({ dimension, numberOfBombs, style, ...otherProps }: MineSweeperProps) {
    return (
        <GameProvider>
            <div
                {...otherProps}
                style={{ ...style, display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr' }}
            >
                <Game dimension={dimension} numberOfBombs={numberOfBombs} />
                <GlobalHud />
            </div>
        </GameProvider>
    );
}
