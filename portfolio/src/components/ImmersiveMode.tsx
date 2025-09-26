'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Html, Text, Sphere, Box, Cylinder, Torus, Octahedron, Stars, Float, Sparkles, Plane, useGLTF } from '@react-three/drei'
// import { EffectComposer, Bloom, Glitch, ChromaticAberration } from '@react-three/postprocessing'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ImmersiveModeProps {
  currentZone: 'intro' | 'learning' | 'wipro' | 'cvs' | 'wells' | 'projects' | 'contact'
  onZoneChange: (zone: 'intro' | 'learning' | 'wipro' | 'cvs' | 'wells' | 'projects' | 'contact') => void
}

// Hero Avatar Component (Your Character)
function HeroAvatar({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <Cylinder args={[0.4, 0.5, 1.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.1} />
      </Cylinder>
      
      {/* Head */}
      <Sphere args={[0.3]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.05} />
      </Sphere>
      
      {/* Eyes */}
      <Sphere args={[0.06]} position={[-0.1, 0.95, 0.25]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <Sphere args={[0.06]} position={[0.1, 0.95, 0.25]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      
      {/* Arms */}
      <Cylinder args={[0.1, 0.1, 0.7]} position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#1e40af" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.7]} position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="#1e40af" />
      </Cylinder>
      
      {/* Glowing aura */}
      <Sphere args={[1.2, 16, 16]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
      </Sphere>
    </group>
  )
}

// Career Path Component - Shows journey from India to USA
function CareerPath({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* India to USA Path */}
      <Box args={[8, 0.2, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
      </Box>
      
      {/* India Flag */}
      <Box args={[0.5, 0.3, 0.1]} position={[-3.5, 0.5, 0]}>
        <meshStandardMaterial color="#ff6b6b" />
      </Box>
      <Text position={[-3.5, 1, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        🇮🇳 India
      </Text>
      
      {/* USA Flag */}
      <Box args={[0.5, 0.3, 0.1]} position={[3.5, 0.5, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Box>
      <Text position={[3.5, 1, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        🇺🇸 USA
      </Text>
      
      {/* Education Institutions */}
      <Text position={[-2, 0.8, 0]} fontSize={0.12} color="#10b981" anchorX="center" anchorY="middle">
        SRM University
      </Text>
      <Text position={[2, 0.8, 0]} fontSize={0.12} color="#10b981" anchorX="center" anchorY="middle">
        Wichita State
      </Text>
      
      {/* Moving particles along path */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <Sphere args={[0.1]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
    </group>
  )
}

// Wipro Legacy Lab Component
function WiproLegacyLab({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Legacy Lab Building */}
      <Box args={[4, 3, 4]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#6b7280" emissive="#6b7280" emissiveIntensity={hovered ? 0.2 : 0.05} />
      </Box>
      
      {/* Old UIKit Components */}
      <Box args={[0.8, 0.6, 0.1]} position={[-1, 2, 1.5]}>
        <meshStandardMaterial color="#ef4444" />
      </Box>
      <Text position={[-1, 2.8, 1.5]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        UIKit
      </Text>
      
      {/* Objective-C Code */}
      <Box args={[0.8, 0.6, 0.1]} position={[1, 2, 1.5]}>
        <meshStandardMaterial color="#f59e0b" />
      </Box>
      <Text position={[1, 2.8, 1.5]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        Obj-C
      </Text>
      
      {/* Swift Migration Arrow */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <group position={[0, 3.5, 0]}>
          <Box args={[0.8, 0.6, 0.1]}>
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
          </Box>
          <Text position={[0, 0, 0.1]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
            Swift
          </Text>
        </group>
      </Float>
      
      {/* Clickable area */}
      <Box 
        args={[4, 3, 4]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Box>
      
      {hovered && (
        <Html position={[0, 4.5, 0]} center>
          <div className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm max-w-xs">
            <div className="font-bold text-blue-300">Wipro Legacy Lab</div>
            <div className="text-xs mt-1">UIKit → Swift Migration</div>
            <div className="text-xs text-green-300 mt-1">Legacy System Modernization</div>
          </div>
        </Html>
      )}
    </group>
  )
}

// CVS Healthcare Chamber Component
function CVSHealthcareChamber({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Healthcare Chamber */}
      <Cylinder args={[2, 2, 3]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#059669" emissive="#059669" emissiveIntensity={hovered ? 0.3 : 0.1} />
      </Cylinder>
      
      {/* HIPAA Shield */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <group position={[-1.5, 2.5, 0]}>
          <Octahedron args={[0.3]}>
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
          </Octahedron>
          <Text position={[0, -0.5, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
            HIPAA
          </Text>
        </group>
      </Float>
      
      {/* GDPR Shield */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <group position={[1.5, 2.5, 0]}>
          <Octahedron args={[0.3]}>
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
          </Octahedron>
          <Text position={[0, -0.5, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
            GDPR
          </Text>
        </group>
      </Float>
      
      {/* Core Data Flow */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
        <group position={[0, 3.5, 0]}>
          <Sphere args={[0.2]}>
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
          </Sphere>
          <Text position={[0, -0.4, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
            Core Data
          </Text>
        </group>
      </Float>
      
      {/* Clickable area */}
      <Cylinder 
        args={[2, 2, 3]} 
        position={[0, 1.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Cylinder>
      
      {hovered && (
        <Html position={[0, 4.5, 0]} center>
          <div className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm max-w-xs">
            <div className="font-bold text-green-300">CVS Healthcare Chamber</div>
            <div className="text-xs mt-1">Eligibility Checker</div>
            <div className="text-xs text-blue-300 mt-1">Offline Core Data Flows</div>
            <div className="text-xs text-purple-300 mt-1">HIPAA/GDPR Compliant</div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Wells Fargo Banking Vault Component
function WellsFargoBankingVault({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Banking Vault */}
      <Box args={[5, 4, 3]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#1e40af" emissive="#1e40af" emissiveIntensity={hovered ? 0.2 : 0.05} />
      </Box>
      
      {/* Security Doors */}
      <Box args={[0.5, 2, 0.2]} position={[-2.2, 2, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      <Box args={[0.5, 2, 0.2]} position={[2.2, 2, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      
      {/* Security Features */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <group position={[-1, 4, 0]}>
          <Sphere args={[0.2]}>
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
          </Sphere>
          <Text position={[0, -0.4, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
            Auth
          </Text>
        </group>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.3}>
        <group position={[0, 4, 0]}>
          <Sphere args={[0.2]}>
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
          </Sphere>
          <Text position={[0, -0.4, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
            GraphQL
          </Text>
        </group>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.3}>
        <group position={[1, 4, 0]}>
          <Sphere args={[0.2]}>
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
          </Sphere>
          <Text position={[0, -0.4, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
            CI/CD
          </Text>
        </group>
      </Float>
      
      {/* Clickable area */}
      <Box 
        args={[5, 4, 3]} 
        position={[0, 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Box>
      
      {hovered && (
        <Html position={[0, 5.5, 0]} center>
          <div className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm max-w-xs">
            <div className="font-bold text-blue-300">Wells Fargo Banking Vault</div>
            <div className="text-xs mt-1">Secure Authentication</div>
            <div className="text-xs text-purple-300 mt-1">GraphQL Schemas</div>
            <div className="text-xs text-green-300 mt-1">CI/CD Pipelines</div>
            <div className="text-xs text-red-300 mt-1">Heavy Security</div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Project Hologram Component
function ProjectHologram({ 
  position, 
  project, 
  color 
}: { 
  position: [number, number, number], 
  project: any, 
  color: string 
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Project Hologram */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <group position={[0, 1, 0]}>
          <Box args={[1, 1.5, 0.1]}>
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </Box>
          
          {/* Project Icon */}
          <Text position={[0, 0, 0.1]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
            {project.icon}
          </Text>
        </group>
      </Float>
      
      {/* Project Title */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
      
      {/* Tech Orbs */}
      {project.tech.slice(0, 4).map((tech: string, index: number) => {
        const angle = (index / 4) * Math.PI * 2
        const radius = 1.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <Float key={tech} speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
            <group position={[x, 0.5, z]}>
              <Sphere args={[0.15]}>
                <meshStandardMaterial color={color} />
              </Sphere>
              <Text position={[0, -0.3, 0]} fontSize={0.08} color="white" anchorX="center" anchorY="middle">
                {tech}
              </Text>
            </group>
          </Float>
        )
      })}
      
      {/* Clickable area */}
      <Box 
        args={[2, 2, 2]} 
        position={[0, 1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Box>
      
      {hovered && (
        <Html position={[0, 2.5, 0]} center>
          <div className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm max-w-xs">
            <div className="font-bold">{project.title}</div>
            <div className="text-xs text-blue-200 mt-1">{project.description}</div>
            <div className="text-xs text-green-300 mt-1">GitHub: {project.github}</div>
            <div className="text-xs text-purple-300 mt-1">Tech: {project.tech.join(', ')}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Contact Portal Component
function ContactPortal({ 
  position, 
  unlocked, 
  onEnter 
}: { 
  position: [number, number, number], 
  unlocked: boolean, 
  onEnter: () => void 
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current && unlocked) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Portal Ring */}
      <Torus args={[1.5, 0.2, 16, 32]} onClick={unlocked ? onEnter : undefined}>
        <meshStandardMaterial 
          color={unlocked ? "#f59e0b" : "#6b7280"} 
          emissive={unlocked ? "#f59e0b" : "#6b7280"} 
          emissiveIntensity={unlocked ? 0.5 : 0.1} 
        />
      </Torus>
      
      {/* Portal Center */}
      <Sphere args={[1]} onClick={unlocked ? onEnter : undefined}>
        <meshStandardMaterial 
          color={unlocked ? "#f59e0b" : "#6b7280"} 
          transparent 
          opacity={0.3}
          emissive={unlocked ? "#f59e0b" : "#6b7280"}
          emissiveIntensity={unlocked ? 0.2 : 0.05}
        />
      </Sphere>
      
      {/* Portal Text */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.25}
        color={unlocked ? "#f59e0b" : "#6b7280"}
        anchorX="center"
        anchorY="middle"
      >
        {unlocked ? "ENTER CONTACT" : "LOCKED"}
      </Text>
      
      {/* Energy particles */}
      {unlocked && (
        <Sparkles count={100} scale={[3, 3, 3]} size={3} speed={1} color="#f59e0b" />
      )}
    </group>
  )
}

// Main Immersive Mode Component
export default function ImmersiveMode({ currentZone, onZoneChange }: ImmersiveModeProps) {
  const [collectedSkills, setCollectedSkills] = useState<string[]>([])
  const [showContactForm, setShowContactForm] = useState(false)
  
  const projects = [
    { 
      id: 'smart-expense', 
      title: 'Smart Expense Tracker', 
      description: 'AI-powered expense management with receipt scanning',
      icon: '💳',
      github: 'smart-expense-tracker',
      tech: ['SwiftUI', 'Core ML', 'Vision', 'Core Data']
    },
    { 
      id: 'women-safety', 
      title: 'Women Safety Alert IoT', 
      description: 'IoT-based safety system with real-time alerts',
      icon: '🚨',
      github: 'women-safety-iot',
      tech: ['SwiftUI', 'IoT', 'Bluetooth', 'Firebase']
    },
    { 
      id: 'pulse-incident', 
      title: 'Pulse Incident Management', 
      description: 'Enterprise AR-powered incident management platform',
      icon: '📱',
      github: 'pulse-incident-ios',
      tech: ['SwiftUI', 'ARKit', 'Core Data', 'CloudKit']
    }
  ]

  const handleContactPortal = () => {
    if (collectedSkills.length >= 3) {
      setShowContactForm(true)
    }
  }

  const renderCurrentZone = () => {
    switch (currentZone) {
      case 'intro':
        return (
          <group>
            <HeroAvatar position={[0, 0, 0]} />
            <Text
              position={[0, 4, 0]}
              fontSize={0.4}
              color="#3b82f6"
              anchorX="center"
              anchorY="middle"
            >
              Full Mobile Stack iOS Developer
            </Text>
            <Text
              position={[0, 3.5, 0]}
              fontSize={0.2}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              6+ Years Experience | India → USA
            </Text>
            
            {/* Zone Portals */}
            <ContactPortal 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('learning')} 
            />
            <ContactPortal 
              position={[6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('wipro')} 
            />
          </group>
        )
      
      case 'learning':
        return (
          <group>
            <Text
              position={[0, 5, 0]}
              fontSize={0.3}
              color="#10b981"
              anchorX="center"
              anchorY="middle"
            >
              Learning Zone: India → USA
            </Text>
            <Text
              position={[0, 4.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              Educational Journey & Foundation
            </Text>
            
            <CareerPath position={[0, 0, 0]} />
            
            {/* Back to intro */}
            <ContactPortal 
              position={[0, -4, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'wipro':
        return (
          <group>
            <Text
              position={[0, 6, 0]}
              fontSize={0.3}
              color="#6b7280"
              anchorX="center"
              anchorY="middle"
            >
              Wipro Legacy Lab
            </Text>
            <Text
              position={[0, 5.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              UIKit → Swift Migration Journey
            </Text>
            
            <WiproLegacyLab position={[0, 0, 0]} />
            
            {/* Next zone */}
            <ContactPortal 
              position={[6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('cvs')} 
            />
            
            {/* Back to intro */}
            <ContactPortal 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'cvs':
        return (
          <group>
            <Text
              position={[0, 6, 0]}
              fontSize={0.3}
              color="#059669"
              anchorX="center"
              anchorY="middle"
            >
              CVS Healthcare Chamber
            </Text>
            <Text
              position={[0, 5.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              HIPAA/GDPR Compliant Development
            </Text>
            
            <CVSHealthcareChamber position={[0, 0, 0]} />
            
            {/* Next zone */}
            <ContactPortal 
              position={[6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('wells')} 
            />
            
            {/* Back to intro */}
            <ContactPortal 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'wells':
        return (
          <group>
            <Text
              position={[0, 6, 0]}
              fontSize={0.3}
              color="#1e40af"
              anchorX="center"
              anchorY="middle"
            >
              Wells Fargo Banking Vault
            </Text>
            <Text
              position={[0, 5.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              Enterprise Security & GraphQL
            </Text>
            
            <WellsFargoBankingVault position={[0, 0, 0]} />
            
            {/* Next zone */}
            <ContactPortal 
              position={[6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('projects')} 
            />
            
            {/* Back to intro */}
            <ContactPortal 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'projects':
        return (
          <group>
            <Text
              position={[0, 6, 0]}
              fontSize={0.3}
              color="#8b5cf6"
              anchorX="center"
              anchorY="middle"
            >
              Projects Zone
            </Text>
            <Text
              position={[0, 5.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              GitHub Integration & Live Projects
            </Text>
            
            {projects.map((project, index) => (
              <ProjectHologram
                key={project.id}
                position={[(index - 1) * 5, 0, 0]}
                project={project}
                color={['#ef4444', '#10b981', '#3b82f6'][index]}
              />
            ))}
            
            {/* Contact zone */}
            <ContactPortal 
              position={[0, -4, 0]} 
              unlocked={collectedSkills.length >= 3} 
              onEnter={() => onZoneChange('contact')} 
            />
            
            {/* Back to intro */}
            <ContactPortal 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'contact':
        return (
          <group>
            <Text
              position={[0, 4, 0]}
              fontSize={0.3}
              color="#f59e0b"
              anchorX="center"
              anchorY="middle"
            >
              Contact Portal
            </Text>
            <Text
              position={[0, 3.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              Ready to Connect?
            </Text>
            
            <ContactPortal 
              position={[0, 0, 0]} 
              unlocked={true} 
              onEnter={handleContactPortal} 
            />
            
            {/* Back to intro */}
            <ContactPortal 
              position={[0, -4, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-10">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 3, 10], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.3} color="#3b82f6" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#8b5cf6" />
        <Environment preset="night" />

        <Suspense fallback={null}>
          {renderCurrentZone()}
        </Suspense>

        {/* Global Effects */}
        <Sparkles count={1000} size={0.5} speed={0.5} opacity={0.8} scale={[20, 20, 20]} color="#ffffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* EffectComposer */}
        {/* <EffectComposer>
          <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} height={300} />
          <Glitch delay={[0.5, 1.5]} duration={[0.1, 0.3]} strength={[0.05, 0.1]} ratio={0.85} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer> */}

        <OrbitControls
          enablePan={true}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={8}
          maxDistance={20}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* HUD Overlay */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="text-white text-sm mb-2">Career Journey: {currentZone}</div>
          <div className="text-blue-200 text-xs">
            Progress: {['intro', 'learning', 'wipro', 'cvs', 'wells', 'projects', 'contact'].indexOf(currentZone) + 1}/7
          </div>
        </div>
      </div>
      
      {/* Contact Form Overlay */}
      {showContactForm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Portal Unlocked!</h2>
            <p className="text-gray-600 mb-6">You've completed the career journey. Ready to connect?</p>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full p-3 border rounded-lg"
              />
              <textarea 
                placeholder="Your message" 
                rows={4}
                className="w-full p-3 border rounded-lg"
              />
              <Link
                href="/contact"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Go to Contact Page
              </Link>
            </div>
            <button 
              onClick={() => setShowContactForm(false)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Close Portal
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}