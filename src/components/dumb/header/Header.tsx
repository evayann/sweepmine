import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { useTheme } from '../../../hooks/useTheme';
import { Button } from '../Button';

import './Header.css';

export function Header() {
    const { switchTheme } = useTheme();
    return (
        <nav>
            <ul>
                <li id="logo-container">
                    <a href="/">
                        <Logo id="logo" />
                    </a>
                </li>

                <li>
                    <Button onClick={switchTheme}> Switch Theme </Button>
                </li>
                <li>
                    <a href="/Game"> Game </a>
                </li>
                <li>
                    <a href="/About"> About </a>
                </li>
            </ul>
        </nav>
    );
}
