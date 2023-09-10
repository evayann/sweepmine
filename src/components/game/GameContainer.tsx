import { GlobalHud } from './hud/GlobalHud';
import { Board } from './board/Board';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useGame } from '../../hooks/useGame';

export interface GameContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function GameContainer({ style, ...otherProps }: GameContainerProps) {
    const { gameStateService, gameInformationService } = useGame();
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
            {displayGame && <Board dimension={gameInformationService.dimension} numberOfBombs={40} />}
            <GlobalHud />
        </div>
    );
}
