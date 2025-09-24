'use client'

import Link from 'next/link'

export default function ResumePage() {
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
              <Link href="/resume" className="text-blue-600 dark:text-blue-400 font-medium">
                Resume
              </Link>
              <Link href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Resume Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Resume
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Download my resume or view it online
            </p>
          </div>

          {/* Resume Content */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 print:shadow-none print:rounded-none">
            {/* Header */}
            <div className="text-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Your Name
              </h2>
              <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                iOS Developer
              </p>
              <div className="flex justify-center space-x-6 text-sm text-slate-600 dark:text-slate-300">
                <span>your@email.com</span>
                <span>LinkedIn Profile</span>
                <span>GitHub Profile</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Professional Summary
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Passionate iOS developer with 5+ years of experience creating beautiful, 
                high-performance mobile applications. Expert in SwiftUI, ARKit, Core Data, 
                and modern iOS development practices. Proven track record of delivering 
                user-friendly apps with excellent ratings and strong user engagement.
              </p>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Languages & Frameworks</h4>
                  <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• Swift & SwiftUI</li>
                    <li>• Objective-C</li>
                    <li>• UIKit</li>
                    <li>• Combine</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">iOS Technologies</h4>
                  <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• ARKit & RealityKit</li>
                    <li>• Core Data & CloudKit</li>
                    <li>• WidgetKit</li>
                    <li>• StoreKit</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Tools & Platforms</h4>
                  <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• Xcode & Instruments</li>
                    <li>• Git & GitHub</li>
                    <li>• TestFlight</li>
                    <li>• App Store Connect</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Design & UX</h4>
                  <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• Human Interface Guidelines</li>
                    <li>• Accessibility</li>
                    <li>• Performance Optimization</li>
                    <li>• User Testing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Professional Experience
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Senior iOS Developer</h4>
                    <span className="text-sm text-slate-600 dark:text-slate-400">2022 - Present</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Tech Company Inc.</p>
                  <ul className="text-slate-700 dark:text-slate-300 space-y-1 text-sm">
                    <li>• Led development of flagship iOS app with 50K+ active users</li>
                    <li>• Implemented ARKit features increasing user engagement by 40%</li>
                    <li>• Mentored junior developers and established coding standards</li>
                    <li>• Reduced app crash rate by 60% through performance optimization</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">iOS Developer</h4>
                    <span className="text-sm text-slate-600 dark:text-slate-400">2020 - 2022</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Mobile Solutions Ltd.</p>
                  <ul className="text-slate-700 dark:text-slate-300 space-y-1 text-sm">
                    <li>• Developed 3 iOS apps from concept to App Store release</li>
                    <li>• Integrated Core Data with CloudKit for seamless data sync</li>
                    <li>• Collaborated with design team to implement pixel-perfect UIs</li>
                    <li>• Achieved average 4.8+ star rating across all published apps</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Education
              </h3>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">Bachelor of Computer Science</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">University Name</p>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400">2018</span>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Certifications
              </h3>
              <ul className="text-slate-700 dark:text-slate-300 space-y-2">
                <li>• Apple Certified iOS Developer</li>
                <li>• SwiftUI Mastery Certification</li>
                <li>• ARKit Development Specialist</li>
              </ul>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center mt-8">
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors print:hidden"
            >
              📄 Print Resume
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
