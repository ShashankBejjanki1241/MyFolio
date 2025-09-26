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
      {/* Enhanced Interactive UI Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-20 left-8 pointer-events-auto">
          <div className="bg-gradient-to-br from-black/40 to-blue-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              Development Studio Controls
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">LIVE</span>
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <span className="text-lg">🖱️</span>
                <span>Click & Drag: Explore the studio</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <span className="text-lg">🔍</span>
                <span>Scroll: Zoom to see details</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <span className="text-lg">📱</span>
                <span>Click iPhone: Enter portfolio mode</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <span className="text-lg">💻</span>
                <span>Click workstations: Explore projects</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <span className="text-lg">🏆</span>
                <span>Hover trophies: View achievements</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <span className="text-lg">🎯</span>
                <span>Touch: Mobile-friendly navigation</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-xs">
                <p className="text-blue-300">
                  Professional portfolio analytics
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300">Active</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-purple-300">
                Data-driven insights • Interactive exploration • Real-time metrics
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Stats Panel */}
        <div className="absolute top-20 right-8 pointer-events-auto">
          <div className="bg-gradient-to-br from-black/40 to-purple-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <span className="text-xl">📈</span>
              Live Portfolio Stats
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-green-300">
                <span>📱 Total Downloads</span>
                <span className="font-bold">38,247</span>
              </div>
              <div className="flex items-center justify-between text-yellow-300">
                <span>⭐ Average Rating</span>
                <span className="font-bold">4.8/5.0</span>
              </div>
              <div className="flex items-center justify-between text-blue-300">
                <span>💰 Revenue Generated</span>
                <span className="font-bold">$110K+</span>
              </div>
              <div className="flex items-center justify-between text-purple-300">
                <span>👥 Active Users</span>
                <span className="font-bold">7,523</span>
              </div>
              <div className="flex items-center justify-between text-pink-300">
                <span>🚀 Projects Live</span>
                <span className="font-bold">3 Apps</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-xs text-gray-300">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
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
                         Shashank Bejjanki
                       </h1>
                       <h2 className="text-4xl md:text-6xl font-bold text-white/90">
                         iOS Development Universe
                       </h2>
              </div>
              
              <div className="max-w-5xl mx-auto space-y-8">
                <p className="text-2xl md:text-4xl text-blue-100 leading-relaxed">
                  Step into a <span className="text-blue-300 font-bold bg-blue-500/20 px-2 py-1 rounded-lg">data-driven</span> universe where 
                  <span className="text-purple-300 font-bold bg-purple-500/20 px-2 py-1 rounded-lg"> technology meets creativity</span>. 
                  Explore real metrics, achievements, and the stories behind each innovative app.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  <div className="bg-gradient-to-br from-white/10 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-500 group hover:scale-105">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
                    <h3 className="text-white font-bold text-xl mb-3">Real-Time Analytics</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">Live performance metrics, user engagement data, and revenue visualization in stunning 3D</p>
                    <div className="mt-4 text-xs text-green-300">✓ Live Data • ✓ Interactive Charts • ✓ Performance Metrics</div>
                  </div>
                  <div className="bg-gradient-to-br from-white/10 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500 group hover:scale-105">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
                    <h3 className="text-white font-bold text-xl mb-3">Achievement Gallery</h3>
                    <p className="text-purple-200 text-sm leading-relaxed">Explore milestones, awards, and professional accomplishments in an immersive experience</p>
                    <div className="mt-4 text-xs text-yellow-300">✓ App Store Features • ✓ Enterprise Clients • ✓ Zero Downtime</div>
                  </div>
                  <div className="bg-gradient-to-br from-white/10 to-green-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-green-400/50 transition-all duration-500 group hover:scale-105">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                    <h3 className="text-white font-bold text-xl mb-3">Interactive Tech Stack</h3>
                    <p className="text-green-200 text-sm leading-relaxed">3D visualization of cutting-edge technologies and frameworks used in development</p>
                    <div className="mt-4 text-xs text-blue-300">✓ SwiftUI • ✓ ARKit • ✓ Core Data • ✓ CloudKit</div>
                  </div>
                </div>

                {/* Tech Stack Visualization */}
                <div className="mt-16 bg-gradient-to-r from-black/30 to-blue-900/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <h3 className="text-white font-bold text-2xl mb-6 text-center">🚀 Technology Universe</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['SwiftUI', 'ARKit', 'Core Data', 'CloudKit', 'Combine', 'WidgetKit', 'SiriKit', 'Core ML'].map((tech, i) => (
                      <div key={tech} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 group">
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                          {['📱', '🥽', '💾', '☁️', '🔄', '📊', '🎤', '🧠'][i]}
                        </div>
                        <div className="text-white font-semibold text-sm">{tech}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-8 mt-20">
                <button 
                  onClick={() => setGameMode(true)}
                  className="group relative px-16 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-3xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-700 transform hover:scale-110 shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center gap-6 text-2xl">
                    <span className="text-4xl group-hover:rotate-12 transition-transform duration-500">🚀</span>
                    <span>Launch Interactive Experience</span>
                    <span className="group-hover:translate-x-3 transition-transform duration-500">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                
                <Link 
                  href="/projects"
                  className="group relative px-16 py-8 border-2 border-white/30 text-white font-bold rounded-3xl hover:bg-white/10 hover:border-white/60 transition-all duration-500 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center gap-6 text-2xl">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-500">📱</span>
                    <span>Traditional View</span>
                  </span>
                </Link>
              </div>
              
              <div className="mt-20 text-center">
                <div className="bg-gradient-to-r from-black/40 to-blue-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 inline-block">
                  <p className="text-blue-300 text-xl font-bold">
                    <span className="text-green-400 font-extrabold">38K+ Downloads</span> • 
                    <span className="text-yellow-400 font-extrabold"> 4.8 Average Rating</span> • 
                    <span className="text-purple-400 font-extrabold"> $110K+ Revenue</span>
                  </p>
                  <div className="mt-2 text-sm text-gray-300">
                    🏆 Featured Developer • 📈 Growing Portfolio • 🚀 Innovation Leader
                  </div>
                </div>
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
        camera={{ position: gameMode ? [0, 5, 12] : [0, 3, 8], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} castShadow intensity={1.2} />
        <pointLight position={[-8, 8, 8]} intensity={0.4} color="#3b82f6" />
        <pointLight position={[8, 8, -8]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#10b981" />
        <Environment preset="night" />

        {gameMode ? (
          <GameWorld onProjectSelect={handleProjectSelect} />
        ) : (
          <IPhone onClick={() => setGameMode(true)} />
        )}

        <OrbitControls
          enablePan={true}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={gameMode ? 8 : 5}
          maxDistance={gameMode ? 25 : 15}
          enableDamping
          dampingFactor={0.05}
          target={gameMode ? [0, 0, 0] : [0, 0, 0]}
        />
      </Canvas>
        </Suspense>
      </div>
      
      {/* Spectacular Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/40 to-pink-500/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-pink-400/25 to-orange-400/25 rounded-full blur-2xl animate-pulse delay-300"></div>
        
        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${1.5 + Math.random() * 3}s`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`
              }}
            />
          ))}
        </div>

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"
              style={{
                top: `${(i * 5)}%`,
                left: '0',
                right: '0',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse"
              style={{
                left: `${(i * 5)}%`,
                top: '0',
                bottom: '0',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute inset-0">
          {['📱', '⚡', '🚀', '💎', '🌟', '🎯', '🔥', '✨'].map((icon, i) => (
            <div
              key={icon}
              className="absolute text-2xl opacity-30 animate-bounce"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
