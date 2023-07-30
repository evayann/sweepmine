import { HTMLAttributes, Signal, component$, useStylesScoped$ } from '@builder.io/qwik';
import { MineSweeperLogo } from '../icons/minesweeper';
import { useScrollPositionPercent } from '~/hooks/useScroll';
import { map } from '~/utils/calculations';
import styles from './header.css?inline';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export default component$(({ style = {} }: HeaderProps) => {
    useStylesScoped$(styles);
    const scroll: Readonly<Signal<number>> = useScrollPositionPercent();

    return (
        <header style={style}>
            <div style={{ padding: `${map(scroll.value, 0, 0.1, 2, 1, true)}rem` }}>
                <a href="/" title="minesweeper">
                    <MineSweeperLogo height={100} width={100} />
                </a>
                <ul>
                    <li>
                        <a href="/rules">Rules</a>
                    </li>
                    <li>
                        <a href="/game">Game</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </div>
        </header>
    );
});
