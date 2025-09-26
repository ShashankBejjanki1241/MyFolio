'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

// Dynamic Lighting System
export function DynamicLighting() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)
  const pointLightRef = useRef<THREE.PointLight>(null)
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const { camera } = useThree()

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Animate directional light with enhanced effects
    if (directionalLightRef.current) {
      directionalLightRef.current.position.x = Math.sin(time * 0.5) * 10
      directionalLightRef.current.position.z = Math.cos(time * 0.5) * 10
      directionalLightRef.current.intensity = 1.5 + Math.sin(time * 2) * 0.5
      // Color cycling for enhanced visual impact
      directionalLightRef.current.color.setHSL((time * 0.05) % 1, 0.3, 0.8)
    }

    // Animate point light with more dramatic effects
    if (pointLightRef.current) {
      pointLightRef.current.position.y = 5 + Math.sin(time * 1.5) * 3
      pointLightRef.current.intensity = 1.2 + Math.sin(time * 3) * 0.4
      pointLightRef.current.color.setHSL((time * 0.15) % 1, 0.9, 0.7)
    }

    // Animate spot light to follow camera with enhanced intensity
    if (spotLightRef.current) {
      spotLightRef.current.target.position.copy(camera.position)
      spotLightRef.current.target.updateMatrixWorld()
      spotLightRef.current.intensity = 0.8 + Math.sin(time * 2.5) * 0.3
    }
  })

  return (
    <>
      {/* Main directional light with shadows */}
      <directionalLight
        ref={directionalLightRef}
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Dynamic point light */}
      <pointLight
        ref={pointLightRef}
        position={[0, 5, 0]}
        intensity={0.8}
        distance={20}
        decay={2}
        color="#3b82f6"
      />

      {/* Following spot light */}
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 0]}
        angle={Math.PI / 4}
        penumbra={0.3}
        intensity={0.5}
        color="#8b5cf6"
        castShadow
      />

      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.3} color="#404040" />

      {/* Rim lighting */}
      <directionalLight
        position={[-5, 0, -5]}
        intensity={0.2}
        color="#ffffff"
      />
    </>
  )
}

// Volumetric Light Component
export function VolumetricLight({ 
  position, 
  color = '#ffffff',
  intensity = 1.0 
}: { 
  position: [number, number, number], 
  color?: string, 
  intensity?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.SpotLight>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const volumetricVertexShader = `
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    
    void main() {
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const volumetricFragmentShader = `
    uniform vec3 uLightPosition;
    uniform vec3 uLightColor;
    uniform float uIntensity;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    
    void main() {
      vec3 lightDirection = normalize(uLightPosition - vWorldPosition);
      float distance = length(uLightPosition - vWorldPosition);
      float attenuation = 1.0 / (1.0 + 0.1 * distance + 0.01 * distance * distance);
      
      float intensity = dot(vNormal, lightDirection) * uIntensity * attenuation;
      intensity = max(0.0, intensity);
      
      vec3 color = uLightColor * intensity;
      gl_FragColor = vec4(color, intensity * 0.8);
    }
  `

  return (
    <group position={position}>
      {/* Light source */}
      <spotLight
        ref={lightRef}
        position={[0, 0, 0]}
        target-position={[0, -5, 0]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={intensity}
        color={color}
        castShadow
      />

      {/* Volumetric light cone */}
      <mesh ref={meshRef}>
        <coneGeometry args={[2, 8, 16]} />
        <shaderMaterial
          vertexShader={volumetricVertexShader}
          fragmentShader={volumetricFragmentShader}
          uniforms={{
            uLightPosition: { value: position },
            uLightColor: { value: new THREE.Color(color) },
            uIntensity: { value: intensity }
          }}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

// Environment Lighting
export function EnvironmentLighting() {
  return (
    <>
      {/* Sky gradient */}
      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial
          color="#001122"
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ground plane with subtle lighting */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </>
  )
}

// Interactive Light Follows Mouse
export function InteractiveLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { camera, size } = useThree()

  useFrame((state) => {
    if (lightRef.current) {
      // Create subtle movement based on time
      const time = state.clock.elapsedTime
      lightRef.current.position.x = Math.sin(time * 0.5) * 3
      lightRef.current.position.z = Math.cos(time * 0.3) * 3
      lightRef.current.position.y = 2 + Math.sin(time * 0.8) * 0.5
      
      // Color cycling
      const hue = (time * 0.1) % 1
      lightRef.current.color.setHSL(hue, 0.8, 0.6)
    }
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, 2, 0]}
      intensity={0.6}
      distance={15}
      decay={2}
      color="#3b82f6"
    />
  )
}

// Glowing Orb Component
export function GlowingOrb({ 
  position, 
  color = '#00ffff',
  size = 1.0,
  intensity = 2.0 
}: { 
  position: [number, number, number], 
  color?: string, 
  size?: number,
  intensity?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      meshRef.current.scale.setScalar(scale)
    }

    if (lightRef.current) {
      lightRef.current.intensity = intensity + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <group position={position}>
      {/* Light source */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        intensity={intensity}
        distance={10}
        decay={2}
        color={color}
      />

      {/* Glowing orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[size * 1.5, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

// Shadow Catcher
export function ShadowCatcher() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50]} />
      <shadowMaterial transparent opacity={0.3} />
    </mesh>
  )
}
