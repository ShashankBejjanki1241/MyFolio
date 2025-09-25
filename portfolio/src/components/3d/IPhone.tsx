'use client'

import { useGLTF, Html } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface IPhoneProps {
  onClick?: () => void
}

export default function IPhone({ onClick }: IPhoneProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // For now, we'll create a more detailed iPhone-like shape since we don't have a GLB model
  // In production, you would load: useGLTF(process.env.NEXT_PUBLIC_ASSETS_BASE + '/models/iphone14.glb')
  
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
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
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
      
      {/* Interactive Hover Effect */}
      {hovered && (
        <Html position={[0, 0.8, 0]} center>
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/30 text-white text-sm">
            <div className="text-center">
              <div className="text-lg mb-1">📱</div>
              <div className="font-semibold">iOS Developer</div>
              <div className="text-xs text-blue-300">Click to explore portfolio</div>
            </div>
          </div>
        </Html>
      )}
      
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
    </group>
  )
}
