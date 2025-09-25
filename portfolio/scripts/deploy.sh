#!/bin/bash

# ExtMac Portfolio Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="extmac-portfolio"

echo "🚀 Deploying ExtMac Portfolio to $ENVIRONMENT..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the portfolio root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
if [ "$ENVIRONMENT" = "preview" ]; then
    vercel --prod=false
else
    vercel --prod
fi

echo "✅ Deployment complete!"
echo "🔗 Your portfolio is now live!"
