import { AnimatePresence } from 'framer-motion';
import { useGame } from '../../../hooks/useGame';
import { EndGameHud } from './EndGameHud';
import { GameHud } from './GameHud';
import { MenuHud } from './MenuHud';

export function GlobalHud() {
    const {
        gameStateService: { isInMenu, isInGame, isGameOver },
    } = useGame();

    return (
        <AnimatePresence>
            {isInMenu && <MenuHud />}
            {isInGame && <GameHud />}
            {isGameOver && <EndGameHud />}
        </AnimatePresence>
    );
}
