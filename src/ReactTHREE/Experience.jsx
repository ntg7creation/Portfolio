
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { Path } from "../THREE/Path.jsx";
import { OrbitControls } from '@react-three/drei'
import { ScrollControls, Sky } from '@react-three/drei'
import { getDavidStarEdgePoints, getDavidStarPoints } from "../THREE/costumeShapes";
import { CameraPath } from "../ReactTHREE/CameraPath"
import { GolobalGUI } from "../GUI/GUI.js";
import { WaterComponent } from "../THREE/BasicOcean.js"
//showcase
import { HelloPlane } from "./Gallery/Welcome.jsx";
import { TorofluxShowCase } from "./Gallery/toroFluxShowCase.jsx";
import { EducationPanel } from "./Gallery/showEducation.jsx";


export default function Experience() {
    const { camera, gl } = useThree();
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
                <group key={index} position={[point.x * (index % 2 === 0 ? outside : inside), 0, point.y * (index % 2 === 0 ? outside : inside)]}>
                    <mesh scale={0.3} key={index} >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color={index === 1 ? "red" : "green"} />
                    </mesh>
                </group>
            ))} */}

            {/*  -------------------------- Objects  -------------------------- */}
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
            {/*  -------------------------- TV Screen --------------------------*/}
            {/* <group ref={tvRef} position={[points[5].x * 1.2, 1, points[5].y * 1.2]}  >
                <Screen src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' />
            </group > */}



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

