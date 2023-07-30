
/** @jsxImportSource react */

import { createContext } from "react";
import { CursorService } from "./services/cursorService";

export const GameContext = createContext({
    cursorService: new CursorService()
});
export const GameProvider = GameContext.Provider;