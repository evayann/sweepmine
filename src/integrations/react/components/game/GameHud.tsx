/** @jsxImportSource react */

import { useGameState } from '../../hooks/useGameState';
import { HudRoot } from '../dumb/hud/HudRoot';
import { EndGameHud } from './hud/EndGame';
import { MenuHud } from './hud/MenuHud';

export function GameHud() {
    const { gameStateService } = useGameState();
    console.log(gameStateService.isInMenu());
    return (
        <HudRoot>
            {gameStateService.isInMenu() && <MenuHud />}
            {gameStateService.isInGame() && <GameHud />}
            {gameStateService.isGameOver() && <EndGameHud />}
        </HudRoot>
    );
}
