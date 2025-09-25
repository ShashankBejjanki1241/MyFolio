'use client'

import Link from 'next/link'

export default function HeroRecruiter() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            iOS Developer
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Creating beautiful, high-performance iOS applications with SwiftUI, ARKit, and modern development practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link 
              href="/projects"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              View My Work
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
          
          <div className="flex justify-center items-center space-x-8 mt-16 text-blue-100">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.8</div>
              <div className="text-sm">App Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm">Apps Published</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
