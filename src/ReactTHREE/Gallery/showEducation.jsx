import { useState, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const EducationPanel = () => {
    const educationTexture = useLoader(THREE.TextureLoader, "/textures/education.png");
    const techTexture = useLoader(THREE.TextureLoader, "/textures/techIcons.png");
    const workTexture = useLoader(THREE.TextureLoader, "/textures/workexperience.png");
    const meshRef1 = useRef();
    const meshRef2 = useRef();
    const meshRef3 = useRef();//invis panel

    const refArray = [meshRef2, meshRef3, meshRef1,];
    // const texrefArray = [textRef1, textRef2, textRef3];
    const offset = [0.1, 0.1, -0.2];
    const numberofPanels = 3;
    // Move the plane down when clicked
    useFrame(() => {
        refArray.map((ref, index) => {
            if (ref.current) {

                //move previous panel at the back
                if (0 == index) {
                    ref.current.position.x = offset[0] * (numberofPanels + 1);
                    ref.current.position.y = offset[1] * (numberofPanels + 1);
                    ref.current.position.z = offset[2] * (numberofPanels + 1);
                    if (ref.current.material.opacity < 1) {
                        ref.current.material.opacity += 0.01
                    }
                }

                // Move panel down 
                if (1 == index) {
                    if (ref.current.position.y > -2 + 0.02) {
                        ref.current.position.y -= 0.02;
                        if (ref.current.material.opacity > 0) {
                            ref.current.material.opacity -= 0.02;
                            // if (texrefArray[index].current) {
                            //     // texrefArray[index].current.material.opacity -= 0.02;
                            // }
                        }

                    }
                }
                // Move all other panels forward
                if (1 < index) {
                    if (ref.current.position.x > offset[0] * (index - 1) + 0.005) {
                        ref.current.position.x -= 0.005;
                    }
                    if (ref.current.position.y > offset[1] * (index - 1) + 0.005) {
                        ref.current.position.y -= 0.005;
                    }
                    if (ref.current.position.z < offset[2] * (index - 1) + 0.005) {
                        ref.current.position.z += 0.005;
                    }
                }
            }
        });




    });

    const handleClick = () => {
        // setCurrentPanel((currnetPanel + 1) % (numberofPanels));
        if (handleClick.lastClick === undefined || (Date.now() - handleClick.lastClick) > 1000) {
            handleClick.lastClick = Date.now();
        } else {
            return;
        }
        refArray.push(refArray.shift())

    };

    return (
        <>
            <group position={[0, 0, -0.5]} onClick={handleClick}
                onPointerOver={(e) => {
                    document.body.style.cursor = 'pointer';

                }}
                onPointerOut={(e) => {
                    document.body.style.cursor = 'auto';

                }}>
                {/* Current Plane */}
                <mesh ref={meshRef1} position={[0, 0, 0]}  >
                    <planeGeometry args={[2, 2]} />
                    <meshBasicMaterial map={educationTexture} opacity={1} transparent side={2} />
                    {/* <Text ref={textRef1} color="black" anchorX="center" anchorY="middle" scale={0.1} position={[0, 0, 0.1]} opacity={1}>
                        Bachelor of Software Engineering, Ben-Gurion University of the Negev (BGU)
                        Oct 2017 - Sep 2022
                    </Text> */}
                </mesh>

                {/* New Plane coming from behind */}
                <mesh ref={meshRef2} position={[offset[0] * 1, offset[1] * 1, offset[2] * 1]}>
                    <planeGeometry args={[2, 2]} />
                    <meshBasicMaterial map={techTexture} opacity={1} transparent side={2} />

                </mesh>
                <mesh ref={meshRef3} position={[0, -2 - 0.02, 0]} >
                    <planeGeometry args={[2, 2]} />
                    <meshBasicMaterial map={workTexture} opacity={0} transparent side={2} />

                </mesh>
            </group>
        </>
    );
};