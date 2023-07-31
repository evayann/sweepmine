
/** @jsxImportSource react */

import { createContext } from "react";
import { CursorService } from "./services/cursorService";
import { GameStateService } from "./services/gameStateService";

export const GameContext = createContext<{ cursorService: CursorService, gameStateService: GameStateService }>({
    gameStateService: new GameStateService(),
    cursorService: new CursorService()
});
export const GameProvider = GameContext.Provider;