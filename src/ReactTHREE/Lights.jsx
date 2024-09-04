


export function lights8(helper = false) {





    return (
        <>
            {/* Lights from positive and negative x, y, z directions */}
            <directionalLight position={[1, 1, 1]} intensity={4.5} color="purple">
                {helper && (
                    <mesh>
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                )}
            </directionalLight>

            <directionalLight position={[-1, 1, 1]} intensity={4.5} color="purple">
                {helper && (
                    <mesh>
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                )}
            </directionalLight>

            <directionalLight position={[1, -1, 1]} intensity={4.5} color="#FFD700">
                {helper && (
                    <mesh>
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                )}
            </directionalLight>

            <directionalLight position={[-1, -1, 1]} intensity={4.5} color="#FFD700">
                {helper && (
                    <mesh>
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                )}
            </directionalLight>

            <directionalLight position={[1, 1, -1]} intensity={4.5} color="#00BFFF">
                {helper && (
                    <mesh>
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                )}
            </directionalLight>

            <directionalLight position={[-1, 1, -1]} intensity={4.5} color="#00BFFF">
                {helper && (
                    <mesh>
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                )}
            </directionalLight>

            <directionalLight position={[1, -1, -1]} intensity={4.5} color="green">
                {helper && (
                    <mesh>
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                )}
            </directionalLight>

            <directionalLight position={[-1, -1, -1]} intensity={4.5} color="green">
                {helper && (
                    <mesh>
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                )}
            </directionalLight>


        </>
    )
}