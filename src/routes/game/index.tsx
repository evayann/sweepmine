import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { MineSweeper } from '~/components/game/mine-sweeper';

export default component$(() => {
    return (
        <>
            <div style="width: 100vh; height: 60vh;">
                <MineSweeper />
            </div>
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
