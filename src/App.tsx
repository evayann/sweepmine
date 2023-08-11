import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Minesweeper } from './components/MineSweeper';

function App() {
    return (
        <div className="App">
            <Minesweeper dimension={{ x: 5, y: 5 }} numberOfBombs={15} />
        </div>
    );
}

export default App;
