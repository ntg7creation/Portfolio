
import { useRef } from 'react';
import { Text, Html } from '@react-three/drei';

export const HelloPlane = () => {


    return (
        <mesh  >
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial color="red" opacity={0.0} transparent side={2} />
            <Text color="black" anchorX="center" anchorY="middle" scale={0.2} position={[0, 0.3, 0.1]}>
                Welcome to my Protfolio !
            </Text>
            <Text color="black" anchorX="center" anchorY="middle" scale={0.2} position={[0, 0, 0.1]}>
                mouse-scroll to move the camera
            </Text>
            <Html

                occlude
                style={{ maxWidth: '380px' }}
                position={[-0.2, -0.5, 0.2]} transform wrapperClass="my-custom-wrapper" scale={[0.5, 0.5, 0.5]} >
                <div className="scroll-downs">
                    <div className="mousey">
                        <div className="scroller"></div>
                    </div>
                </div>
            </Html>
        </mesh>
    );
};

