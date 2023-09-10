import { HTMLAttributes } from 'react';
import { GameProvider } from '../../contexts/gameContext';
import { GameContainer } from './GameContainer';

export interface GameProps extends HTMLAttributes<HTMLDivElement> {}

export function Game(gameProps: GameProps) {
    return (
        <GameProvider>
            <GameContainer {...gameProps} />
        </GameProvider>
    );
}
