#!/bin/bash

echo "🔥 Deploying Firebase Security Rules..."
echo "👑 Admin: houssine.trabelsi6@gmail.com"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI not installed. Installing...${NC}"
    npm install -g firebase-tools
fi

# Login to Firebase
echo -e "${BLUE}📝 Logging in to Firebase...${NC}"
firebase login

# Deploy Firestore Rules
echo -e "${BLUE}📦 Deploying Firestore Security Rules...${NC}"
firebase deploy --only firestore:rules

# Deploy Storage Rules
echo -e "${BLUE}📦 Deploying Storage Security Rules...${NC}"
firebase deploy --only storage:rules

# Deploy Firestore Indexes
echo -e "${BLUE}📦 Deploying Firestore Indexes...${NC}"
firebase deploy --only firestore:indexes

echo -e "${GREEN}✅ All rules deployed successfully!${NC}"

# Show deployed rules
echo -e "${BLUE}🔍 Checking deployed rules...${NC}"
firebase firestore:indexes

echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo -e "${YELLOW}👑 Admin: houssine.trabelsi6@gmail.com${NC}"
echo -e "${YELLOW}🔑 Password: Plastipart$1${NC}"
