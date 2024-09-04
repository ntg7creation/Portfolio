import React, { useRef, useMemo } from "react";
import { useFrame, extend, useLoader } from "@react-three/fiber";
import { Water } from "three/examples/jsm/objects/Water";
import * as THREE from "three"; // Import everything from THREE

const waterNormals = "../public/textures/waternormals.jpg"; // Path to your water normals texture
const waterTextrue = "../public/textures/src/textures/rough-sea-1024x1024.png";
extend({ Water });

export function WaterComponent() {
  const ref = useRef();

  // Use THREE.TextureLoader to load the texture
  const waterNormalsTexture = useLoader(THREE.TextureLoader, waterNormals);
  waterNormalsTexture.wrapS = THREE.RepeatWrapping;
  waterNormalsTexture.wrapT = THREE.RepeatWrapping;
  const waterOptions = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormalsTexture,
      sunDirection: new THREE.Vector3(1, 1, 0),
      sunColor: 0x3377cc,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
    }),
    [waterNormalsTexture]
  );

  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta / 2;
  });

  return (
    <water
      ref={ref}
      args={[new THREE.PlaneGeometry(100, 100), waterOptions]}
      rotation-x={-Math.PI / 2}
      position={[0, -4, 0]}
    />
  );
}
