import { ReactComponent as Logo } from '../../../assets/logo.svg';

import './Header.css';

export function Header() {
    return (
        <nav>
            <ul>
                <li id="logo-container">
                    <a href="/">
                        <Logo id="logo" />
                    </a>
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
