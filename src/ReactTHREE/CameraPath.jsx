
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from '@react-three/drei'
import { useEffect, useState } from "react";



export function CameraPath({ points, hight, sensitivity = 1 }) {
    points.push(points[0])
    points.push(points[1])
    points.push(points[2])
    points.push(points[3])
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const worldYAxisY = new THREE.Vector3(0, 1, 0); // Y-axis for tilting
    const worldYAxisX = new THREE.Vector3(0, 0, 1); // X-axis for tilting

    const scroll = useScroll();


    useEffect(() => {
        const handleMouseMove = (event) => {
            // Normalize mouse X position (-1 to 1)
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = (event.clientY / window.innerHeight) * 2 - 1;
            setMouseX(x);
            setMouseY(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state, delta) => {


        const offset = (scroll.offset) * 12 + 1;
        let current = Math.floor(offset)
        if (current <= 0 || current > 13)
            current = 0;

        const currentpoint = new THREE.Vector3(points[current].x, 0, points[current].y)
        const nextpoint = new THREE.Vector3(points[current + 1].x, 0, points[current + 1].y)
        const nextnextpoint = new THREE.Vector3(points[current + 2].x, 0, points[current + 2].y)
        const t = offset - current

        // Move the camera towards the next point along the path
        state.camera.position.set(currentpoint.x + (nextpoint.x - currentpoint.x) * t, hight, currentpoint.z + (nextpoint.z - currentpoint.z) * t)

        // Interpolate between the current target and the next point
        const currentTarget = new THREE.Vector3().lerpVectors(nextpoint, nextnextpoint, t);

        // look at the next point
        state.camera.lookAt(currentTarget);

        // Calculate the tilt amount based on mouse X position
        const tiltAmountX = - mouseX * sensitivity;
        const tiltAmountY = mouseY * sensitivity;



        // Calculate the right vector (cross product of up vector and direction)
        const cameraDirection = new THREE.Vector3();
        state.camera.getWorldDirection(cameraDirection); // Get the camera's current direction
        const rightVector = new THREE.Vector3().crossVectors(state.camera.up, cameraDirection).normalize();


        // Rotate the camera around the world Y-axis
        state.camera.rotateOnWorldAxis(worldYAxisY, tiltAmountX);
        state.camera.rotateOnAxis(rightVector, tiltAmountY);
    })
    return null;
}

