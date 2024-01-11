"use client";

import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
// import { useFrame} from "@react-three/fiber";
import React, { useState, useRef, useEffect } from 'react';
// import * as THREE from "three";

useGLTF.preload("models/6546e0fc444d953355fd7844.glb");

export function Model() {
  const [animationState, setAnimationState] = useState('Gesturing');
  // const animations = ['Gesturing','Typing'];

  const group = useRef();
  const { nodes, materials } = useGLTF("models/6546e0fc444d953355fd7844.glb") ;

  const { animations: gesturingAnimation } = useFBX(
    "animations/Arm Gesture.fbx"
  );
  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");

  gesturingAnimation[0].name = "Gesturing";
  typingAnimation[0].name = "Typing";

  const { actions } = useAnimations(
    [gesturingAnimation[0], typingAnimation[0],],
    group
  );



  const updateAnimationForWindowSize = () => {
    const width = window.innerWidth;
    const newAnimationState = width >= 768 ? 'Gesturing' : 'Typing';
    setAnimationState(newAnimationState);
  };

  // useFrame((state) => {
  //   if (animationState === "Gesturing") {
  //     group.current.getObjectByName("Spine2").lookAt(state.camera.position);
  //   }
  //   if (animationState === "Typing") {
  //     const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
  //     group.current.getObjectByName("Spine2").lookAt(target);
  //   }
  // });

  useEffect(() => {
    actions[animationState]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animationState]?.reset().fadeOut(0.5);
    };
  }, [actions, animationState]);

  useEffect(() => {
    updateAnimationForWindowSize();

    window.addEventListener('resize', updateAnimationForWindowSize);

    return () => window.removeEventListener('resize', updateAnimationForWindowSize);
  }, []);

  return (
    <group ref={group} dispose={null}>
      <group rotation-x={-Math.PI / 2}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        morphTargetDictionary={
          nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary
        }
        morphTargetInfluences={
          nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences
        }
      />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
      />
    </group>
    </group>
  );
}
