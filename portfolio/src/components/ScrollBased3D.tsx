'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html, Text, Sphere, Box, Cylinder, Torus, Octahedron, Stars, Float, Sparkles, Plane } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDebug } from '@/utils/debug'

interface ScrollBased3DProps {
  scrollProgress: number
}

// Scene 1: Welcome to Development World
function Scene1_Welcome({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Welcome Sphere */}
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#3b82f6" 
          emissive="#1e40af" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Floating Tech Icons */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          Welcome to My World
        </Text>
      </Float>
      
      {/* Orbiting Tech Symbols */}
      {['SwiftUI', 'ARKit', 'Core Data', 'CloudKit'].map((tech, index) => {
        const angle = (index / 4) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <Float key={tech} speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.2}>
            <group position={[x, 0, z]}>
              <Box args={[0.3, 0.3, 0.3]}>
                <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.2} />
              </Box>
              <Text
                position={[0, -0.8, 0]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-regular.woff"
              >
                {tech}
              </Text>
            </group>
          </Float>
        )
      })}
      
      {/* Interactive Area */}
      <Sphere 
        args={[2, 32, 32]} 
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Sphere>
      
      {hovered && (
        <Html position={[0, 2.5, 0]} center>
          <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
            Scroll down to explore my development journey
          </div>
        </Html>
      )}
    </group>
  )
}

// Scene 2: Development Process
function Scene2_Development({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Development Pipeline */}
      <group position={[0, 0, 0]}>
        {/* Step 1: Design */}
        <group position={[-4, 0, 0]}>
          <Box args={[0.8, 0.8, 0.8]}>
            <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.2} />
          </Box>
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            Design
          </Text>
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.1}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-regular.woff"
          >
            UI/UX Planning
          </Text>
        </group>
        
        {/* Arrow */}
        <Box args={[0.5, 0.1, 0.1]} position={[-2, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" />
        </Box>
        
        {/* Step 2: Code */}
        <group position={[0, 0, 0]}>
          <Cylinder args={[0.4, 0.4, 0.8]} rotation={[0, 0, Math.PI / 4]}>
            <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.2} />
          </Cylinder>
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            Code
          </Text>
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.1}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-regular.woff"
          >
            SwiftUI Development
          </Text>
        </group>
        
        {/* Arrow */}
        <Box args={[0.5, 0.1, 0.1]} position={[2, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" />
        </Box>
        
        {/* Step 3: Test */}
        <group position={[4, 0, 0]}>
          <Torus args={[0.4, 0.2, 16, 32]}>
            <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.2} />
          </Torus>
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            Test
          </Text>
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.1}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-regular.woff"
          >
            Quality Assurance
          </Text>
        </group>
      </group>
      
      {/* Floating Code Particles */}
      <Sparkles count={50} scale={[8, 4, 8]} size={2} speed={0.5} color="#3b82f6" />
    </group>
  )
}

// Scene 3: Project Showcase
function Scene3_Projects({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const projects = [
    { name: 'Pulse Incident', color: '#ef4444', position: [-3, 0, 0] },
    { name: 'Weather Pro', color: '#10b981', position: [0, 0, 0] },
    { name: 'Task Manager', color: '#8b5cf6', position: [3, 0, 0] }
  ]

  return (
    <group ref={groupRef}>
            {projects.map((project, index) => (
              <Float key={project.name} speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.2}>
                <group position={project.position as [number, number, number]}>
            {/* Project Orb */}
            <Sphere args={[0.8, 32, 32]}>
              <meshStandardMaterial 
                color={project.color} 
                emissive={project.color} 
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </Sphere>
            
            {/* Project Name */}
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/inter-bold.woff"
            >
              {project.name}
            </Text>
            
            {/* Orbiting Tech Icons */}
            {['S', 'A', 'C'].map((tech, techIndex) => {
              const angle = (techIndex / 3) * Math.PI * 2
              const radius = 1.5
              const x = Math.cos(angle) * radius
              const z = Math.sin(angle) * radius
              
              return (
                <group key={tech} position={[x, 0, z] as [number, number, number]}>
                  <Octahedron args={[0.15]}>
                    <meshStandardMaterial color={project.color} />
                  </Octahedron>
                </group>
              )
            })}
          </group>
        </Float>
      ))}
      
      {/* Central Title */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.25}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        Featured Projects
      </Text>
    </group>
  )
}

// Scene 4: Achievement Gallery
function Scene4_Achievements({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const achievements = [
    { name: 'App Store Featured', icon: '🏆', position: [-2, 1, 0] },
    { name: '4.8+ Rating', icon: '⭐', position: [0, 1, 0] },
    { name: '50K+ Downloads', icon: '📱', position: [2, 1, 0] },
    { name: 'Enterprise Ready', icon: '🏢', position: [-1, -1, 0] },
    { name: 'Zero Bugs', icon: '🐛', position: [1, -1, 0] }
  ]

  return (
    <group ref={groupRef}>
      {/* Central Achievement Platform */}
      <Cylinder args={[3, 3, 0.2]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#1e293b" />
      </Cylinder>
      
            {achievements.map((achievement, index) => (
              <Float key={achievement.name} speed={1 + index * 0.1} rotationIntensity={0.5} floatIntensity={0.3}>
                <group position={achievement.position as [number, number, number]}>
            {/* Trophy Base */}
            <Cylinder args={[0.2, 0.2, 0.4]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#f59e0b" />
            </Cylinder>
            
            {/* Trophy Top */}
            <Sphere args={[0.25]} position={[0, 0.3, 0]}>
              <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.3} />
            </Sphere>
            
            {/* Achievement Text */}
            <Text
              position={[0, -0.8, 0]}
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/inter-regular.woff"
            >
              {achievement.name}
            </Text>
          </group>
        </Float>
      ))}
      
      {/* Central Title */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.25}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        Achievements
      </Text>
    </group>
  )
}

// Main ScrollBased3D Component
export default function ScrollBased3D({ scrollProgress }: ScrollBased3DProps) {
  const debug = useDebug('ScrollBased3D')
  
  // Determine which scene to show based on scroll progress
  const getCurrentScene = () => {
    if (scrollProgress < 0.25) return 1
    if (scrollProgress < 0.5) return 2
    if (scrollProgress < 0.75) return 3
    return 4
  }

  const currentScene = getCurrentScene()
  
  debug.info(`Scroll progress: ${scrollProgress}, Current scene: ${currentScene}`)

  return (
    <div className="fixed inset-0 z-10">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2, 8], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.3} color="#3b82f6" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#8b5cf6" />
        <Environment preset="night" />

        <Suspense fallback={null}>
          {/* Scene Transitions */}
          <group>
            {currentScene === 1 && <Scene1_Welcome scrollProgress={scrollProgress} />}
            {currentScene === 2 && <Scene2_Development scrollProgress={scrollProgress} />}
            {currentScene === 3 && <Scene3_Projects scrollProgress={scrollProgress} />}
            {currentScene === 4 && <Scene4_Achievements scrollProgress={scrollProgress} />}
          </group>
        </Suspense>

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={15}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Scene Indicator */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="text-white text-sm mb-2">Scene {currentScene}/4</div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((scene) => (
              <div
                key={scene}
                className={`w-3 h-3 rounded-full transition-colors ${
                  scene === currentScene ? 'bg-blue-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
