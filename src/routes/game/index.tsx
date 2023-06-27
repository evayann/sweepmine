import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Game } from "~/components/game";

export default component$(() => {
  return (
    <>
      <p> Test </p>
      <div style="width: 100vh; height: 40vh;">
        <Game/>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Game of MineSweeper",
  meta: [
    {
      name: "description",
      content: "Time to play to minesweeper game",
    },
  ],
};

