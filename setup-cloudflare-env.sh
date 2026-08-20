#!/bin/bash

echo "🔧 Setting up Cloudflare Environment Variables..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}ℹ️  You need to set these environment variables in Cloudflare Dashboard:${NC}"
echo ""
echo -e "${BLUE}VITE_FIREBASE_API_KEY${NC}"
echo -e "${BLUE}VITE_FIREBASE_AUTH_DOMAIN${NC}"
echo -e "${BLUE}VITE_FIREBASE_PROJECT_ID${NC}"
echo -e "${BLUE}VITE_FIREBASE_STORAGE_BUCKET${NC}"
echo -e "${BLUE}VITE_FIREBASE_MESSAGING_SENDER_ID${NC}"
echo -e "${BLUE}VITE_FIREBASE_APP_ID${NC}"
echo -e "${BLUE}VITE_FIREBASE_MEASUREMENT_ID${NC}"
echo ""
echo -e "${GREEN}To add them:${NC}"
echo "1. Go to Cloudflare Dashboard"
echo "2. Select your Pages project"
echo "3. Go to Settings > Environment Variables"
echo "4. Add each variable with your Firebase values"
echo ""
echo -e "${YELLOW}Your current Firebase Config:${NC}"
echo "----------------------------------------"
echo "apiKey: AIzaSyBtnN3devPG1tewgvZcq34bv3WDFIrgX70"
echo "authDomain: game-5s-460c3.firebaseapp.com"
echo "projectId: game-5s-460c3"
echo "storageBucket: game-5s-460c3.firebasestorage.app"
echo "messagingSenderId: 335911281123"
echo "appId: 1:335911281123:web:7b78d42d7c857d0c21c0d6"
echo "measurementId: G-H53D7V6D1Q"
echo "----------------------------------------"
