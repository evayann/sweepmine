import { useContext } from "react";
import { GameContext } from "../context/gameContext";

export const useGameState = () => useContext(GameContext);