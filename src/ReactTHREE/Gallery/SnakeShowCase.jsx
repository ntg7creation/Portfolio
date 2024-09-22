import { useState, useRef, useEffect } from 'react';
import { Screen } from '../TV.jsx';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

export const SnakeShowPanel = () => {
    const { camera } = useThree();

    const [pointer, setPointer] = useState(0);
    const [lastClick, setLastClick] = useState(undefined);
    // let pointer = 0;
    const [link, setLink] = useState('Video/snake_top.mp4');
    const vidoe1link = 'Video/snake_top.mp4';
    const vidoe2link = 'Video/snake_side.mp4';
    const vidoe3link = 'Video/waterwave1.mp4';
    const vidoe4link = 'Video/waterwave2.mp4';
    const vidoe5link = 'Video/vidoe3.mp4';
    const texture1 = useLoader(THREE.TextureLoader, "textures/snake1.png");
    const texture2 = useLoader(THREE.TextureLoader, "textures/snake2.png");
    const texture3 = useLoader(THREE.TextureLoader, "textures/snake3.png");
    const texture4 = useLoader(THREE.TextureLoader, "textures/snake4.png");
    const meshRef1 = useRef();
    const meshRef2 = useRef();
    const meshRef3 = useRef();//invis panel
    const meshRef4 = useRef();
    const meshRef5 = useRef();
    // const htmlRef1 = useRef();
    // const htmlRef2 = useRef();
    // const htmlRef3 = useRef();
    // const paragraphRef1 = useRef();
    // const paragraphRef2 = useRef();
    // const paragraphRef3 = useRef();
    const screenRef = useRef();
    const refArray = [meshRef1, meshRef2, meshRef3, meshRef4, meshRef5];
    // const htmlRefArray = [htmlRef2, htmlRef3, htmlRef1];
    // const paragraphArray = [paragraphRef1, paragraphRef2, paragraphRef3];
    // const opacityArray = [textOopacity1, textOopacity2, textOopacity3];
    // const opacitySetArray = [setTextOpacity1, setTextOpacity2, setTextOpacity3];
    const vidoeArray = [vidoe1link, vidoe2link, vidoe3link, vidoe4link, vidoe5link];
    // const texrefArray = [textRef1, textRef2, textRef3];
    const offset = [0.1, 0.1, -0.2];
    const numberofPanels = 4;

    // useEffect(() => {
    //     console.log(meshRef1.current)
    // }, [])

    // Move the plane down when clicked
    useFrame(() => {
        // console.log(pointer);
        refArray.map((ref, index) => {
            if (ref.current) {
                //move inviable panel at the back
                if (pointer == (index + 2) % numberofPanels) {
                    ref.current.position.x = offset[0] * (numberofPanels + 1);
                    ref.current.position.y = offset[1] * (numberofPanels + 1);
                    ref.current.position.z = offset[2] * (numberofPanels + 1);
                    if (ref.current.material.opacity < 1) {
                        ref.current.material.opacity += 0.01

                        // htmlRefArray[index].current.style.opacity += 0.01

                    }

                } else if (pointer == (index + 1) % numberofPanels) { // make the current panel move down and invisible
                    if (ref.current.position.y > -2 + 0.02) {
                        ref.current.position.y -= 0.02;
                        if (ref.current.material.opacity > 0) {
                            ref.current.material.opacity -= 0.02;
                            // htmlRefArray[index].current.style.opacity -= 0.02

                        }

                    }
                }
                else {
                    if (ref.current.position.x > offset[0] * ((numberofPanels + index - pointer) % numberofPanels) + 0.005) {
                        ref.current.position.x -= 0.005;
                    }
                    if (ref.current.position.y > offset[1] * ((numberofPanels + index - pointer) % numberofPanels) + 0.005) {
                        ref.current.position.y -= 0.005;
                    }
                    if (ref.current.position.z < offset[2] * ((numberofPanels + index - pointer) % numberofPanels) + 0.005) {
                        ref.current.position.z += 0.005;
                    }
                }
            }
        });


    });

    useEffect(() => {
        setLink(vidoeArray[pointer]);
    }, [pointer]);

    const handleClickSnakePanel = (props) => {

        if (lastClick === undefined || (Date.now() - lastClick) > 1000) {

            // handleClickSnakePanel.lastClick = Date.now();
            setLastClick(Date.now());
        } else {
            return;
        }
        // console.log("click3", (handleClick.lastClick));
        setPointer((pointer + 1) % (numberofPanels));
    };

    return (
        <>
            <group position={[-1, 0, -0.5]} style={{ position: 'fixed' }}
                onPointerOver={(e) => {
                    document.body.style.cursor = 'pointer';

                }}
                onPointerOut={(e) => {
                    document.body.style.cursor = 'auto';

                }} >

                <group onClick={handleClickSnakePanel} ref={screenRef} position={[-2.4, 0, 0]} rotation={[0, 0, 0]}>
                    <Screen src={link} width={1.8} />
                </group>
                {/* <directionalLight position={[1, 1, 1]} intensity={1} /> */}
                <group position={[0.6, 0, 0]} >
                    <mesh ref={meshRef1} position={[0, 0, 0]} onClick={handleClickSnakePanel}   >

                        <planeGeometry args={[2, 2]} />
                        <meshBasicMaterial opacity={1} transparent side={2} map={texture1} />
                    </mesh>

                    {/* New Plane coming from behind */}
                    <mesh ref={meshRef2} position={[offset[0] * 1, offset[1] * 1, offset[2] * 1]} onClick={handleClickSnakePanel} >
                        <planeGeometry args={[2, 2]} />
                        <meshBasicMaterial opacity={1} transparent side={2} map={texture2} />

                    </mesh>

                    <mesh ref={meshRef3} position={[offset[0] * 2, offset[1] * 2, offset[2] * 2]} onClick={handleClickSnakePanel}  >

                        <planeGeometry args={[2, 2]} />
                        <meshBasicMaterial opacity={1} transparent side={2} map={texture3} />

                    </mesh>
                    <mesh ref={meshRef4} position={[offset[0] * 3, offset[1] * 3, offset[2] * 3]} onClick={handleClickSnakePanel}  >

                        <planeGeometry args={[2, 2]} />
                        <meshBasicMaterial opacity={1} transparent side={2} map={texture4} />

                    </mesh>
                    {/* <mesh ref={meshRef5} position={[0, -2 - 0.02, 0]} >

                        <planeGeometry args={[2, 2]} />
                        <meshBasicMaterial opacity={0} transparent side={2} color={'red'} />

                    </mesh> */}
                </group>

            </group>

        </>


    );
};