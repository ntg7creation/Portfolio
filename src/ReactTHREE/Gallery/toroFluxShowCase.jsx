import { torofluxCurve } from "../../THREE/toroFlux.js";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { extend } from '@react-three/fiber'
import { createToroflux } from "../../THREE/toroFlux.js";



export const TorofluxShowCase = () => {

    const toroRef = useRef();
    const toroflux = createToroflux();
    useFrame(() => {
        toroRef.current.rotation.x += 0.003;
        toroRef.current.rotation.y = Math.sin(toroRef.current.rotation.x * 0.9) * 2.1;
    });
    return (
        <group >

            <mesh ref={toroRef} geometry={toroflux.geometry} material={toroflux.material} scale={[0.2, 0.2, 0.2]}>
            </mesh>
            <directionalLight position={[5, -1, 1]} intensity={1} color={0x2222ff} />

        </group>
    );
}
