import { component$, Slot, useStyles$ } from '@builder.io/qwik';

import Header from '~/components/starter/header/header';

import globalStyles from '../styles.css?inline';
import gameStyles from './styles.css?inline';

export default component$(() => {
    useStyles$(globalStyles);
    useStyles$(gameStyles);

    return (
        <>
            <Header style={{ '--padding': 0 }} />
            <main>
                <Slot name="menu" />
                <Slot />
            </main>
        </>
    );
});
