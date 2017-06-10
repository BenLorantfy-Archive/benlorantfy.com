#!/bin/bash

# =====================================================================================
# Script: deploy.sh - benlorantfy.com
# Author: Ben Lorantfy (ben@lorantfy.com)
# Last Updated: June 10th 2017
# =====================================================================================
# The following programs must be already installed for the app to deploy successfully
# - nodejs
# - npm
# - forever
# - go
# - glide
# =====================================================================================

# Constants
IP=138.197.107.96
RED='\033[0;31m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color
REMOTE_TIME=`ssh root@${IP} 'date'`
KERNAL_INFO=`ssh root@${IP} 'uname -a'`

# Steps
echo ""
echo "${PURPLE}[deploy.sh]${NC} ${BLUE}=========================================================${NC}"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE} Starting Deployment of benlorantfy.com   ${NC}"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE}=========================================================${NC}"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE} Remote System Time: ${REMOTE_TIME}"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE} Kernal Info: ${KERNAL_INFO}"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE}=========================================================${NC}"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE} Steps:${NC}"
echo "${PURPLE}[deploy.sh]${NC}  1.  Stop nginx"
echo "${PURPLE}[deploy.sh]${NC}  2.  Copy configuration file"
echo "${PURPLE}[deploy.sh]${NC}  3.  Start nginx"
echo "${PURPLE}[deploy.sh]${NC}  4.  Reload nginx configuration"
echo "${PURPLE}[deploy.sh]${NC}  5.  Stop all current apps"
echo "${PURPLE}[deploy.sh]${NC}  6.  Delete old frontend and backend files"
echo "${PURPLE}[deploy.sh]${NC}  7.  Copy new frontend and backend files"
echo "${PURPLE}[deploy.sh]${NC}  8.  Install dependencies for each app"
echo "${PURPLE}[deploy.sh]${NC}  9.  Build any apps that require building (i.e. go)"
echo "${PURPLE}[deploy.sh]${NC}  10. Start all apps using forever"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE}============================================${NC}"

# STOP NGINX
echo "${PURPLE}[deploy.sh]${NC} Stopping nginx..."
ssh root@${IP} 'nginx -s stop'
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Stopped${NC} nginx"

# NGINX CONFIG
echo "${PURPLE}[deploy.sh]${NC} Deleting configuration file..."
ssh root@${IP} 'rm /etc/nginx/nginx.conf'
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Deleted${NC} configuration file..."
echo "${PURPLE}[deploy.sh]${NC} Copying configuration file..."
rsync -av ./nginx.conf root@${IP}:/etc/nginx/nginx.conf
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Copied${NC} configuration file..."

# RESTART NGINX
echo "${PURPLE}[deploy.sh]${NC} Starting nginx..."
ssh root@${IP} 'nginx'
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Started${NC} nginx"
echo "${PURPLE}[deploy.sh]${NC} Reloading configuration file..."
ssh root@${IP} 'nginx -s reload'
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Reloaded${NC} nginx configuration"

# DELETE OLD FILES
echo "${PURPLE}[deploy.sh]${NC} Deleting old files..."
ssh root@${IP} 'rm -r "/root/benlorantfy.com"'
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Deleted${NC} old files"

# COPY NEW FILES
echo "${PURPLE}[deploy.sh]${NC} Transfering new files..."
rsync -av --exclude '.vscode' --exclude 'go/src/vendor' --exclude 'go/bin/app' --exclude 'go/pkg' --exclude 'node_modules' --exclude '.git' --exclude '.github' . root@${IP}:/root/benlorantfy.com
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Transfered${NC} new files"

# STOP ALL APPS
# =============
echo "${PURPLE}[deploy.sh]${NC} Stopping all the forever scripts..."
ssh root@${IP} 'forever stopall' 

# START GO API
# ============

# Sets /root/benlorantfy.com/backend/platforms/go as GOPATH (Have to do this because go ignores vendor folder when not in GOPATH. see: https://github.com/golang/go/issues/14566)
# Uses a temporary bash profile file and sources from this file. This is so we don't need to edit the actual profile files
echo "${PURPLE}[deploy.sh]${NC} Setting up GOPATH..."
ssh root@${IP} 'echo "export GOPATH=/root/benlorantfy.com/backend/platforms/go     # [deploy.sh]" >> /root/.deploy.env'
echo "${PURPLE}[deploy.sh]${NC} Set up GOPATH"

echo "${PURPLE}[deploy.sh]${NC} Installing go dependencies..."
ssh root@${IP} 'source /root/.deploy.env; echo "GOPATH is currently: ${GOPATH}"; cd "/root/benlorantfy.com/backend/platforms/go/src/benlorantfy.com" && /root/go/bin/glide install'
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Installed${NC} go dependencies"

echo "${PURPLE}[deploy.sh]${NC} Building GO app..."
ssh root@${IP} 'source /root/.deploy.env; echo "GOPATH is currently: ${GOPATH}"; cd "/root/benlorantfy.com/backend/platforms/go/src/benlorantfy.com" && go build -o /root/benlorantfy.com/backend/platforms/go/bin/app ./app'
echo "${PURPLE}[deploy.sh]${NC} Built GO app"

echo "${PURPLE}[deploy.sh]${NC} Removing temporarily created files..."
ssh root@${IP} 'rm /root/.deploy.env'
echo "${PURPLE}[deploy.sh]${NC} Removed temporarily created files"

# START NODE API
# ==============

# Install Dependencies
echo "${PURPLE}[deploy.sh]${NC} Installing node dependencies..."
ssh root@${IP} 'cd "/root/benlorantfy.com/backend/platforms/node" && npm install --production'
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Installed${NC} dependencies"

echo "${PURPLE}[deploy.sh]${NC} Pruning node dependencies..."
ssh root@${IP} 'cd "/root/benlorantfy.com/backend/platforms/node" && npm prune --production'
echo "${PURPLE}[deploy.sh]${NC} ${GREEN}Pruned${NC} node dependencies"


# START ALL APPS
# ==============
# forever is used to manage and monitor all the apps
# The forever configuration is read from forever.json
echo "${PURPLE}[deploy.sh]${NC} Starting all apps using forever..."
ssh root@${IP} 'forever start /root/benlorantfy.com/forever.json' 
echo "${PURPLE}[deploy.sh]${NC} Listing all the started apps..."
ssh root@${IP} 'forever list' 

echo "${PURPLE}[deploy.sh]${NC} ${BLUE}=========================${NC}"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE}      Done Deployment    ${NC}"
echo "${PURPLE}[deploy.sh]${NC} ${BLUE}=========================${NC}"