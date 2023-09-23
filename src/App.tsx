import './App.css';
import { useTheme } from './hooks/useTheme';
import { GamePage } from './pages/GamePage';
import './themes/main.css';

function App() {
    const { themeName } = useTheme();
    return (
        <div className={`app ${themeName}`}>
            <GamePage></GamePage>
        </div>
    );
}

export default App;
