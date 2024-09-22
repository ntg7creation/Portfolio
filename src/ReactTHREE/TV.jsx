import * as THREE from 'three'
import { useState, Suspense, useMemo, useRef, useEffect } from 'react'
import { useVideoTexture, Center } from '@react-three/drei'
// import { RectAreaLights } from '@react-three/drei'

// List of films from https://gist.github.com/jsturgis/3b19447b304616f18657
const films = {
    Sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'Big Buck Bunny': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'Elephant Dream': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'For Bigger Blazes': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'For Bigger Joy Rides': 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
}


export function Screen({ src = films.Sintel, width = 2.4, ratio = 16 / 9 }) {


    return (<>

        <mesh scale={[width, width, 1]} rotation-y={Math.PI}
        >


            <planeGeometry args={[width, width / ratio]} />
            <Suspense fallback={<meshStandardMaterial side={THREE.DoubleSide} wireframe />}>
                <VideoMaterial src={src} />

            </Suspense>
        </mesh >
        <rectAreaLight position={[0, 0, 1]} intensity={1} color={0xffffff} />
    </>

    )
}

function VideoMaterial({ src, setVideo, opacity = 1 }) {
    const texture = useVideoTexture(src)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.offset.x = 1

    // setVideo?.(texture.image)

    return <meshStandardMaterial map={texture} side={THREE.DoubleSide} toneMapped={true} opacity={opacity} />
}



