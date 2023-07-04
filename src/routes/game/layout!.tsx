import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import Header from "~/components/starter/header/header";

import styles from "../styles.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <Header style={{ "--padding": 0 }} />
      <main>
        <Slot />
      </main>
    </>
  );
});
