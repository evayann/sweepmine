import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Infobox from "~/components/starter/infobox/infobox";

export default component$(() => {
  return (
    <>
      <Infobox>
        <div q:slot="title" class="icon icon-apps">
          Example Apps Lol
        </div>
        <p>
          Have a look at the <a href="/demo/flower">Flower App</a> or the{" "}
          <a href="/demo/todolist">Todo App</a>.
        </p>
      </Infobox>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rules of MineSweeper",
  meta: [
    {
      name: "description",
      content: "List of all rules for the minesweeper game",
    },
  ],
};
