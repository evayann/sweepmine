import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import GameMenu from '~/components/dumb/form/game-menu';
import { Button, Title } from '~/components/dumb/styled';
import { useDimensions } from '~/hooks/useDimsension';

import { MinesweeperBoard } from '~/integrations/react/components/board';

export default component$(() => {
    const { dimension } = useDimensions();
    const numberOfBombs = 5;
    return (
        <>
            <GameMenu></GameMenu>
            <MinesweeperBoard dimension={dimension.value} numberOfBombs={numberOfBombs} />
        </>
    );
});

export const head: DocumentHead = {
    title: 'Game of MineSweeper',
    meta: [
        {
            name: 'description',
            content: 'Time to play to minesweeper game',
        },
    ],
};
