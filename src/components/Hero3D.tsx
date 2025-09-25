'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import IPhone from './3d/IPhone'

export default function Hero3D() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Interactive 3D Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Explore my iOS development journey in an immersive 3D environment
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Enter Game World
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              View Projects
            </button>
          </div>
        </div>
      </div>
      
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-lg">Loading 3D scene...</div>
          </div>
        }>
          <Canvas 
            shadows 
            dpr={[1, 1.5]} 
            camera={{ position: [0, 1.2, 3], fov: 45 }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 4, 2]} castShadow />
            <Environment preset="sunset" />
            <IPhone />
            <OrbitControls 
              enablePan={false} 
              maxPolarAngle={Math.PI / 2}
              minDistance={2}
              maxDistance={5}
            />
          </Canvas>
        </Suspense>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
