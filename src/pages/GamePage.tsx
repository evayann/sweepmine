import { Game } from '../components/game/Game';

export function GamePage() {
    return <Game dimension={{ x: 5, y: 10 }} numberOfBombs={30} />;
}
