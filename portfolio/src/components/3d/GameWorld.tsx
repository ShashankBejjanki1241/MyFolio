'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html, Sphere, Box, Cylinder, Torus, Octahedron, Stars, Float, Sparkles, Effects, Plane, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import IPhone from './IPhone'
import { useDebug } from '@/utils/debug'

interface GameWorldProps {
  onProjectSelect: (projectId: string) => void
}

interface ProjectData {
  id: string
  title: string
  description: string
  tech: string[]
  metrics: {
    downloads: string
    rating: number
    size: string
    revenue?: string
    users?: string
  }
  achievements: string[]
  position: [number, number, number]
  color: string
  techColors: string[]
}

// Floating Code Symbol Component
function CodeSymbol({ position, symbol, color, delay = 0 }: { position: [number, number, number], symbol: string, color: string, delay?: number }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + delay
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <group ref={meshRef} position={position}>
        <Box args={[0.15, 0.15, 0.05]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </Box>
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.08}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {symbol}
        </Text>
      </group>
    </Float>
  )
}

// Development Station Component
function DevStation({ position, title, tech, color, onSelect }: { 
  position: [number, number, number], 
  title: string, 
  tech: string[], 
  color: string, 
  onSelect: () => void 
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Desk */}
      <Box args={[2, 0.1, 1]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Monitor */}
      <Box args={[0.8, 0.6, 0.1]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      
      {/* Screen */}
      <Box args={[0.7, 0.5, 0.02]} position={[0, 0.2, 0.06]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </Box>
      
      {/* Keyboard */}
      <Box args={[0.6, 0.05, 0.2]} position={[0, -0.3, 0.3]}>
        <meshStandardMaterial color="#333" />
      </Box>
      
      {/* Tech Orbs around the station */}
      {tech.map((techItem, index) => {
        const angle = (index / tech.length) * Math.PI * 2
        const radius = 1.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <CodeSymbol
            key={techItem}
            position={[x, 0.5, z]}
            symbol={techItem.charAt(0)}
            color={color}
            delay={index * 0.5}
          />
        )
      })}
      
      {/* Project Title */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {title}
      </Text>
      
      {/* Clickable area */}
      <Box 
        args={[3, 2, 3]} 
        position={[0, 0, 0]}
        onClick={onSelect}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Box>
      
      {hovered && (
        <Html position={[0, 1.8, 0]} center>
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm">
            Click to explore {title}
          </div>
        </Html>
      )}
    </group>
  )
}

// Floating iPhone Display
function FloatingIPhone({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <group position={position}>
        <IPhone scale={[0.8, 0.8, 0.8]} />
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.15}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          Interactive Portfolio
        </Text>
      </group>
    </Float>
  )
}

// Achievement Trophy
function AchievementTrophy({ position, achievement, color }: { position: [number, number, number], achievement: string, color: string }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Trophy base */}
      <Cylinder args={[0.1, 0.1, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>
      
      {/* Trophy top */}
      <Sphere args={[0.15]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </Sphere>
      
      {/* Achievement text */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-regular.woff"
      >
        {achievement}
      </Text>
    </group>
  )
}

// Main GameWorld Component
export default function GameWorld({ onProjectSelect }: GameWorldProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [debugMode, setDebugMode] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const debug = useDebug('GameWorld')

  debug.logMount()

  // Enhanced project data with proper spacing for a developer studio layout
  const projects: ProjectData[] = [
    {
      id: 'pulse-incident-ios',
      position: [-6, 0, -2] as [number, number, number],
      color: '#ef4444',
      techColors: ['#dc2626', '#f97316', '#eab308', '#22c55e', '#3b82f6'],
      title: 'Pulse Incident',
      description: 'Enterprise-grade incident management platform with AR visualization',
      tech: ['SwiftUI', 'ARKit', 'Core Data', 'CloudKit', 'Combine'],
      metrics: {
        downloads: '15K+',
        rating: 4.8,
        size: '45MB',
        revenue: '$50K+',
        users: '2.5K+'
      },
      achievements: [
        'Featured in App Store',
        'Enterprise Adoption',
        'Zero Critical Bugs',
        '99.9% Uptime SLA'
      ]
    },
    {
      id: 'weather-pro',
      position: [6, 0, -2] as [number, number, number],
      color: '#10b981',
      techColors: ['#059669', '#0891b2', '#7c3aed', '#dc2626', '#f59e0b'],
      title: 'Weather Pro',
      description: 'AI-powered weather forecasting with hyperlocal predictions',
      tech: ['SwiftUI', 'Combine', 'WeatherKit', 'Core ML', 'WidgetKit'],
      metrics: {
        downloads: '8K+',
        rating: 4.9,
        size: '32MB',
        revenue: '$25K+',
        users: '1.8K+'
      },
      achievements: [
        'App Store Editor\'s Choice',
        'AI-Powered Predictions',
        'Hyperlocal Accuracy',
        'Beautiful Animations'
      ]
    },
    {
      id: 'task-manager',
      position: [0, 0, 6] as [number, number, number],
      color: '#8b5cf6',
      techColors: ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'],
      title: 'Task Manager Pro',
      description: 'Productivity powerhouse with team collaboration features',
      tech: ['SwiftUI', 'Core Data', 'CloudKit', 'WidgetKit', 'SiriKit'],
      metrics: {
        downloads: '20K+',
        rating: 4.9,
        size: '28MB',
        revenue: '$35K+',
        users: '3.2K+'
      },
      achievements: [
        'Productivity Champion',
        'Team Collaboration',
        'Siri Integration',
        'Widget Support'
      ]
    }
  ]

  // Studio floor
  const floorSize = 20
  const gridSize = 1

  // Create grid lines for the studio floor
  const gridLines = useMemo(() => {
    const lines = []
    for (let i = -floorSize; i <= floorSize; i += gridSize) {
      lines.push(
        <line key={`x-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([i, 0, -floorSize, i, 0, floorSize])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#333333" transparent opacity={0.3} />
        </line>
      )
      lines.push(
        <line key={`z-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-floorSize, 0, i, floorSize, 0, i])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#333333" transparent opacity={0.3} />
        </line>
      )
    }
    return lines
  }, [])

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId)
    onProjectSelect(projectId)
  }

  return (
    <group ref={groupRef}>
      {/* Studio Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Studio Floor with Grid */}
      <Plane args={[floorSize * 2, floorSize * 2]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.8} />
      </Plane>
      
      {/* Grid Lines */}
      <group>{gridLines}</group>
      
      {/* Studio Walls (invisible boundaries) */}
      <Box args={[0.1, 8, floorSize * 2]} position={[-floorSize, 4, 0]}>
        <meshBasicMaterial transparent opacity={0.1} color="#333" />
      </Box>
      <Box args={[0.1, 8, floorSize * 2]} position={[floorSize, 4, 0]}>
        <meshBasicMaterial transparent opacity={0.1} color="#333" />
      </Box>
      <Box args={[floorSize * 2, 8, 0.1]} position={[0, 4, -floorSize]}>
        <meshBasicMaterial transparent opacity={0.1} color="#333" />
      </Box>
      <Box args={[floorSize * 2, 8, 0.1]} position={[0, 4, floorSize]}>
        <meshBasicMaterial transparent opacity={0.1} color="#333" />
      </Box>
      
      {/* Central Welcome Area */}
      <group position={[0, 0, 0]}>
        <FloatingIPhone position={[0, 2, 0]} />
        
        {/* Welcome Text */}
        <Text
          position={[0, 4, 0]}
          fontSize={0.3}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          Welcome to My Development Studio
        </Text>
        
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.15}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-regular.woff"
        >
          Explore my iOS development journey
        </Text>
      </group>
      
      {/* Development Stations for Each Project */}
      {projects.map((project, index) => (
        <DevStation
          key={project.id}
          position={project.position}
          title={project.title}
          tech={project.tech}
          color={project.color}
          onSelect={() => handleProjectSelect(project.id)}
        />
      ))}
      
      {/* Achievement Gallery */}
      <group position={[0, 0, -8]}>
        <Text
          position={[0, 2, 0]}
          fontSize={0.2}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          Achievements
        </Text>
        
        {projects.flatMap((project, projectIndex) =>
          project.achievements.map((achievement, achievementIndex) => (
            <AchievementTrophy
              key={`${project.id}-${achievementIndex}`}
              position={[
                (projectIndex - 1) * 3,
                0.5,
                achievementIndex * 0.8 - 1
              ]}
              achievement={achievement}
              color={project.color}
            />
          ))
        )}
      </group>
      
      {/* Floating Code Particles */}
      <Sparkles count={100} scale={[10, 10, 10]} size={3} speed={0.5} color="#3b82f6" />
      
      {/* Ambient Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[5, -5, -5]} intensity={0.5} color="#8b5cf6" />
    </group>
  )
}