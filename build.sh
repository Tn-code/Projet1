#!/bin/bash

echo "🚀 Building 5S Game for Cloudflare Pages..."
echo "📁 Current directory: $(pwd)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the project
echo "📦 Building project..."
npm run build

# Check if build succeeded
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "📁 Contents of dist:"
    ls -la dist/
    echo "🚀 Build complete! Ready for deployment."
else
    echo "❌ Build failed! No dist directory found."
    exit 1
fi
