import * as THREE from 'three'
import { useState, Suspense, useMemo } from 'react'
import { useVideoTexture, Center } from '@react-three/drei'
import { useControls, button } from 'leva'
// import { rotate } from 'three/webgpu'



const { DEG2RAD } = THREE.MathUtils

// List of films from https://gist.github.com/jsturgis/3b19447b304616f18657
const films = {
    Sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'Big Buck Bunny': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'Elephant Dream': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'For Bigger Blazes': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'For Bigger Joy Rides': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
}

// export default function App() {
//     return (
//         <>
//             <Scene />
//             <ambientLight intensity={0.5} />
//             <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
//         </>
//     )
// }

// function Scene() {
//     const [stream, setStream] = useState(new MediaStream())

//     const { url } = useControls({
//         url: {
//             value: films['Sintel'],
//             options: films
//         },
//         'getDisplayMedia (only new-window)': button(async (get) => {
//             const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
//             setStream(mediaStream)
//         })
//     })

//     return (
//         <>

//             <group rotation-y={DEG2RAD * 40}>
//                 <Screen src={url} />
//             </group>
//         </>
//     )
// }

export function Screen({ src, width = 2.4, ratio = 16 / 9 }) {
    const [video, setVideo] = useState()

    const radius = 4

    const r = useMemo(() => (video ? video.videoWidth / video.videoHeight : ratio), [video, ratio])

    return (<>

        <mesh scale={[width, width, 1]} rotation-y={Math.PI}
        >
            <planeGeometry args={[width, width / r]} />
            <Suspense fallback={<meshStandardMaterial side={THREE.DoubleSide} wireframe />}>
                <VideoMaterial src={src} setVideo={setVideo} />
            </Suspense>
        </mesh >
    </>

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



