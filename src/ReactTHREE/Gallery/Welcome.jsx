
import { useRef } from 'react';
import { Text } from '@react-three/drei';

export const HelloPlane = () => {


    return (
        <mesh  >
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial color="white" opacity={0.0} transparent side={2} />
            <Text color="black" anchorX="center" anchorY="middle" scale={0.2} position={[0, 0, 0.1]}>
                Welcome to my Protfolio !
            </Text>

        </mesh>
    );
};

