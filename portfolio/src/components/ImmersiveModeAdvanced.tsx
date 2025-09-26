'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Html, Text, Sphere, Box, Cylinder, Torus, Octahedron, Stars, Float, Sparkles, Plane, Effects } from '@react-three/drei'
// import { EffectComposer, Bloom, Glitch, ChromaticAberration, DepthOfField, Vignette } from '@react-three/postprocessing'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CustomShaderMaterial, EnergyField, HolographicDisplay, ParticleSystem, FluidMotion } from './3d/CustomShaders'
import { DynamicLighting, VolumetricLight, EnvironmentLighting, InteractiveLight, GlowingOrb, ShadowCatcher } from './3d/AdvancedLighting'

interface ImmersiveModeAdvancedProps {
  currentZone: 'intro' | 'learning' | 'wipro' | 'cvs' | 'wells' | 'projects' | 'contact'
  onZoneChange: (zone: 'intro' | 'learning' | 'wipro' | 'cvs' | 'wells' | 'projects' | 'contact') => void
}

// Enhanced Hero Avatar with Custom Shaders
function HeroAvatarAdvanced({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Body with custom shader */}
      <Cylinder args={[0.4, 0.5, 1.4]} position={[0, 0, 0]}>
        <CustomShaderMaterial color="#3b82f6" intensity={1.2} amplitude={0.1} />
      </Cylinder>
      
      {/* Head with holographic effect */}
      <HolographicDisplay position={[0, 0.9, 0]}>
        <Sphere args={[0.3]} position={[0, 0, 0]}>
          <CustomShaderMaterial type="holographic" />
        </Sphere>
      </HolographicDisplay>
      
      {/* Eyes with glowing effect */}
      <GlowingOrb position={[-0.1, 0.95, 0.25]} color="#ffffff" size={0.06} intensity={3.0} />
      <GlowingOrb position={[0.1, 0.95, 0.25]} color="#ffffff" size={0.06} intensity={3.0} />
      
      {/* Arms with energy field */}
      <EnergyField position={[-0.6, 0.2, 0]} color="#1e40af" />
      <EnergyField position={[0.6, 0.2, 0]} color="#1e40af" />
      
      {/* Particle aura */}
      <ParticleSystem count={500} color="#3b82f6" />
    </group>
  )
}

// Enhanced Career Path with Fluid Motion
function CareerPathAdvanced({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Path with fluid motion */}
      <FluidMotion position={[0, 0, 0]} size={[8, 1]} />
      
      {/* India Flag with custom shader */}
      <Box args={[0.5, 0.3, 0.1]} position={[-3.5, 0.5, 0]}>
        <CustomShaderMaterial color="#ff6b6b" intensity={1.5} />
      </Box>
      <Text position={[-3.5, 1, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        🇮🇳 India
      </Text>
      
      {/* USA Flag with custom shader */}
      <Box args={[0.5, 0.3, 0.1]} position={[3.5, 0.5, 0]}>
        <CustomShaderMaterial color="#3b82f6" intensity={1.5} />
      </Box>
      <Text position={[3.5, 1, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        🇺🇸 USA
      </Text>
      
      {/* Education Institutions with holographic display */}
      <HolographicDisplay position={[-2, 0.8, 0]}>
        <Text position={[0, 0, 0]} fontSize={0.12} color="#10b981" anchorX="center" anchorY="middle">
          SRM University
        </Text>
      </HolographicDisplay>
      
      <HolographicDisplay position={[2, 0.8, 0]}>
        <Text position={[0, 0, 0]} fontSize={0.12} color="#10b981" anchorX="center" anchorY="middle">
          Wichita State
        </Text>
      </HolographicDisplay>
      
      {/* Moving particles with energy field */}
      <EnergyField position={[0, 0.3, 0]} color="#f59e0b" />
    </group>
  )
}

// Enhanced Wipro Legacy Lab
function WiproLegacyLabAdvanced({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Legacy Lab Building with custom shader */}
      <Box args={[4, 3, 4]} position={[0, 1.5, 0]}>
        <CustomShaderMaterial 
          color="#6b7280" 
          intensity={hovered ? 1.5 : 0.8} 
          amplitude={hovered ? 0.2 : 0.1} 
        />
      </Box>
      
      {/* Old UIKit Components with energy fields */}
      <EnergyField position={[-1, 2, 1.5]} color="#ef4444" />
      <Text position={[-1, 2.8, 1.5]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        UIKit
      </Text>
      
      {/* Objective-C Code with energy field */}
      <EnergyField position={[1, 2, 1.5]} color="#f59e0b" />
      <Text position={[1, 2.8, 1.5]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        Obj-C
      </Text>
      
      {/* Swift Migration with holographic display */}
      <HolographicDisplay position={[0, 3.5, 0]}>
        <CustomShaderMaterial type="holographic" />
        <Text position={[0, 0, 0.1]} fontSize={0.1} color="#10b981" anchorX="center" anchorY="middle">
          Swift
        </Text>
      </HolographicDisplay>
      
      {/* Volumetric lighting */}
      <VolumetricLight position={[0, 5, 0]} color="#10b981" intensity={0.8} />
      
      {/* Clickable area */}
      <Box 
        args={[4, 3, 4]} 
        position={[0, 1.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Box>
      
      {hovered && (
        <Html position={[0, 4.5, 0]} center>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm max-w-xs"
          >
            <div className="font-bold text-blue-300">Wipro Legacy Lab</div>
            <div className="text-xs mt-1">UIKit → Swift Migration</div>
            <div className="text-xs text-green-300 mt-1">Legacy System Modernization</div>
          </motion.div>
        </Html>
      )}
    </group>
  )
}

// Enhanced CVS Healthcare Chamber
function CVSHealthcareChamberAdvanced({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Healthcare Chamber with custom shader */}
      <Cylinder args={[2, 2, 3]} position={[0, 1.5, 0]}>
        <CustomShaderMaterial 
          color="#059669" 
          intensity={hovered ? 1.8 : 1.2} 
          amplitude={0.15} 
        />
      </Cylinder>
      
      {/* HIPAA Shield with glowing orb */}
      <GlowingOrb position={[-1.5, 2.5, 0]} color="#3b82f6" size={0.3} intensity={2.0} />
      <Text position={[-1.5, 2.8, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        HIPAA
      </Text>
      
      {/* GDPR Shield with glowing orb */}
      <GlowingOrb position={[1.5, 2.5, 0]} color="#8b5cf6" size={0.3} intensity={2.0} />
      <Text position={[1.5, 2.8, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        GDPR
      </Text>
      
      {/* Core Data Flow with energy field */}
      <EnergyField position={[0, 3.5, 0]} color="#10b981" />
      <Text position={[0, 3.8, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        Core Data
      </Text>
      
      {/* Volumetric lighting */}
      <VolumetricLight position={[0, 6, 0]} color="#059669" intensity={1.0} />
      
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm max-w-xs"
          >
            <div className="font-bold text-green-300">CVS Healthcare Chamber</div>
            <div className="text-xs mt-1">Eligibility Checker</div>
            <div className="text-xs text-blue-300 mt-1">Offline Core Data Flows</div>
            <div className="text-xs text-purple-300 mt-1">HIPAA/GDPR Compliant</div>
          </motion.div>
        </Html>
      )}
    </group>
  )
}

// Enhanced Wells Fargo Banking Vault
function WellsFargoBankingVaultAdvanced({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Banking Vault with custom shader */}
      <Box args={[5, 4, 3]} position={[0, 2, 0]}>
        <CustomShaderMaterial 
          color="#1e40af" 
          intensity={hovered ? 1.5 : 1.0} 
          amplitude={0.1} 
        />
      </Box>
      
      {/* Security Doors with energy fields */}
      <EnergyField position={[-2.2, 2, 0]} color="#374151" />
      <EnergyField position={[2.2, 2, 0]} color="#374151" />
      
      {/* Security Features with glowing orbs */}
      <GlowingOrb position={[-1, 4, 0]} color="#ef4444" size={0.2} intensity={2.5} />
      <Text position={[-1, 4.3, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        Auth
      </Text>
      
      <GlowingOrb position={[0, 4, 0]} color="#8b5cf6" size={0.2} intensity={2.5} />
      <Text position={[0, 4.3, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        GraphQL
      </Text>
      
      <GlowingOrb position={[1, 4, 0]} color="#10b981" size={0.2} intensity={2.5} />
      <Text position={[1, 4.3, 0]} fontSize={0.1} color="white" anchorX="center" anchorY="middle">
        CI/CD
      </Text>
      
      {/* Volumetric lighting */}
      <VolumetricLight position={[0, 7, 0]} color="#1e40af" intensity={1.2} />
      
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm max-w-xs"
          >
            <div className="font-bold text-blue-300">Wells Fargo Banking Vault</div>
            <div className="text-xs mt-1">Secure Authentication</div>
            <div className="text-xs text-purple-300 mt-1">GraphQL Schemas</div>
            <div className="text-xs text-green-300 mt-1">CI/CD Pipelines</div>
            <div className="text-xs text-red-300 mt-1">Heavy Security</div>
          </motion.div>
        </Html>
      )}
    </group>
  )
}

// Enhanced Project Hologram
function ProjectHologramAdvanced({ 
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
      {/* Project Hologram with custom shader */}
      <HolographicDisplay position={[0, 1, 0]}>
        <Box args={[1, 1.5, 0.1]} position={[0, 0, 0]}>
          <CustomShaderMaterial color={color} type="holographic" />
        </Box>
        
        {/* Project Icon */}
        <Text position={[0, 0, 0.1]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          {project.icon}
        </Text>
      </HolographicDisplay>
      
      {/* Project Title with energy field */}
      <EnergyField position={[0, 0, 0]} color={color} />
      <Text position={[0, 0, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
        {project.title}
      </Text>
      
      {/* Tech Orbs with glowing effects */}
      {project.tech.slice(0, 4).map((tech: string, index: number) => {
        const angle = (index / 4) * Math.PI * 2
        const radius = 1.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <group key={tech} position={[x, 0.5, z]}>
            <GlowingOrb position={[0, 0, 0]} color={color} size={0.15} intensity={1.5} />
            <Text position={[0, -0.3, 0]} fontSize={0.08} color="white" anchorX="center" anchorY="middle">
              {tech}
            </Text>
          </group>
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 text-white px-4 py-3 rounded-lg text-sm max-w-xs"
          >
            <div className="font-bold">{project.title}</div>
            <div className="text-xs text-blue-200 mt-1">{project.description}</div>
            <div className="text-xs text-green-300 mt-1">GitHub: {project.github}</div>
            <div className="text-xs text-purple-300 mt-1">Tech: {project.tech.join(', ')}</div>
          </motion.div>
        </Html>
      )}
    </group>
  )
}

// Enhanced Contact Portal
function ContactPortalAdvanced({ 
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
      {/* Portal Ring with custom shader */}
      <Torus args={[1.5, 0.2, 16, 32]} onClick={unlocked ? onEnter : undefined}>
        <CustomShaderMaterial 
          color={unlocked ? "#f59e0b" : "#6b7280"} 
          intensity={unlocked ? 2.0 : 0.5}
          amplitude={unlocked ? 0.3 : 0.1}
        />
      </Torus>
      
      {/* Portal Center with holographic effect */}
      <HolographicDisplay position={[0, 0, 0]}>
        <Sphere args={[1]} onClick={unlocked ? onEnter : undefined}>
          <CustomShaderMaterial 
            color={unlocked ? "#f59e0b" : "#6b7280"} 
            type="holographic"
          />
        </Sphere>
      </HolographicDisplay>
      
      {/* Portal Text with energy field */}
      <EnergyField position={[0, -2.5, 0]} color={unlocked ? "#f59e0b" : "#6b7280"} />
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
        <Sparkles count={200} scale={[3, 3, 3]} size={3} speed={1} color="#f59e0b" />
      )}
    </group>
  )
}

// Main Advanced Immersive Mode Component
export default function ImmersiveModeAdvanced({ currentZone, onZoneChange }: ImmersiveModeAdvancedProps) {
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
            <HeroAvatarAdvanced position={[0, 0, 0]} />
            <HolographicDisplay position={[0, 4, 0]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.4}
                color="#3b82f6"
                anchorX="center"
                anchorY="middle"
              >
                Full Mobile Stack iOS Developer
              </Text>
            </HolographicDisplay>
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
            <ContactPortalAdvanced 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('learning')} 
            />
            <ContactPortalAdvanced 
              position={[6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('wipro')} 
            />
          </group>
        )
      
      case 'learning':
        return (
          <group>
            <HolographicDisplay position={[0, 5, 0]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.3}
                color="#10b981"
                anchorX="center"
                anchorY="middle"
              >
                Learning Zone: India → USA
              </Text>
            </HolographicDisplay>
            <Text
              position={[0, 4.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              Educational Journey & Foundation
            </Text>
            
            <CareerPathAdvanced position={[0, 0, 0]} />
            
            {/* Back to intro */}
            <ContactPortalAdvanced 
              position={[0, -4, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'wipro':
        return (
          <group>
            <HolographicDisplay position={[0, 6, 0]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.3}
                color="#6b7280"
                anchorX="center"
                anchorY="middle"
              >
                Wipro Legacy Lab
              </Text>
            </HolographicDisplay>
            <Text
              position={[0, 5.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              UIKit → Swift Migration Journey
            </Text>
            
            <WiproLegacyLabAdvanced position={[0, 0, 0]} />
            
            {/* Next zone */}
            <ContactPortalAdvanced 
              position={[6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('cvs')} 
            />
            
            {/* Back to intro */}
            <ContactPortalAdvanced 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'cvs':
        return (
          <group>
            <HolographicDisplay position={[0, 6, 0]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.3}
                color="#059669"
                anchorX="center"
                anchorY="middle"
              >
                CVS Healthcare Chamber
              </Text>
            </HolographicDisplay>
            <Text
              position={[0, 5.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              HIPAA/GDPR Compliant Development
            </Text>
            
            <CVSHealthcareChamberAdvanced position={[0, 0, 0]} />
            
            {/* Next zone */}
            <ContactPortalAdvanced 
              position={[6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('wells')} 
            />
            
            {/* Back to intro */}
            <ContactPortalAdvanced 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'wells':
        return (
          <group>
            <HolographicDisplay position={[0, 6, 0]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.3}
                color="#1e40af"
                anchorX="center"
                anchorY="middle"
              >
                Wells Fargo Banking Vault
              </Text>
            </HolographicDisplay>
            <Text
              position={[0, 5.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              Enterprise Security & GraphQL
            </Text>
            
            <WellsFargoBankingVaultAdvanced position={[0, 0, 0]} />
            
            {/* Next zone */}
            <ContactPortalAdvanced 
              position={[6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('projects')} 
            />
            
            {/* Back to intro */}
            <ContactPortalAdvanced 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'projects':
        return (
          <group>
            <HolographicDisplay position={[0, 6, 0]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.3}
                color="#8b5cf6"
                anchorX="center"
                anchorY="middle"
              >
                Projects Zone
              </Text>
            </HolographicDisplay>
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
              <ProjectHologramAdvanced
                key={project.id}
                position={[(index - 1) * 5, 0, 0]}
                project={project}
                color={['#ef4444', '#10b981', '#3b82f6'][index]}
              />
            ))}
            
            {/* Contact zone */}
            <ContactPortalAdvanced 
              position={[0, -4, 0]} 
              unlocked={collectedSkills.length >= 3} 
              onEnter={() => onZoneChange('contact')} 
            />
            
            {/* Back to intro */}
            <ContactPortalAdvanced 
              position={[-6, 0, 0]} 
              unlocked={true} 
              onEnter={() => onZoneChange('intro')} 
            />
          </group>
        )
      
      case 'contact':
        return (
          <group>
            <HolographicDisplay position={[0, 4, 0]}>
              <Text
                position={[0, 0, 0]}
                fontSize={0.3}
                color="#f59e0b"
                anchorX="center"
                anchorY="middle"
              >
                Contact Portal
              </Text>
            </HolographicDisplay>
            <Text
              position={[0, 3.5, 0]}
              fontSize={0.15}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              Ready to Connect?
            </Text>
            
            <ContactPortalAdvanced 
              position={[0, 0, 0]} 
              unlocked={true} 
              onEnter={handleContactPortal} 
            />
            
            {/* Back to intro */}
            <ContactPortalAdvanced 
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
        {/* Advanced Lighting System */}
        <DynamicLighting />
        <EnvironmentLighting />
        <InteractiveLight />
        <ShadowCatcher />

        <Suspense fallback={null}>
          {renderCurrentZone()}
        </Suspense>

        {/* Enhanced Global Effects */}
        <Sparkles count={2000} size={1.0} speed={1.0} opacity={1.0} scale={[30, 30, 30]} color="#ffffff" />
        <Sparkles count={1000} size={0.3} speed={2.0} opacity={0.6} scale={[15, 15, 15]} color="#3b82f6" />
        <Sparkles count={800} size={0.4} speed={1.5} opacity={0.7} scale={[20, 20, 20]} color="#8b5cf6" />
        <Stars radius={150} depth={80} count={8000} factor={6} saturation={0} fade speed={1.5} />

        {/* Advanced Post-Processing Effects - Temporarily disabled due to compatibility issues */}
        {/* <EffectComposer>
          <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} height={300} />
          <Glitch delay={[0.5, 1.5]} duration={[0.1, 0.3]} strength={[0.05, 0.1]} ratio={0.85} />
          <ChromaticAberration offset={[0.001, 0.001]} />
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
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
      
      {/* Enhanced HUD Overlay */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/20"
        >
          <div className="text-white text-sm mb-2">Career Journey: {currentZone}</div>
          <div className="text-blue-200 text-xs">
            Progress: {['intro', 'learning', 'wipro', 'cvs', 'wells', 'projects', 'contact'].indexOf(currentZone) + 1}/7
          </div>
          <div className="text-green-200 text-xs mt-1">
            Enhanced Shader Effects Active
          </div>
          <div className="text-purple-200 text-xs mt-1">
            Custom GLSL + Dynamic Lighting
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced Contact Form Overlay */}
      {showContactForm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
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
