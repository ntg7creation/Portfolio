
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { Path } from "../THREE/Path.jsx";
import { OrbitControls, Html } from '@react-three/drei'
import { ScrollControls, Sky } from '@react-three/drei'
import { getDavidStarEdgePoints, getDavidStarPoints } from "../THREE/costumeShapes";
import { CameraPath } from "../ReactTHREE/CameraPath"
import { GolobalGUI } from "../GUI/GUI.js";
import { WaterComponent } from "../THREE/BasicOcean.js"

import * as THREE from 'three';
//showcase
import { HelloPlane } from "./Gallery/Welcome.jsx";
import { TorofluxShowCase } from "./Gallery/toroFluxShowCase.jsx";
import { EducationPanel } from "./Gallery/showEducation.jsx";
import { SnakeShowPanel } from "./Gallery/SnakeShowCase.jsx";
import Earth from "./Gallery/travelEarth.jsx";


export default function Experience() {
    const { camera, gl } = useThree();

    const placehlderTexture = useLoader(THREE.TextureLoader, "/textures/templategrid_orm.png");
    const scale = 5;
    const inside = 0.7;
    const outside = 1.3;
    const edgePoints = getDavidStarEdgePoints(7, scale);
    const edgePoints2 = getDavidStarEdgePoints(7, scale * inside);
    const edgePoints3 = getDavidStarEdgePoints(7, scale * outside);
    const points = getDavidStarPoints(scale);
    /* -------------------------------- reference ------------------------------- */
    const introRef = useRef();
    const educationRef = useRef();
    const toroRef = useRef();
    const tvRef = useRef();
    let temp = 0;
    const [isOrbitEnabled, setIsOrbitEnabled] = useState(false);

    useEffect(() => {
        camera.layers.enableAll();
        const gui = GolobalGUI;
        gui.add({ isOrbitEnabled }, 'isOrbitEnabled')
            .name('Enable Orbit')
            .onChange(setIsOrbitEnabled);

        return () => gui.destroy(); // Cleanup GUI on component unmount
    }, []);

    useEffect(() => {
        camera.lookAt(points[3].x, 0, points[3].y);
    })

    useFrame((state) => {
        if (tvRef.current) {
            // tvRef.current.lookAt(state.camera.position);
            tvRef.current.lookAt(0, 0, 0);
        }
        if (introRef.current) {
            introRef.current.lookAt(state.camera.position);
            // temp = (temp + 0.03) % 10
            // console.log(introRef.current.position)
        }
        });

    return (
        <>
            <axesHelper scale={4} />
            {/*  ---------------------------------- Path ----------------------------------  */}
            <group position={[0, -0.7, 0]}>
                <Path points={edgePoints} color={0x4e5166} />
                <Path points={edgePoints2} color={0x2ef1f6} />
                <Path points={edgePoints3} color={0x8e2126} />
            </group>
            {/*  -------------------------- Objects PlaceHolders --------------------------  */}
            {/* {points.map((point, index) => (
                // <group key={index} position={[point.x * (index % 2 === 0 ? outside : inside), 0, point.y * (index % 2 === 0 ? outside : inside)]}>
                <group key={index} position={[point.x, 0, point.y]}>

                    <mesh scale={0.3} key={index} >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color={index === 1 ? "red" : "green"} />
                    </mesh>
                </group>
            ))} */}

            {/*  -------------------------- Objects  -------------------------- */}
            <group position={[points[1].x * inside, 0, points[1].y * inside]} rotation={[0, -Math.PI * 3 / 4, 0]} >

            </group>
            <group ref={introRef} position={[points[2].x * outside, 0, points[2].y * outside]}>
                <HelloPlane />
            </group>


            <group ref={educationRef} position={[(points[3].x + points[4].x) / 2 * outside, 0, (points[3].y + points[4].y) / 2 * outside]}
                rotation={[0, -Math.PI / 2, 0]}>
                <EducationPanel />
            </group>

            <group ref={toroRef} position={[points[5].x * 0.7 * inside, 0, points[5].y * 0.7 * inside]}>
                <TorofluxShowCase />
            </group>
            <group position={[points[6].x * outside * 1.4, 0, points[6].y * outside * 1.4]}>
                <mesh scale={0.3} >
                    {/* the box HTML should go here */}
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial map={placehlderTexture} />
                </mesh>
            </group>

            <group ref={toroRef} rotation={[0, -Math.PI / 6 + Math.PI, 0]}
                position={[(points[7].x + (points[8].x - points[7].x) * 0.85) * outside, 0, (points[7].y + (points[8].y - points[7].y) * 0.85) * outside]}
            >
                <SnakeShowPanel />
            </group>

            <group ref={toroRef} rotation={[0, -Math.PI / 6 + Math.PI, 0]}
                position={[(points[9].x + (points[10].x - points[9].x) * 0.85) * outside, 0, (points[9].y + (points[10].y - points[9].y) * 0.85) * outside]}
            >
                <mesh scale={0.3} >
                    {/* mtg card reader */}
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial map={placehlderTexture} />
                </mesh>
            </group>

            <group ref={toroRef} rotation={[0, -Math.PI / 6 + Math.PI, 0]}
                position={[(points[11].x + (points[0].x - points[11].x) * 0.85) * outside * 1.3, 0, (points[11].y + (points[0].y - points[11].y) * 0.85) * outside * 1.3]}
            >

                <Earth />
            </group>



            {/*  -------------------------------- enverment -------------------------------  */}
            <Sky />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <WaterComponent />
            {/*  -------------------------------- Controls --------------------------------  */}
            {
                isOrbitEnabled ? <OrbitControls /> : <>
                    <ScrollControls pages={8} infinite>
                        <CameraPath points={points} hight={0} sensitivity={2} />
                    </ScrollControls>
                </>
            }
            {/*  ---------------------------------- Music ---------------------------------  */}








        </>
    )

}

