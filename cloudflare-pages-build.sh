#!/bin/bash

echo "🚀 Building for Cloudflare Pages..."

# Install dependencies
npm install

# Build the project
npm run build

# Verify build
if [ -d "dist" ]; then
    echo "✅ Build successful! Output in ./dist"
    ls -la dist/
else
    echo "❌ Build failed! No dist directory found."
    exit 1
fi
