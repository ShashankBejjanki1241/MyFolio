'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Skill {
  name: string
  level: number
  category: string
  icon: string
  description: string
}

const skills: Skill[] = [
  {
    name: 'SwiftUI',
    level: 95,
    category: 'UI Framework',
    icon: '📱',
    description: 'Expert-level SwiftUI development with advanced animations and custom components'
  },
  {
    name: 'ARKit',
    level: 90,
    category: 'Augmented Reality',
    icon: '🥽',
    description: 'Advanced ARKit implementation with 3D object tracking and scene understanding'
  },
  {
    name: 'Core Data',
    level: 92,
    category: 'Data Management',
    icon: '💾',
    description: 'Complex data modeling and optimization with Core Data and CloudKit sync'
  },
  {
    name: 'Combine',
    level: 88,
    category: 'Reactive Programming',
    icon: '⚡',
    description: 'Reactive programming patterns and async data flow management'
  },
  {
    name: 'WidgetKit',
    level: 85,
    category: 'iOS Extensions',
    icon: '🔧',
    description: 'Home screen widgets and iOS extension development'
  },
  {
    name: 'StoreKit',
    level: 87,
    category: 'Monetization',
    icon: '💰',
    description: 'In-app purchases, subscriptions, and App Store integration'
  },
  {
    name: 'TestFlight',
    level: 93,
    category: 'Testing & Distribution',
    icon: '🚀',
    description: 'Beta testing workflows and production deployment strategies'
  },
  {
    name: 'CloudKit',
    level: 89,
    category: 'Cloud Services',
    icon: '☁️',
    description: 'Cloud data synchronization and user account management'
  }
]

const categories = ['All', 'UI Framework', 'Augmented Reality', 'Data Management', 'Reactive Programming', 'iOS Extensions', 'Monetization', 'Testing & Distribution', 'Cloud Services']

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Deep proficiency across the entire iOS development ecosystem, from UI frameworks to cloud services.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              {/* Icon and Name */}
              <div className="flex items-center mb-4">
                <motion.div
                  className="text-3xl mr-3"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <p className="text-sm text-blue-200">{skill.category}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-200">Proficiency</span>
                  <span className="text-sm font-semibold text-white">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-blue-200 leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <div className="text-3xl font-bold text-blue-300 mb-2">8+</div>
            <div className="text-blue-200">Core Technologies</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <div className="text-3xl font-bold text-purple-300 mb-2">90%</div>
            <div className="text-purple-200">Average Proficiency</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <div className="text-3xl font-bold text-pink-300 mb-2">5+</div>
            <div className="text-pink-200">Years Experience</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
