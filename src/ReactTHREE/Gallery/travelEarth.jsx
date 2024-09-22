import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { useControls } from 'leva';

// Assuming shaders are already imported
import earthVertexShader from '../../shaders/earth/vertex.glsl';
import earthFragmentShader from '../../shaders/earth/fragment.glsl';
// import earthFragmentShader from './shaders/earth/fragment.glsl';
import atmosphereVertexShader from '../../shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from '../../shaders/atmosphere/fragment.glsl';

const Earth = () => {
    const earthRef = useRef();
    const atmosphereRef = useRef();
    const debugSunRef = useRef();

    // Load textures
    const [dayTexture, nightTexture, cloudsTexture] = useTexture([
        'textures/earth/day.jpg',
        'textures/earth/night.jpg',
        'textures/earth/specularClouds.jpg'
    ]);

    const { camera } = useThree();

    const sunSpherical = useMemo(() => new THREE.Spherical(1, Math.PI * 0.5, 0.5), []);
    const sunDirection = useMemo(() => new THREE.Vector3(), []);

    // Uniforms and shaders parameters
    const earthMaterial = useMemo(() => ({
        uniforms: {
            uDayTexture: { value: dayTexture },
            uNightTexture: { value: nightTexture },
            uSpecularCloudsTexture: { value: cloudsTexture },
            uSunDirection: { value: sunDirection },
            uatmosphereDayColour: { value: new THREE.Color('#00aaff') },
            uatmosphereTwilightColour: { value: new THREE.Color('#ff6600') },
        },
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader
    }), [dayTexture, nightTexture, cloudsTexture, sunDirection]);

    const atmosphereMaterial = useMemo(() => ({
        uniforms: {
            uSunDirection: { value: sunDirection },
            uatmosphereDayColour: { value: new THREE.Color('#00aaff') },
            uatmosphereTwilightColour: { value: new THREE.Color('#ff6600') },
        },
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        side: THREE.BackSide,
        transparent: true
    }), [sunDirection]);

    //   // GUI controls using Leva (alternatively lil-gui)
    const { phi, theta, atmosphereDayColour, atmosphereTwilightColour } = useControls({
        phi: { value: Math.PI * 0.5, min: 0, max: Math.PI * 2 },
        theta: { value: 0.5, min: 0, max: Math.PI * 2 },
        atmosphereDayColour: '#00aaff',
        atmosphereTwilightColour: '#ff6600'
    });

    //   // Update uniforms on color change
    useFrame(() => {
        sunSpherical.phi = phi;
        sunSpherical.theta = theta;
        sunDirection.setFromSpherical(sunSpherical);

        earthRef.current.material.uniforms.uSunDirection.value.copy(sunDirection);
        atmosphereRef.current.material.uniforms.uSunDirection.value.copy(sunDirection);

        earthRef.current.material.uniforms.uatmosphereDayColour.value.set(atmosphereDayColour);
        atmosphereRef.current.material.uniforms.uatmosphereDayColour.value.set(atmosphereDayColour);

        earthRef.current.material.uniforms.uatmosphereTwilightColour.value.set(atmosphereTwilightColour);
        atmosphereRef.current.material.uniforms.uatmosphereTwilightColour.value.set(atmosphereTwilightColour);

        // debugSunRef.current.position.set(-sunDirection.x, sunDirection.y, -sunDirection.z).multiplyScalar(5);
    });

    // Animate earth rotation
    useFrame((state, delta) => {
        earthRef.current.rotation.y += delta * 0.1;
    });

    return (
        <>
            {/* Earth Mesh */}
            <mesh ref={earthRef} geometry={new THREE.SphereGeometry(2, 64, 64)}
                onPointerOver={(e) => {
                    document.body.style.cursor = 'pointer';

                }}
                onPointerOut={(e) => {
                    document.body.style.cursor = 'auto';

                }}
            >
                <shaderMaterial attach="material" args={[earthMaterial]} />
            </mesh>

            {/* Atmosphere */}
            <mesh ref={atmosphereRef} geometry={new THREE.SphereGeometry(2, 64, 64)} scale={1.04}>
                <shaderMaterial attach="material" args={[atmosphereMaterial]} />
            </mesh>

            <Html
                occlude
                position={[4, -1, -3]} style={{ color: 'black', fontSize: '1em' }} rotation={[0, -Math.PI / 2, 0]} transform wrapperClass="my-custom-wrapper">
                <div>
                    Texture by <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer" style={{ color: 'cyan' }}>solarsystemscope</a>
                </div>
            </Html>

            {/* Sun debug mesh */}
            {/* <mesh ref={debugSunRef} position={[0, 0, 0]}>
                <icosahedronGeometry args={[0.1, 2]} />
                <meshBasicMaterial color="yellow" />
            </mesh> */}
        </>
    );
};

export default Earth;
