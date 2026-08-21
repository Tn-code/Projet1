#!/bin/bash

echo "🚀 Building 5S Game..."

# Clean previous builds
rm -rf dist node_modules

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build with simplified config
echo "📦 Building..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Check if build succeeded
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi
