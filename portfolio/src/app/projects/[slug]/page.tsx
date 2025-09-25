'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import projects from '../../../../projects.json'

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  metrics: {
    downloads: string
    rating: string
    size: string
  }
  screenshots: string[]
  demoVideo: string
  github: string
  appStore: string
}

interface ProjectDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === params.slug)
    if (foundProject) {
      setProject(foundProject)
    }
    setIsLoading(false)
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
              ExtMac
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/projects" className="text-blue-600 dark:text-blue-400 font-medium">
                Projects
              </Link>
              <Link href="/resume" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Resume
              </Link>
              <Link href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Project Detail Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-slate-900 dark:hover:text-white">Projects</Link>
              <span>/</span>
              <span className="text-slate-900 dark:text-white">{project.title}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Images */}
            <div className="space-y-4">
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl overflow-hidden">
                {project.screenshots[currentImageIndex] && (
                  <Image
                    src={project.screenshots[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full text-sm font-medium">
                  {project.metrics.rating} ⭐
                </div>
              </div>
              
              {/* Image Thumbnails */}
              {project.screenshots.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {project.screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={screenshot}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {project.metrics.downloads}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Downloads
                  </div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {project.metrics.rating}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    App Rating
                  </div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {project.metrics.size}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    App Size
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={project.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  View on App Store
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-center py-3 px-6 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  View Source Code
                </a>
              </div>
            </div>
          </div>

          {/* Demo Video Section */}
          {project.demoVideo && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                Demo Video
              </h3>
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
                  <video
                    controls
                    className="w-full h-full"
                    poster={project.screenshots[0]}
                  >
                    <source src={project.demoVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          )}

          {/* Back to Projects */}
          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              ← Back to All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
