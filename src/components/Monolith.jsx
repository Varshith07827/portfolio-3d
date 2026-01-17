import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export const Monolith = ({ isHeroMode }) => {
  const meshRef = useRef()
  const ringRef = useRef()

  // Refs for smooth animation
  const scrollTarget = useRef(0)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Read global scroll for interaction
    const scrollY = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0

    // Smooth lerp for scroll effect
    scrollTarget.current = THREE.MathUtils.lerp(scrollTarget.current, progress, 0.1)

    if (meshRef.current) {
      // Rotate base + scroll extra
      meshRef.current.rotation.y = time * 0.1 + (scrollTarget.current * Math.PI * 2)
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.05 + (scrollTarget.current * 0.5)

      // Scale pulse on scroll
      const scale = 1 + Math.sin(time) * 0.05 + (scrollTarget.current * 0.2)
      meshRef.current.scale.setScalar(scale)
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.2 - (scrollTarget.current * Math.PI)
      ringRef.current.rotation.x = Math.cos(time * 0.1) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[2.5, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={2}
            chromaticAberration={isHeroMode ? 1 : 0.05}
            anisotropy={0.5}
            distortion={isHeroMode ? 0.8 : 0.2}
            distortionScale={0.5}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1.5}
            iridescenceThicknessRange={[0, 1400]}
            color={isHeroMode ? "#ff0000" : "#ffffff"}
          />
        </mesh>

        <mesh scale={[1.5, 1.5, 1.5]}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={isHeroMode ? "#ff2222" : "#ffffff"}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.8, 0.03, 16, 100]} />
          <meshStandardMaterial
            color={isHeroMode ? "#0088ff" : "#ffffff"}
            emissive={isHeroMode ? "#0088ff" : "#ffffff"}
            emissiveIntensity={isHeroMode ? 3 : 1}
            toneMapped={false}
          />
        </mesh>

        <Points isHeroMode={isHeroMode} />
      </group>
    </Float>
  )
}

function Points({ isHeroMode }) {
  const pointsRef = useRef()
  const count = 400 // Increased count
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const r = 8 + Math.random() * 10
    const t = Math.random() * 2 * Math.PI
    const p = (Math.random() - 0.5) * Math.PI
    positions[i * 3] = r * Math.sin(t) * Math.cos(p)
    positions[i * 3 + 1] = r * Math.sin(t) * Math.sin(p)
    positions[i * 3 + 2] = r * Math.cos(t)
  }

  useFrame((state) => {
    // Rotate entire particle system based on scroll too
    const scrollY = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0

    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05 + (progress * 0.5)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={isHeroMode ? "#ff0000" : "#ffffff"}
        transparent
        opacity={isHeroMode ? 0.8 : 0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
