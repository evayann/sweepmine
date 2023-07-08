import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Button, Title } from '~/components/dumb/styled';

import { MinesweeperBoard } from '~/integrations/react/components/board';

export default component$(() => {
    const dimension = { x: 3, y: 3 };
    const numberOfBombs = 5;
    return (
        <>
            <div q:slot="menu" style={{ display: 'flex', flexDirection: 'column' }}>
                <Title> Ellapsed Time </Title>
                <p> 0 </p>
                <Title> Dimension </Title>
                <p> 0 </p>
                <Button> Load game with new configuration </Button>
            </div>
            <MinesweeperBoard dimension={dimension} numberOfBombs={numberOfBombs} />
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
