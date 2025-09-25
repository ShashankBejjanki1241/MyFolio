'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { Suspense, useState } from 'react'
import IPhone from './3d/IPhone'
import GameWorld from './3d/GameWorld'
import Link from 'next/link'

export default function Hero3D() {
  const [gameMode, setGameMode] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId)
    // Navigate to project page
    window.location.href = `/projects/${projectId}`
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Interactive UI Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-20 left-8 pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-white">🎮 Interactive Controls</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-blue-200">
                <span className="text-lg">🖱️</span>
                <span>Click & Drag: Navigate 3D space</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <span className="text-lg">🔍</span>
                <span>Scroll: Zoom in/out for details</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <span className="text-lg">📱</span>
                <span>Click iPhone: Enter analytics hub</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <span className="text-lg">⚡</span>
                <span>Click orbs: Explore project data</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <span className="text-lg">📊</span>
                <span>Hover: View real-time metrics</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs text-blue-300">
                Professional portfolio analytics • Data-driven insights • Interactive exploration
              </p>
            </div>
          </div>
        </div>

        {!gameMode && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <div className="text-center space-y-12 max-w-5xl px-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-400/30 text-blue-200 text-lg font-medium mb-8">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                  Interactive Portfolio Experience
                </div>
                
                <h1 className="text-7xl md:text-9xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ExtMac
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold text-white/90">
                  iOS Development Universe
                </h2>
              </div>
              
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-2xl md:text-3xl text-blue-100 leading-relaxed">
                  Step into a <span className="text-blue-300 font-semibold">data-driven</span> world where 
                  <span className="text-purple-300 font-semibold"> technology meets creativity</span>. 
                  Explore real metrics, achievements, and the stories behind each app.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="text-4xl mb-3">📊</div>
                    <h3 className="text-white font-bold text-lg mb-2">Real-Time Analytics</h3>
                    <p className="text-blue-200 text-sm">Live performance metrics and user data visualization</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="text-4xl mb-3">🏆</div>
                    <h3 className="text-white font-bold text-lg mb-2">Achievement Gallery</h3>
                    <p className="text-blue-200 text-sm">Explore milestones and professional accomplishments</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="text-4xl mb-3">⚡</div>
                    <h3 className="text-white font-bold text-lg mb-2">Interactive Tech Stack</h3>
                    <p className="text-blue-200 text-sm">3D visualization of technologies and frameworks</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
                <button 
                  onClick={() => setGameMode(true)}
                  className="group px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-110 shadow-2xl"
                >
                  <span className="flex items-center gap-4 text-xl">
                    <span className="text-3xl">🚀</span>
                    Launch Interactive Experience
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </button>
                <Link 
                  href="/projects"
                  className="group px-12 py-6 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-500 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-4 text-xl">
                    <span className="text-3xl">📱</span>
                    Traditional View
                  </span>
                </Link>
              </div>
              
              <div className="mt-16 text-center">
                <p className="text-blue-300 text-lg">
                  <span className="font-semibold">35K+ Downloads</span> • 
                  <span className="font-semibold"> 4.8 Average Rating</span> • 
                  <span className="font-semibold"> $110K+ Revenue</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {gameMode && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setGameMode(false)}
                  className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 font-medium"
                >
                  ← Return to Overview
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-lg text-green-200 font-semibold">Interactive Analytics Active</span>
                </div>
                <div className="text-sm text-blue-300">
                  Explore • Analyze • Discover
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto"></div>
              <div className="text-lg text-blue-200">Loading 3D universe...</div>
            </div>
          </div>
        }>
          <Canvas 
            shadows 
            dpr={[1, 2]} 
            camera={{ position: gameMode ? [0, 2, 4] : [0, 1.2, 3], fov: 45 }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 3]} castShadow intensity={0.8} />
            <pointLight position={[-5, 5, 5]} intensity={0.3} color="#3b82f6" />
            <pointLight position={[5, -5, -5]} intensity={0.3} color="#8b5cf6" />
            <Environment preset="night" />
            
            {gameMode ? (
              <GameWorld onProjectSelect={handleProjectSelect} />
            ) : (
              <IPhone onClick={() => setGameMode(true)} />
            )}
            
            <OrbitControls 
              enablePan={false} 
              maxPolarAngle={Math.PI / 2}
              minDistance={gameMode ? 3 : 2}
              maxDistance={gameMode ? 8 : 5}
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>
        </Suspense>
      </div>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
