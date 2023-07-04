/** @jsxImportSource react */

import { GroupProps } from "@react-three/fiber";
import { useState } from "react";

export interface CaseProps extends GroupProps {
  contentWhenDiscover: unknown;
}

export function Case(props: CaseProps) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <group
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        click(!clicked);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        hover(true);
      }}
      onPointerOut={() => hover(false)}
    >
      <mesh>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshBasicMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshBasicMaterial color={hovered ? "red" : "green"} />
      </mesh>
    </group>
  );
}
