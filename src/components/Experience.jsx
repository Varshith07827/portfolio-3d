import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Stars, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Monolith } from './Monolith'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'

// Component to handle scroll-driven 3D effects
const ScrollManager = ({ isHeroMode }) => {
    useFrame((state) => {
        // Get normalized scroll position (0 to 1)
        const scrollY = window.scrollY
        const maxScroll = document.body.scrollHeight - window.innerHeight
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0

        // Smooth camera movement based on scroll
        // Original pos: [0, 0, 9] -> move slightly down and zoom in
        const targetY = -(progress * 2)
        const targetZ = 9 - (progress * 3)

        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)

        // Rotate scene slightly based on scroll
        state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, progress * 0.1, 0.05)
    })
    return null
}

export const Experience = ({ isHeroMode }) => {
    return (
        <Canvas
            dpr={[1, 2]}
            gl={{
                antialias: false,
                toneMapping: THREE.ReinhardToneMapping,
                toneMappingExposure: 1.5
            }}
            shadows
        >
            <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
            <ScrollManager isHeroMode={isHeroMode} />

            {/* Lighting */}
            <ambientLight intensity={isHeroMode ? 0.05 : 0.1} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.5}
                penumbra={1}
                intensity={isHeroMode ? 10 : 2}
                color={isHeroMode ? "#ff0000" : "#ffffff"}
                castShadow
            />
            <pointLight
                position={[-10, -5, -10]}
                intensity={isHeroMode ? 5 : 0.5}
                color={isHeroMode ? "#0088ff" : "#4444ff"}
            />
            <pointLight
                position={[0, 0, 0]}
                intensity={isHeroMode ? 3 : 1}
                distance={5}
                color={isHeroMode ? "#ff0000" : "#ffffff"}
            />

            <Suspense fallback={null}>
                <Monolith isHeroMode={isHeroMode} />

                {/* Dynamic Background */}
                <Stars
                    radius={100}
                    depth={50}
                    count={7000}
                    factor={6}
                    saturation={0}
                    fade
                    speed={2}
                />

                <Environment preset={isHeroMode ? "warehouse" : "city"} />
            </Suspense>

            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={isHeroMode ? 0.2 : 0.8}
                    mipmapBlur
                    intensity={isHeroMode ? 2.5 : 1.5}
                    radius={0.4}
                />
                <Noise
                    opacity={isHeroMode ? 0.35 : 0.05}
                    blendFunction={BlendFunction.OVERLAY}
                />
                <ChromaticAberration
                    offset={[isHeroMode ? 0.005 : 0.0005, isHeroMode ? 0.005 : 0.0005]}
                    radialModulation={false}
                    modulationOffset={0}
                />
                <Vignette
                    eskil={false}
                    offset={0.1}
                    darkness={isHeroMode ? 0.8 : 0.6}
                />
            </EffectComposer>
        </Canvas>
    )
}
