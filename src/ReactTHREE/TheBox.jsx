import { Html } from '@react-three/drei';
import { useState, useRef } from "react";

const PI = Math.PI
//TODO refactor in progress

function HTMlHelper({ resolution, condition, Face, defualtFace, rotation, position }) {

    return (
        <Html
            distanceFactor={1}
            rotation={rotation}
            position={position}
            transform
            occlude
            style={{ width: `${resolution}px`, height: `${resolution}px` }}
        >

            {true ? Face : defualtFace
            }

        </Html>

    )
}

export default function theBox({ resolution, scaleValue, Faces, condition, defualtFace }) {
    const lookingAt = { "front": [0, 0, 3], "back": [0, 0, -3], "left": [-3, 0, 0], "right": [3, 0, 0], "top": [0, 3, 0], "bottom": [0, -3, 0] }
    const lookingRotation = { "front": [0, 0, 0], "back": [0, PI, 0], "left": [0, PI / 2, 0], "right": [0, -PI / 2, 0], "top": [PI / 2, 0, 0], "bottom": [-PI / 2, 0, 0] }
    const [face_State, setface_State] = useState("front");
    const meshRef = useRef()

    // This constant holds an array of React components that represent different views or screens in the application.
    // Each component represents a specific feature or functionality of the application, such as the main menu, task window, user profile, week component, login menu, and Google Calendar integration.
    // These components are used to render different views or screens based on user actions or state.
    // const Faces = [front, left, right, top, bottom, back]
    return (
        <mesh scale={0.5} rotation-x={0} ref={meshRef}>
            <boxGeometry
                args={[1 * scaleValue, 1 * scaleValue, 1 * scaleValue,]} // [7, 4, 7]}
            />
            <meshPhysicalMaterial
                metalness={1.0} // Fully metallic
                roughness={0.4} // Medium roughness for a slightly polished look
                clearcoat={1.0} // High clearcoat to simulate the glossy finish of aluminum
                clearcoatRoughness={0.1}
                reflectivity={1}
                color="white" wireframe={false} />

            <HTMlHelper resolution condition Face={Faces[0]} defualtFace rotation={[0, 0, 0]} position={[0, 0, 0.51 * scaleValue]} />
            <HTMlHelper resolution condition Face={Faces[1]} defualtFace rotation={[0, -PI / 2, 0]} position={[-0.51 * scaleValue, 0, 0]} />
            <HTMlHelper resolution condition Face={Faces[2]} defualtFace rotation={[0, PI / 2, 0]} position={[0.51 * scaleValue, 0, 0]} />
            <HTMlHelper resolution condition Face={Faces[3]} defualtFace rotation={[-PI / 2, 0, 0]} position={[0, 0.51 * scaleValue, 0]} />
            <HTMlHelper resolution condition Face={Faces[4]} defualtFace rotation={[PI / 2, 0, 0]} position={[0, -0.51 * scaleValue, 0]} />
            <HTMlHelper resolution condition Face={Faces[5]} defualtFace rotation={[0, PI, 0]} position={[0, 0, -0.51 * scaleValue]} />

        </mesh >
    )
}