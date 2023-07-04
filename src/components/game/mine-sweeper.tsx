/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { CameraControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Case } from "./case";

const range = (nb: number) => [...Array(nb).keys()];
const nbBox = 10;
const boxPositionList = range(nbBox * nbBox).map((i) => [
  Math.floor(i / nbBox) - nbBox / 2,
  0,
  (i % nbBox) - nbBox / 2,
]);

export function ThreeJSReact() {
  // const [lightPosition, setLightPosition] = useState([10, 10, 10]);
  // useFrame(({ clock }) => setLightPosition([10, 10, 10]));

  return (
    <Canvas orthographic>
      <CameraControls />
      <OrthographicCamera
        makeDefault
        zoom={1}
        top={7}
        bottom={-7}
        left={7}
        right={-7}
        near={5}
        far={200}
        position={[10, 5, 10]}
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxPositionList.map((position, index) => (
        <Case position={position} key={`Box-${index}`} />
      ))}
    </Canvas>
  );
}

export const MineSweeper = /*#__PURE__*/ qwikify$(ThreeJSReact, {
  eagerness: "visible",
  tagName: "game",
});
