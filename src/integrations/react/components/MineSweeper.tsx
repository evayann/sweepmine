/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react';
import { CanvasProps } from '@react-three/fiber';
import { GameProvider } from '../context/gameContext';
import { GlobalHud } from './game/GlobalHud';
import { Game } from './game/Game';

export interface MineSweeperProps extends CanvasProps {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

export function ReactMineSweeper({ dimension, numberOfBombs, style, ...otherProps }: MineSweeperProps) {
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

export const Minesweeper = qwikify$(ReactMineSweeper, {
    eagerness: 'visible',
    tagName: 'game',
});
