import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import GameMenu from '~/components/dumb/form/game-menu';
import { useDimensions } from '~/hooks/useDimsension';

import { Minesweeper } from '~/integrations/react/components/MineSweeper';

export default component$(() => {
    const { dimension, setDimension } = useDimensions();
    const numberOfBombs = useSignal(10);
    return (
        <>
            <GameMenu dimension={dimension.value} setDimension={setDimension} numberOfBombs={numberOfBombs}></GameMenu>
            <Minesweeper
                style={{ width: '70vw', height: '100%' }}
                dimension={dimension.value}
                numberOfBombs={numberOfBombs.value}
                client:visible
            />
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
