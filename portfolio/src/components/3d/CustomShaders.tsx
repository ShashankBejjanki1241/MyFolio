'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Custom Vertex Shader for Dynamic Geometry
const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vWave;

  void main() {
    vUv = uv;
    vPosition = position;
    
    // Create wave distortion
    vec3 pos = position;
    float wave = sin(pos.x * 10.0 + uTime) * uAmplitude;
    wave += sin(pos.z * 8.0 + uTime * 1.5) * uAmplitude * 0.5;
    pos.y += wave;
    vWave = wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Custom Fragment Shader for Advanced Materials with Bloom Effect
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vWave;

  // Noise function for organic effects
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = vUv * 10.0;
    float n = noise(st + uTime * 0.1);
    
    // Create gradient based on wave
    float gradient = smoothstep(0.0, 1.0, vUv.y);
    
    // Add noise to gradient
    gradient += n * 0.1;
    
    // Create pulsing effect
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    
    // Final color calculation with enhanced brightness for bloom effect
    vec3 color = uColor * (gradient + pulse * uIntensity);
    color += vec3(vWave * 0.5); // Add wave color contribution
    
    // Enhanced brightness for bloom-like effect
    color *= 1.5 + sin(uTime * 3.0) * 0.3;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

// Holographic Material Shader
const holographicVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const holographicFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Glitch effect function
  float glitchEffect(vec2 uv, float time) {
    float glitch = sin(time * 10.0) * 0.1;
    glitch *= step(0.8, sin(time * 5.0));
    return glitch;
  }

  void main() {
    // Fresnel effect
    vec3 viewDirection = normalize(vPosition);
    float fresnel = 1.0 - dot(viewDirection, vNormal);
    
    // Scan line effect
    float scanLine = sin(vUv.y * 100.0 + uTime * 10.0) * 0.1 + 0.9;
    
    // Glitch effect
    float glitch = glitchEffect(vUv, uTime);
    vec2 glitchUV = vUv + vec2(glitch, 0.0);
    
    // Color mixing with glitch
    vec3 color = mix(uColor1, uColor2, fresnel);
    color *= scanLine;
    
    // Apply glitch distortion
    color += vec3(glitch * 0.5, 0.0, glitch * 0.3);
    
    // Add transparency for holographic effect
    float alpha = fresnel * 0.8 + 0.2;
    
    gl_FragColor = vec4(color, alpha);
  }
`

// Custom Shader Material Component
interface CustomShaderMaterialProps {
  color?: string
  intensity?: number
  amplitude?: number
  type?: 'wave' | 'holographic'
}

export function CustomShaderMaterial({ 
  color = '#3b82f6', 
  intensity = 1.0, 
  amplitude = 0.1,
  type = 'wave'
}: CustomShaderMaterialProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  const uniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uIntensity: { value: intensity },
    uAmplitude: { value: amplitude },
    uColor1: { value: new THREE.Color('#3b82f6') },
    uColor2: { value: new THREE.Color('#8b5cf6') }
  }

  if (type === 'holographic') {
    return (
      <shaderMaterial
        ref={materialRef}
        vertexShader={holographicVertexShader}
        fragmentShader={holographicFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    )
  }

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  )
}

// Energy Field Component with Custom Shaders
export function EnergyField({ position, color = '#00ffff' }: { position: [number, number, number], color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[2, 32, 32]} />
      <CustomShaderMaterial color={color} intensity={1.5} amplitude={0.2} type="wave" />
    </mesh>
  )
}

// Holographic Display Component
export function HolographicDisplay({ 
  position, 
  children 
}: { 
  position: [number, number, number], 
  children: React.ReactNode 
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Holographic base */}
      <mesh>
        <planeGeometry args={[3, 2]} />
        <CustomShaderMaterial type="holographic" />
      </mesh>
      {children}
    </group>
  )
}

// Particle System Component
export function ParticleSystem({ 
  count = 1000, 
  color = '#ffffff' 
}: { 
  count?: number, 
  color?: string 
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  // Initialize particle positions and colors
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    const colorObj = new THREE.Color(color)
    colors[i * 3] = colorObj.r
    colors[i * 3 + 1] = colorObj.g
    colors[i * 3 + 2] = colorObj.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
      
      // Animate particles
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Fluid Motion Effect Component
export function FluidMotion({ 
  position, 
  size = [4, 4] 
}: { 
  position: [number, number, number], 
  size?: [number, number] 
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      if (meshRef.current.material && 'uniforms' in meshRef.current.material) {
        (meshRef.current.material as any).uniforms.uTime.value = state.clock.elapsedTime
      }
    }
  })

  const fluidVertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Create fluid-like distortion
      pos.x += sin(pos.y * 3.0 + uTime * 2.0) * 0.1;
      pos.y += cos(pos.x * 2.0 + uTime * 1.5) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fluidFragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    
    void main() {
      vec2 st = vUv;
      
      // Create flowing pattern
      float flow = sin(st.x * 10.0 + uTime * 3.0) * cos(st.y * 8.0 + uTime * 2.0);
      flow = flow * 0.5 + 0.5;
      
      vec3 color = uColor * flow;
      gl_FragColor = vec4(color, 0.6);
    }
  `

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={size} />
      <shaderMaterial
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#00ffff') }
        }}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
