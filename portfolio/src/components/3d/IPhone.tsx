'use client'

import { useGLTF, Html, Float, Text, Sphere, Torus } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface IPhoneProps {
  onClick?: () => void
  position?: [number, number, number]
  scale?: [number, number, number]
}

export default function IPhone({ onClick, position = [0, 0, 0], scale = [1, 1, 1] }: IPhoneProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // Enhanced iPhone geometry with more detail
  const geometry = useMemo(() => {
    const phoneGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.05)
    const screenGeometry = new THREE.BoxGeometry(0.35, 0.7, 0.01)
    const homeButtonGeometry = new THREE.CircleGeometry(0.03, 16)
    const cameraGeometry = new THREE.CircleGeometry(0.05, 16)
    const speakerGeometry = new THREE.BoxGeometry(0.15, 0.01, 0.01)
    const notchGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.01)
    
    return { phoneGeometry, screenGeometry, homeButtonGeometry, cameraGeometry, speakerGeometry, notchGeometry }
  }, [])

  const materials = useMemo(() => {
    const phoneMaterial = new THREE.MeshStandardMaterial({ 
      color: hovered ? '#3b82f6' : '#1f2937',
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.2
    })
    const screenMaterial = new THREE.MeshStandardMaterial({ 
      color: '#000000',
      emissive: hovered ? '#1e40af' : '#1a1a1a',
      emissiveIntensity: hovered ? 0.6 : 0.3,
      transparent: true,
      opacity: 0.95
    })
    const homeButtonMaterial = new THREE.MeshStandardMaterial({ 
      color: '#ffffff',
      metalness: 0.1,
      roughness: 0.3
    })
    const cameraMaterial = new THREE.MeshStandardMaterial({ 
      color: '#1f2937',
      metalness: 0.8,
      roughness: 0.2
    })
    const speakerMaterial = new THREE.MeshStandardMaterial({ 
      color: '#374151',
      metalness: 0.7,
      roughness: 0.3
    })
    const notchMaterial = new THREE.MeshStandardMaterial({ 
      color: '#000000',
      metalness: 0.1,
      roughness: 0.1
    })
    
    return { phoneMaterial, screenMaterial, homeButtonMaterial, cameraMaterial, speakerMaterial, notchMaterial }
  }, [hovered])

  // Enhanced animation with floating effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={[0, Math.PI / 4, 0]} scale={scale}>
      {/* Phone Body */}
      <mesh 
        geometry={geometry.phoneGeometry} 
        material={materials.phoneMaterial} 
        castShadow
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      
      {/* Enhanced Interactive Hover Effect */}
      {hovered && (
        <Html position={[0, 0.8, 0]} center>
          <div className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-md rounded-xl p-4 border border-white/30 text-white text-sm shadow-2xl">
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-bold text-lg">iOS Developer</div>
              <div className="text-xs text-blue-300 mb-2">Shashank Bejjanki</div>
              <div className="text-xs text-green-300">Click to explore portfolio</div>
              <div className="mt-2 text-xs text-yellow-300">
                ⭐ 4.8 Rating • 📈 38K+ Downloads • 💰 $110K+ Revenue
              </div>
            </div>
          </div>
        </Html>
      )}
      
      {/* Screen with Dynamic Content */}
      <mesh 
        geometry={geometry.screenGeometry} 
        material={materials.screenMaterial}
        position={[0, 0, 0.03]}
      />
      
      {/* Dynamic Screen Content */}
      {hovered && (
        <Html position={[0, 0, 0.05]} center>
          <div className="w-32 h-56 bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden">
            <div className="p-2 text-white text-xs">
              <div className="text-center mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full mx-auto mb-1"></div>
                <div className="font-bold">iOS Portfolio</div>
              </div>
              <div className="space-y-1">
                <div className="bg-green-500/20 rounded px-1">Pulse Incident</div>
                <div className="bg-blue-500/20 rounded px-1">Weather Pro</div>
                <div className="bg-purple-500/20 rounded px-1">Task Manager</div>
                <div className="bg-yellow-500/20 rounded px-1">Analytics</div>
              </div>
              <div className="mt-2 text-center text-xs text-gray-400">
                Touch to explore
              </div>
            </div>
          </div>
        </Html>
      )}
      
      {/* Notch */}
      <mesh 
        geometry={geometry.notchGeometry} 
        material={materials.notchMaterial}
        position={[0, 0.32, 0.03]}
      />
      
      {/* Camera Bump */}
      <mesh 
        geometry={geometry.cameraGeometry} 
        material={materials.cameraMaterial}
        position={[0, 0.2, 0.03]}
      />
      
      {/* Speaker */}
      <mesh 
        geometry={geometry.speakerGeometry} 
        material={materials.speakerMaterial}
        position={[0, 0.35, 0.03]}
      />
      
      {/* Side Buttons */}
      <mesh 
        geometry={new THREE.BoxGeometry(0.01, 0.15, 0.01)} 
        material={materials.phoneMaterial}
        position={[0.21, 0.1, 0]}
      />
      <mesh 
        geometry={new THREE.BoxGeometry(0.01, 0.15, 0.01)} 
        material={materials.phoneMaterial}
        position={[0.21, -0.1, 0]}
      />
      
      {/* Holographic Rings when hovered */}
      {hovered && (
        <>
          <Torus args={[0.6, 0.02, 8, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color="#3b82f6" 
              emissive="#3b82f6" 
              emissiveIntensity={0.3}
              transparent
              opacity={0.5}
            />
          </Torus>
          <Torus args={[0.8, 0.01, 8, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color="#8b5cf6" 
              emissive="#8b5cf6" 
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
            />
          </Torus>
        </>
      )}
    </group>
  )
}
