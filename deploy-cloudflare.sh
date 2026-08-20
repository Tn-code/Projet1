#!/bin/bash

echo "☁️ Deploying to Cloudflare Pages..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if Wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Wrangler...${NC}"
    npm install -g wrangler
fi

# Login to Cloudflare
echo -e "${BLUE}🔐 Logging in to Cloudflare...${NC}"
wrangler login

# Build the project
echo -e "${BLUE}📦 Building the project...${NC}"
npm run build

# Deploy to Cloudflare Pages
echo -e "${BLUE}☁️ Deploying to Cloudflare Pages...${NC}"
wrangler pages deploy dist --project-name=5s-game

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${BLUE}🌐 Your site is live at: https://5s-game.pages.dev${NC}"
