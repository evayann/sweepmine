import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import GameMenu from '~/components/dumb/form/game-menu';
import { useDimensions } from '~/hooks/useDimsension';

import { MinesweeperBoard } from '~/integrations/react/components/board';

export default component$(() => {
    const { dimension, setDimension } = useDimensions();
    const numberOfBombs = 14;
    return (
        <>
            <GameMenu dimension={dimension.value} setDimension={setDimension}></GameMenu>
            <MinesweeperBoard dimension={dimension.value} numberOfBombs={numberOfBombs} client:visible />
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
