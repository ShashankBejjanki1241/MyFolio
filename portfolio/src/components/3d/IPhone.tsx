'use client'

import { useGLTF } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDebug, performanceMonitor } from '@/utils/debug'

interface IPhoneProps {
  onClick?: () => void
}

export default function IPhone({ onClick }: IPhoneProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [debugMode, setDebugMode] = useState(false)
  const [hovered, setHovered] = useState(false)
  const debug = useDebug('IPhone')
  
  // For now, we'll create a more detailed iPhone-like shape since we don't have a GLB model
  // In production, you would load: useGLTF(process.env.NEXT_PUBLIC_ASSETS_BASE + '/models/iphone14.glb')
  
  debug.logMount()
  
  const geometry = useMemo(() => {
    const phoneGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.05)
    const screenGeometry = new THREE.BoxGeometry(0.35, 0.7, 0.01)
    const homeButtonGeometry = new THREE.CircleGeometry(0.03, 16)
    const cameraGeometry = new THREE.CircleGeometry(0.05, 16)
    const speakerGeometry = new THREE.BoxGeometry(0.15, 0.01, 0.01)
    
    return { phoneGeometry, screenGeometry, homeButtonGeometry, cameraGeometry, speakerGeometry }
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
      emissiveIntensity: hovered ? 0.4 : 0.2,
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
    
    return { phoneMaterial, screenMaterial, homeButtonMaterial, cameraMaterial, speakerMaterial }
  }, [hovered])

  // Add subtle rotation animation
  useFrame((state) => {
    performanceMonitor.startTimer('iPhone-animation')
    
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      
      if (debugMode) {
        debug.debug('Animation frame', {
          elapsedTime: state.clock.elapsedTime,
          rotation: meshRef.current.rotation.y
        })
      }
    }
    
    const renderTime = performanceMonitor.endTimer('iPhone-animation')
    if (debugMode && renderTime > 16.67) {
      debug.warn('Slow animation frame', `${renderTime.toFixed(2)}ms`)
    }
  })

  return (
    <group ref={meshRef} position={[0, -0.6, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* Phone Body */}
      <mesh 
        geometry={geometry.phoneGeometry} 
        material={materials.phoneMaterial} 
        castShadow
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      
      {/* Screen */}
      <mesh 
        geometry={geometry.screenGeometry} 
        material={materials.screenMaterial}
        position={[0, 0, 0.03]}
      />
      
      {/* Home Button */}
      <mesh 
        geometry={geometry.homeButtonGeometry} 
        material={materials.homeButtonMaterial}
        position={[0, -0.25, 0.03]}
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
      
      {/* Debug Controls */}
      {debugMode && (
        <mesh 
          onClick={() => {
            setDebugMode(false)
            debug.info('Debug mode disabled')
          }}
          position={[0, -0.5, 0]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}
      
      {/* Debug Info Display */}
      {debugMode && (
        <mesh position={[0, 0.5, 0]}>
          <planeGeometry args={[0.3, 0.2]} />
          <meshBasicMaterial color="black" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  )
}
