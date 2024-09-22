
import { useRef, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { createToroflux } from "../../THREE/toroFlux.js";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";



export const TorofluxShowCase = (layer = 0) => {

    const toroRef = useRef();
    const lightRef = useRef();
    const toroflux = createToroflux();
    // useHelper(lightRef, RectAreaLightHelper);
    // Assign both the mesh and the light to a specific layer (layer 1)


    useEffect(() => {



    }, []);
    useFrame(() => {
        toroRef.current.rotation.x += 0.003;
        toroRef.current.rotation.y = Math.sin(toroRef.current.rotation.x * 0.9) * 2.1;
    });
    return (
        <group >

            <mesh ref={toroRef} geometry={toroflux.geometry} material={toroflux.material} scale={[0.2, 0.2, 0.2]}>


            </mesh>
            {/* <directionalLight ref={lightRef} position={[5, -1, 1]} intensity={1} color={0x2222ff} /> */}
            {/* <rectAreaLight position={[0, 0, 1]} intensity={1} color={0xffffff} /> */}
            {/* <rectAreaLight ref={lightRef} position={[5, -1, 1]} intensity={1} color={0x2222ff} /> */}
            <pointLight ref={lightRef} position={[0, 0, 0]} intensity={2} color={0x2222ff} />
        </group>
    );
}
