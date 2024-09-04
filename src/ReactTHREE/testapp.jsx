import * as THREE from 'three'
import { forwardRef, useState, Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useVideoTexture, Grid, Center, AccumulativeShadows, RandomizedLight, Environment, useGLTF, CameraControls } from '@react-three/drei'
import { useControls, button } from 'leva'
import { suspend } from 'suspend-react'

import CurvedPlane from './CurvedPlane'

const city = import('@pmndrs/assets/hdri/city.exr')
const suzi = import(`@pmndrs/assets/models/suzi.glb`)

const { DEG2RAD } = THREE.MathUtils

// List of films from https://gist.github.com/jsturgis/3b19447b304616f18657
const films = {
    Sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'Big Buck Bunny': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'Elephant Dream': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'For Bigger Blazes': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'For Bigger Joy Rides': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
}

export default function App() {
    return (
        <>
            {/* <Canvas shadows camera={{ position: [4, 3, 12], fov: 60 }}> */}
            <Scene />

            {/* Add ambient and directional lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />


            {/* <Ground />
            <AccumulativeShadows frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
            <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
            </AccumulativeShadows> */}

            {/* <CameraControls /> */}

            {/* <Environment files={suspend(city).default} /> */}
            {/* </Canvas> */}
        </>
    )
}

function Scene() {
    const [stream, setStream] = useState(new MediaStream())

    const { url } = useControls({
        url: {
            value: films['Sintel'],
            options: films
        },
        'getDisplayMedia (only new-window)': button(async (get) => {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
            setStream(mediaStream)
        })
    })

    return (
        <>
            {/* <Center top>
                <Suzi rotation={[-0.63, 0, 0]} />
            </Center> */}

            <group rotation-y={DEG2RAD * 40}>
                <Screen src={url} />
            </group>

            {/* <group rotation-y={DEG2RAD * -40}>
                <Screen src={stream} />
            </group> */}
        </>
    )
}

function Screen({ src }) {
    const [video, setVideo] = useState()

    const ratio = 16 / 9
    const width = 5
    const radius = 4
    const z = 4

    const r = useMemo(() => (video ? video.videoWidth / video.videoHeight : ratio), [video, ratio])

    return (
        <Center top position-z={z}>
            <mesh scale={[width, width, 1]}
                position={[0, 0, z]}
                rotation={[0, 0, 0]}
            >
                <planeGeometry args={[width, width / r]} />
                <Suspense fallback={<meshStandardMaterial side={THREE.DoubleSide} wireframe />}>
                    <VideoMaterial src={src} setVideo={setVideo} />
                </Suspense>
            </mesh>
        </Center>
    )
}

function VideoMaterial({ src, setVideo }) {
    const texture = useVideoTexture(src)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.offset.x = 1

    setVideo?.(texture.image)

    return <meshStandardMaterial side={THREE.DoubleSide} map={texture} toneMapped={false} transparent opacity={0.9} />
}

//
//
//

function Ground() {
    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#6f6f6f',
        sectionSize: 3,
        sectionThickness: 1,
        sectionColor: '#9d4b4b',
        fadeDistance: 30,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    }
    return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}

const Suzi = forwardRef((props, ref) => {
    const { nodes } = useGLTF(suspend(suzi).default)
    return (
        <>
            <mesh ref={ref} castShadow receiveShadow geometry={nodes.mesh.geometry} {...props}>
                <meshStandardMaterial color="#9d4b4b" />
            </mesh>
        </>
    )
})
