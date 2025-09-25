#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔧 Optimizing build for production...')

// Optimize Next.js config
const nextConfigPath = path.join(__dirname, '..', 'next.config.mjs')
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8')

// Add production optimizations
const optimizations = `
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
`

// Insert optimizations before the closing brace
nextConfig = nextConfig.replace(
  'export default nextConfig;',
  `${optimizations}\nexport default nextConfig;`
)

fs.writeFileSync(nextConfigPath, nextConfig)

// Optimize package.json scripts
const packageJsonPath = path.join(__dirname, '..', 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

packageJson.scripts = {
  ...packageJson.scripts,
  'build:analyze': 'ANALYZE=true npm run build',
  'build:production': 'NODE_ENV=production npm run build',
  'preview': 'npm run build && npm run start',
  'type-check': 'tsc --noEmit',
  'lint:fix': 'next lint --fix'
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

// Create .gitignore additions
const gitignorePath = path.join(__dirname, '..', '.gitignore')
const gitignoreAdditions = `
# Build optimizations
.next/cache/
.next/static/
out/
build/
dist/

# Environment files
.env.local
.env.production
.env.development

# Performance monitoring
.vercel/
.vercel.json

# Testing
coverage/
.nyc_output/
`

if (fs.existsSync(gitignorePath)) {
  const existingGitignore = fs.readFileSync(gitignorePath, 'utf8')
  if (!existingGitignore.includes('# Build optimizations')) {
    fs.appendFileSync(gitignorePath, gitignoreAdditions)
  }
} else {
  fs.writeFileSync(gitignorePath, gitignoreAdditions.trim())
}

console.log('✅ Build optimization complete!')
console.log('📦 Added production scripts:')
console.log('   - npm run build:analyze')
console.log('   - npm run build:production')
console.log('   - npm run preview')
console.log('   - npm run type-check')
console.log('   - npm run lint:fix')
