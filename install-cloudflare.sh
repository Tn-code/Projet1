#!/bin/bash

echo "☁️ Installing Cloudflare Wrangler..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Install Wrangler globally
echo -e "${BLUE}📦 Installing Wrangler...${NC}"
npm install -g wrangler

# Verify installation
if command -v wrangler &> /dev/null; then
    echo -e "${GREEN}✅ Wrangler installed successfully!${NC}"
    wrangler --version
else
    echo -e "${RED}❌ Installation failed${NC}"
    exit 1
fi

# Login to Cloudflare
echo -e "${BLUE}🔐 Logging in to Cloudflare...${NC}"
wrangler login

echo -e "${GREEN}✅ Setup complete!${NC}"
echo -e "${BLUE}🚀 Run ./deploy-cloudflare.sh to deploy${NC}"
