import { Header } from '../components/dumb/header/Header';
import { Game } from '../components/game/Game';

import './GamePage.css';

export function GamePage() {
    return (
        <div id="game-page">
            <Header />
            <Game id="game" />
        </div>
    );
}
