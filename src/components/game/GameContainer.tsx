import { GlobalHud } from './hud/GlobalHud';
import { Board } from './board/Board';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useGame } from '../../hooks/useGame';

export interface GameContainerProps extends HTMLAttributes<HTMLDivElement> {
    dimension: { x: number; y: number };
    numberOfBombs: number;
}

export function GameContainer({ dimension, numberOfBombs, style, ...otherProps }: GameContainerProps) {
    const { gameStateService } = useGame();
    const [displayGame, setDisplayGame] = useState(() => false);

    useEffect(() => {
        const game = gameStateService.isInGame || gameStateService.isGameOver;
        setDisplayGame(game);
    }, [gameStateService.isInGame, gameStateService.isGameOver]);

    return (
        <div
            {...otherProps}
            style={{
                ...style,
                display: 'grid',
                gridTemplateRows: '1fr',
                gridTemplateColumns: '1fr',
            }}
        >
            {displayGame && <Board dimension={dimension} numberOfBombs={numberOfBombs} />}
            <GlobalHud />
        </div>
    );
}
