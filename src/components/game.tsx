/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from "react";

const range = (nb: number) => [...Array(nb).keys()];
const boxPositionList = range(10 * 10).map(i => [Math.floor(i / 10), i % 10, 0]);

export function ThreeJSReact() {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            { boxPositionList.map(position => <Box position={position}> </Box>) }
        </Canvas>
    );
}
  
function Box(props: any) {
    const ref = useRef<any>();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    useFrame(() => (ref.current.rotation.x += 0.01));
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={() => click(!clicked)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    );
}

export const Game = /*#__PURE__*/ qwikify$(ThreeJSReact, {
  eagerness: 'visible',
  tagName: 'game'
});