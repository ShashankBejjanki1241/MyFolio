'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import HeroRecruiter from '@/components/HeroRecruiter'
import ModeToggle from '@/components/ModeToggle'
import ProjectCard from '@/components/ProjectCard'
import projects from '../../projects.json'

// Dynamically import 3D components to avoid SSR issues
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false })

export default function Home() {
  const [mode, setMode] = useState<'recruiter' | 'game'>('recruiter')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set default mode from environment variable
    const defaultMode = process.env.NEXT_PUBLIC_MODE_DEFAULT as 'recruiter' | 'game'
    if (defaultMode) {
      setMode(defaultMode)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
              Your Name
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/projects" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/resume" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Resume
              </Link>
              <Link href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Contact
              </Link>
              <ModeToggle mode={mode} onModeChange={setMode} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16">
        {mode === 'recruiter' ? (
          <HeroRecruiter />
        ) : (
          <Hero3D />
        )}
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Showcasing my best iOS applications built with modern technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/projects" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            © 2024 Your Name. Built with Next.js, React Three Fiber, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  )
}