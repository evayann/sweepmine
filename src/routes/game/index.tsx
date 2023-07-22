import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import GameMenu from '~/components/dumb/form/game-menu';
import { useDimensions } from '~/hooks/useDimsension';

import { MinesweeperBoard } from '~/integrations/react/components/board';

export default component$(() => {
    const { dimension, setDimension } = useDimensions();
    const numberOfBombs = useSignal(10);
    return (
        <>
            <GameMenu dimension={dimension.value} setDimension={setDimension} numberOfBombs={numberOfBombs}></GameMenu>
            <MinesweeperBoard dimension={dimension.value} numberOfBombs={numberOfBombs.value} client:visible />
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
