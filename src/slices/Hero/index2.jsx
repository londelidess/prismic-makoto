"use client";

import {
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { Model } from "./Model";

export const index2 = () => {
  return (
    <>
      <Environment preset="sunset" />
      <group position-y={-0.7}>
        <ContactShadows
          opacity={0.42}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        <Model />
      </group>
    </>
  );
};
