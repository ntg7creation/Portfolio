import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo } from "react";

const pathTexture = "../public/textures/waternormals.jpg";
export function Path({ points, color = 0xff0000 }) {
  const edgePoints = points;
  const texture = useLoader(THREE.TextureLoader, pathTexture);

  // const material = new THREE.LineBasicMaterial({ color, map: texture });
  // const geometry = new THREE.BufferGeometry();
  // geometry.setFromPoints(edgePoints);
  const material = useMemo(() => (
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, map: texture, transparent: true, opacity: 0.5, })
  ), []);

  const geometry = useMemo(() => (
    new THREE.CircleGeometry(0.1, 20)
  ))

  const pointsdistance = 0.1;
  return (
    <group>
      <line>
        {edgePoints.map((p, index) => (
          <Float
            speed={2} // Animation speed, defaults to 1
            rotationIntensity={0} // XYZ rotation intensity, defaults to 1
            floatIntensity={.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            key={index}
          >
            <mesh material={material} geometry={geometry} position={[p.x, 0, p.y]} rotation-x={-Math.PI / 2}>
            </mesh>
          </Float>
        ))}
        {/* <lineBasicMaterial color={color} /> */}
      </line>
    </group>
  );
}

