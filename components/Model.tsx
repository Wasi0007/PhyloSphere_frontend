import React, { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
    const { nodes } = useGLTF("/DNA.glb");
    const { viewport } = useThree()
    const Suzanne = useRef(null);
    
    useFrame( () => {
        Suzanne.current.rotation.y += 0.02
    })

    // const materialProps = useControls({
    //     thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     transmission: {value: 1, min: 0, max: 1, step: 0.1},
    //     ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    //     chromaticAberration: { value: 0.02, min: 0, max: 1},
    //     backside: { value: true},
    // })
    
    return (
        <group scale={viewport.width / 5} position={[0, 0, 0]}>
            
            <mesh ref={Suzanne} {...nodes.Plane}>
                {/* <MeshTransmissionMaterial {...materialProps} /> */}
            </mesh>
        </group>

    )
}