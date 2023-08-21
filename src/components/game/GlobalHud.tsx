import { AnimatePresence } from 'framer-motion';
import { useGameState } from '../../hooks/useGameState';
import { EndGameHud, GameHud, MenuHud } from './hud';

export function GlobalHud() {
    const {
        gameStateService: { isInMenu, isInGame, isGameOver },
    } = useGameState();

    return (
        <AnimatePresence>
            {isInMenu && <MenuHud />}
            {isInGame && <GameHud />}
            {isGameOver && <EndGameHud />}
        </AnimatePresence>
    );
}
