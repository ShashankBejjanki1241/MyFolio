'use client'

import Link from 'next/link'
import Image from 'next/image'

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

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Screenshot */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
        {project.screenshots[0] && (
          <Image
            src={project.screenshots[0]}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded-full text-xs font-medium">
          {project.metrics.rating} ⭐
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Metrics */}
        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
          <span>{project.metrics.downloads} downloads</span>
          <span>{project.metrics.size}</span>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            href={`/projects/${project.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Details
          </Link>
          <a
            href={project.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-center py-2 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
          >
            App Store
          </a>
        </div>
      </div>
    </div>
  )
}
