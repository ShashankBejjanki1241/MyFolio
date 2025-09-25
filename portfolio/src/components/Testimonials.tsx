'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechCorp',
    content: 'Shashank delivered an exceptional iOS app that exceeded our expectations. The attention to detail and performance optimization was outstanding.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'CTO',
    company: 'StartupXYZ',
    content: 'Working with Shashank was a game-changer for our mobile strategy. The SwiftUI implementation was flawless and the user experience is incredible.',
    rating: 5,
    avatar: '👨‍💻'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'Design Director',
    company: 'CreativeStudio',
    content: 'Shashank\'s understanding of iOS design patterns and ARKit integration brought our vision to life. The app looks and feels premium.',
    rating: 5,
    avatar: '👩‍🎨'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Founder',
    company: 'InnovateLab',
    content: 'The Core Data implementation and CloudKit sync Shashank built for our app is rock-solid. Zero data loss and seamless user experience.',
    rating: 5,
    avatar: '👨‍🚀'
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what industry professionals say about working with Shashank.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="text-yellow-400 text-lg"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <motion.div
                  className="text-3xl mr-3"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
            <div className="text-slate-600 dark:text-slate-300">Client Satisfaction</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">24/7</div>
            <div className="text-slate-600 dark:text-slate-300">Support Available</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5+</div>
            <div className="text-slate-600 dark:text-slate-300">Years Experience</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
