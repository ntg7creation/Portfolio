import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas, useLoader } from '@react-three/fiber'
import Experience from './ReactTHREE/Experience.jsx'
import { StrictMode } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import App from "./ReactTHREE/testapp.jsx"
import { MusicPlayer } from "./ReactTHREE/BackgroundMusic.jsx"
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>

        <MusicPlayer />

        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [- 4, 3, 6],
            }}
        >

            {/* <App /> */}
            <Experience />
        </Canvas>

    </StrictMode>
)