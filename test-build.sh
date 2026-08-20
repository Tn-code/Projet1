#!/bin/bash

echo "🧪 Testing local build..."

# Clean previous build
rm -rf dist node_modules

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build
echo "📦 Building..."
npm run build

# Check build
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "📁 Contents of dist:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi
