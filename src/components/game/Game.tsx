import { HTMLAttributes } from 'react';
import { GameProvider } from '../../contexts/gameContext';
import { GameContainer } from './GameContainer';

export interface GameProps extends HTMLAttributes<HTMLDivElement> {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

export function Game(gameProps: GameProps) {
    return (
        <GameProvider>
            <GameContainer {...gameProps} />
        </GameProvider>
    );
}
