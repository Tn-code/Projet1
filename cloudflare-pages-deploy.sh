#!/bin/bash

echo "☁️ Deploying to Cloudflare Pages..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the project
echo "📦 Building project..."
npm run build

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

# Deploy using Wrangler
echo "☁️ Deploying to Cloudflare Pages..."
if command -v wrangler &> /dev/null; then
    wrangler pages deploy dist --project-name=5s-game
else
    echo "⚠️ Wrangler not found. Installing..."
    npm install -g wrangler
    wrangler pages deploy dist --project-name=5s-game
fi

echo "✅ Deployment complete!"
echo "🌐 Your site: https://5s-game.pages.dev"
