'use client'

import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function IPhone() {
  // For now, we'll create a simple iPhone-like shape since we don't have a GLB model
  // In production, you would load: useGLTF(process.env.NEXT_PUBLIC_ASSETS_BASE + '/models/iphone14.glb')
  
  const geometry = useMemo(() => {
    const phoneGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.05)
    const screenGeometry = new THREE.BoxGeometry(0.35, 0.7, 0.01)
    
    return { phoneGeometry, screenGeometry }
  }, [])

  const materials = useMemo(() => {
    const phoneMaterial = new THREE.MeshStandardMaterial({ 
      color: '#1f2937',
      metalness: 0.8,
      roughness: 0.2
    })
    const screenMaterial = new THREE.MeshStandardMaterial({ 
      color: '#000000',
      emissive: '#1a1a1a',
      emissiveIntensity: 0.1
    })
    
    return { phoneMaterial, screenMaterial }
  }, [])

  return (
    <group position={[0, -0.6, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* Phone Body */}
      <mesh geometry={geometry.phoneGeometry} material={materials.phoneMaterial} castShadow />
      
      {/* Screen */}
      <mesh 
        geometry={geometry.screenGeometry} 
        material={materials.screenMaterial}
        position={[0, 0, 0.03]}
      />
      
      {/* Home Button */}
      <mesh position={[0, -0.25, 0.03]}>
        <circleGeometry args={[0.03]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Camera Bump */}
      <mesh position={[0, 0.2, 0.03]}>
        <circleGeometry args={[0.05]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  )
}
