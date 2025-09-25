'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html, Sphere, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import IPhone from './IPhone'
import { useDebug, performanceMonitor } from '@/utils/debug'

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
}

export default function GameWorld({ onProjectSelect }: GameWorldProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [debugMode, setDebugMode] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const debug = useDebug('GameWorld')

  debug.logMount()

  // Animate the world
  useFrame((state) => {
    performanceMonitor.startTimer('GameWorld-animation')
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      
      if (debugMode) {
        debug.debug('World animation', {
          elapsedTime: state.clock.elapsedTime,
          rotation: groupRef.current.rotation.y,
          hoveredProject: hovered
        })
      }
    }
    
    const renderTime = performanceMonitor.endTimer('GameWorld-animation')
    if (debugMode && renderTime > 16.67) {
      debug.warn('Slow world animation', `${renderTime.toFixed(2)}ms`)
    }
  })

  const projects: ProjectData[] = [
    { 
      id: 'pulse-incident-ios', 
      position: [-4, 0, 0] as [number, number, number], 
      color: '#3b82f6',
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
        'Enterprise client adoption',
        'Zero critical bugs in production',
        '99.9% uptime SLA'
      ]
    },
    { 
      id: 'weather-pro', 
      position: [0, 0, 0] as [number, number, number], 
      color: '#10b981',
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
        '95% accuracy rate',
        'Sub-1s load times',
        'Offline functionality'
      ]
    },
    { 
      id: 'task-manager', 
      position: [4, 0, 0] as [number, number, number], 
      color: '#f59e0b',
      title: 'Task Manager Pro',
      description: 'Advanced productivity suite with team collaboration & analytics',
      tech: ['SwiftUI', 'Core Data', 'CloudKit', 'WidgetKit', 'StoreKit'],
      metrics: {
        downloads: '12K+',
        rating: 4.7,
        size: '28MB',
        revenue: '$35K+',
        users: '3.2K+'
      },
      achievements: [
        'Team collaboration features',
        'Advanced analytics dashboard',
        'Cross-platform sync',
        'Enterprise security compliance'
      ]
    }
  ]

  // Professional metrics visualization
  const totalMetrics = {
    downloads: projects.reduce((sum, p) => sum + parseInt(p.metrics.downloads.replace('K+', '')), 0),
    avgRating: projects.reduce((sum, p) => sum + p.metrics.rating, 0) / projects.length,
    totalRevenue: projects.reduce((sum, p) => sum + parseInt(p.metrics.revenue?.replace('$', '').replace('K+', '') || '0'), 0),
    totalUsers: projects.reduce((sum, p) => sum + parseInt(p.metrics.users?.replace('K+', '') || '0'), 0)
  }

  return (
    <group ref={groupRef}>
      {/* Central iPhone */}
      <IPhone />
      
      {/* Professional Data Visualization Hub */}
      <Html position={[0, 3, 0]} center>
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 min-w-[400px]">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Portfolio Analytics</h2>
            <p className="text-blue-200 text-sm">Real-time performance metrics</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-xl p-4 border border-blue-400/30">
              <div className="text-2xl font-bold text-blue-300">{totalMetrics.downloads}K+</div>
              <div className="text-blue-200 text-sm">Total Downloads</div>
            </div>
            <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-xl p-4 border border-green-400/30">
              <div className="text-2xl font-bold text-green-300">{totalMetrics.avgRating.toFixed(1)}</div>
              <div className="text-green-200 text-sm">Average Rating</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/30 to-orange-600/30 rounded-xl p-4 border border-yellow-400/30">
              <div className="text-2xl font-bold text-yellow-300">${totalMetrics.totalRevenue}K+</div>
              <div className="text-yellow-200 text-sm">Total Revenue</div>
            </div>
            <div className="bg-gradient-to-br from-pink-600/30 to-rose-600/30 rounded-xl p-4 border border-pink-400/30">
              <div className="text-2xl font-bold text-pink-300">{totalMetrics.totalUsers}K+</div>
              <div className="text-pink-200 text-sm">Active Users</div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowMetrics(!showMetrics)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
            >
              {showMetrics ? 'Hide' : 'Show'} Detailed Metrics
            </button>
          </div>
        </div>
      </Html>

      {/* Enhanced Project Orbs with Professional Data */}
      {projects.map((project, index) => (
        <group key={project.id} position={project.position}>
          {/* Main Project Orb with Data Visualization */}
          <mesh
            onClick={() => {
              debug.info('Project selected', project.id)
              setSelectedProject(selectedProject === project.id ? null : project.id)
              onProjectSelect(project.id)
            }}
            onPointerOver={() => {
              setHovered(project.id)
              debug.debug('Project hovered', project.id)
            }}
            onPointerOut={() => {
              setHovered(null)
              debug.debug('Project unhovered', project.id)
            }}
            castShadow
          >
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial 
              color={project.color}
              emissive={project.color}
              emissiveIntensity={hovered === project.id ? 0.6 : 0.2}
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
          
          {/* Data Rings - Rating Visualization */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.55, 0.6, 64]} />
            <meshBasicMaterial 
              color={project.color} 
              transparent 
              opacity={hovered === project.id ? 0.9 : 0.4}
            />
          </mesh>
          
          {/* Download Count Ring */}
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <ringGeometry args={[0.65, 0.7, 64]} />
            <meshBasicMaterial 
              color="#10b981" 
              transparent 
              opacity={hovered === project.id ? 0.7 : 0.3}
            />
          </mesh>
          
          {/* Professional Project Dashboard */}
          <Html position={[0, 1.5, 0]} center>
            <div className={`bg-black/90 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 ${
              hovered === project.id 
                ? 'scale-110 border-white/50 shadow-2xl' 
                : 'scale-100 border-white/20'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-xl">{project.title}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white font-semibold">{project.metrics.rating}</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-blue-200 text-sm mb-4 max-w-sm leading-relaxed">{project.description}</p>
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-400/30">
                  <div className="text-lg font-bold text-blue-300">{project.metrics.downloads}</div>
                  <div className="text-blue-200 text-xs">Downloads</div>
                </div>
                <div className="bg-green-600/20 rounded-lg p-3 border border-green-400/30">
                  <div className="text-lg font-bold text-green-300">{project.metrics.users}</div>
                  <div className="text-green-200 text-xs">Active Users</div>
                </div>
                <div className="bg-purple-600/20 rounded-lg p-3 border border-purple-400/30">
                  <div className="text-lg font-bold text-purple-300">{project.metrics.revenue}</div>
                  <div className="text-purple-200 text-xs">Revenue</div>
                </div>
                <div className="bg-orange-600/20 rounded-lg p-3 border border-orange-400/30">
                  <div className="text-lg font-bold text-orange-300">{project.metrics.size}</div>
                  <div className="text-orange-200 text-xs">App Size</div>
                </div>
              </div>
              
              {/* Tech Stack */}
              <div className="mb-4">
                <h4 className="text-white font-semibold text-sm mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Achievements */}
              {selectedProject === project.id && (
                <div className="mb-4">
                  <h4 className="text-white font-semibold text-sm mb-2">Key Achievements</h4>
                  <div className="space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-green-300">
                        <span className="text-green-400">✓</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Button */}
              <div className="text-center">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                  Explore Project →
                </button>
              </div>
            </div>
          </Html>
          
          {/* Enhanced Connection Lines with Data Flow */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, 0, 0, 0])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color={project.color} 
              opacity={hovered === project.id ? 1 : 0.4} 
              transparent 
              linewidth={hovered === project.id ? 3 : 1}
            />
          </line>
          
          {/* Floating Achievement Badges */}
          {project.achievements.slice(0, 2).map((achievement, i) => (
            <FloatingAchievement 
              key={achievement}
              position={[
                project.position[0] + Math.cos((i * Math.PI) + Math.PI / 4) * 1.2,
                project.position[1] + 0.5 + Math.sin(i * Math.PI / 2) * 0.3,
                project.position[2] + Math.sin((i * Math.PI) + Math.PI / 4) * 1.2
              ] as [number, number, number]}
              text={achievement}
              color={project.color}
            />
          ))}
        </group>
      ))}
      
      {/* Floating Tech Icons */}
      <FloatingIcon position={[-1, 1, -1]} text="SwiftUI" color="#ff6b6b" />
      <FloatingIcon position={[1, 1, -1]} text="ARKit" color="#4ecdc4" />
      <FloatingIcon position={[-1, -1, -1]} text="Core Data" color="#45b7d1" />
      <FloatingIcon position={[1, -1, -1]} text="CloudKit" color="#96ceb4" />
      
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#1e293b" 
          transparent 
          opacity={0.3}
          roughness={0.8}
        />
      </mesh>
      
      {/* Debug Controls */}
      {debugMode && (
        <mesh 
          onClick={() => {
            setDebugMode(false)
            debug.info('Debug mode disabled')
          }}
          position={[0, 2, 0]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}
      
      {/* Debug Info Display */}
      {debugMode && (
        <Html position={[0, 3, 0]} center>
          <div className="bg-black/80 text-white p-2 rounded text-xs">
            <div>Debug Mode: ON</div>
            <div>Projects: {projects.length}</div>
            <div>Hovered: {hovered || 'None'}</div>
            <div>FPS: {Math.round(1000 / (performance.now() % 1000))}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function FloatingIcon({ position, text, color }: { position: [number, number, number], text: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      <Html position={[0, 0.4, 0]} center>
        <div className="px-2 py-1 bg-black/50 text-white text-xs rounded">
          {text}
        </div>
      </Html>
    </group>
  )
}

function FloatingTechIcon({ position, text, color }: { position: [number, number, number], text: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.1]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      <Html position={[0, 0.3, 0]} center>
        <div className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full border border-white/20">
          {text}
        </div>
      </Html>
    </group>
  )
}

function FloatingAchievement({ position, text, color }: { position: [number, number, number], text: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.08
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <Html position={[0, 0.4, 0]} center>
        <div className="px-3 py-2 bg-gradient-to-r from-green-600/90 to-emerald-600/90 backdrop-blur-sm text-white text-xs rounded-lg border border-green-400/30 shadow-lg">
          <div className="flex items-center gap-1">
            <span className="text-green-300">🏆</span>
            <span className="font-medium">{text}</span>
          </div>
        </div>
      </Html>
    </group>
  )
}
