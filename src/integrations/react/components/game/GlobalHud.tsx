/** @jsxImportSource react */

import { useGameState } from '../../hooks/useGameState';
import { HudRoot } from '../dumb/hud/HudRoot';
import { EndGameHud } from './hud/EndGame';
import { GameHud } from './hud/GameHud';
import { MenuHud } from './hud/MenuHud';

export function GlobalHud() {
    const {
        gameStateService: { isInMenu, isInGame, isGameOver },
    } = useGameState();

    return (
        <HudRoot>
            {isInMenu() && <MenuHud />}
            {isInGame() && <GameHud />}
            {isGameOver() && <EndGameHud />}
        </HudRoot>
    );
}
