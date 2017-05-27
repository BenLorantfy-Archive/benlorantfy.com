#!/bin/bash

# Constants
IP=138.197.107.96
RED='\033[0;31m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Steps
echo ""
echo "[deploy.sh] ${BLUE}=========================${NC}"
echo "[deploy.sh] ${BLUE}Deploying benlorantfy.com${NC}"
echo "[deploy.sh] ${BLUE}=========================${NC}"
echo "[deploy.sh] ${BLUE}Steps:${NC}"
echo "[deploy.sh] ${BLUE}=========================${NC}"
echo "[deploy.sh] 1. Stop nginx"
echo "[deploy.sh] 2. Copy configuration file"
echo "[deploy.sh] 3. Start nginx"
echo "[deploy.sh] 4. Reload nginx configuration"
echo "[deploy.sh] 5. Delete old frontend and backend files"
echo "[deploy.sh] 6. Copy new frontend and backend files"

echo "[deploy.sh] 7. Stop old node app"
echo "[deploy.sh] 8. Install node dependencies"
echo "[deploy.sh] 9. Start new node app"

echo "[deploy.sh] 10. Stop old go app"
echo "[deploy.sh] 11. Start new go app"

echo "[deploy.sh] ${BLUE}=========================${NC}"

# STOP NGINX
echo "[deploy.sh] Stopping nginx..."
ssh root@${IP} 'nginx -s stop'
echo "[deploy.sh] ${GREEN}Stopped${NC} nginx"

# NGINX CONFIG
echo "[deploy.sh] Deleting configuration file..."
ssh root@${IP} 'rm /etc/nginx/nginx.conf'
echo "[deploy.sh] ${GREEN}Deleted${NC} configuration file..."
echo "[deploy.sh] Copying configuration file..."
rsync -av ./nginx.conf root@${IP}:/etc/nginx/nginx.conf
echo "[deploy.sh] ${GREEN}Copied${NC} configuration file..."

# RESTART NGINX
echo "[deploy.sh] Starting nginx..."
ssh root@${IP} 'nginx'
echo "[deploy.sh] ${GREEN}Started${NC} nginx"
echo "[deploy.sh] Reloading configuration file..."
ssh root@${IP} 'nginx -s reload'
echo "[deploy.sh] ${GREEN}Reloaded${NC} nginx configuration"

# DELETE OLD FILES
echo "[deploy.sh] Deleting old files..."
ssh root@${IP} 'rm -r "/root/benlorantfy.com"'
echo "[deploy.sh] ${GREEN}Deleted${NC} old files"

# COPY NEW FILES
echo "[deploy.sh] Transfering new files..."
rsync -av --exclude 'vendor' --exclude 'node_modules' --exclude '.git' --exclude '.github' . root@${IP}:/root/benlorantfy.com
echo "[deploy.sh] ${GREEN}Transfered${NC} new files"

# START GO API
# ============
echo "[deploy.sh] Stopping all the forever scripts..."
ssh root@${IP} 'forever stop 0' 
echo "[deploy.sh] ${GREEN}Stopped${NC} forever script #0 (GO)"
ssh root@${IP} 'forever stop 1'
echo "[deploy.sh] ${GREEN}Stopped${NC} forever script #1 (node)"

# START GO API
# ============
    # Install Dependencies
    echo "[deploy.sh] Installing go dependencies..."
    ssh root@${IP} 'cd "/root/benlorantfy.com/backend/platforms/go/src/benlorantfy.com" && glide install --production'
    echo "[deploy.sh] ${GREEN}Installed${NC} go dependencies"

    # Compile program
    echo "[deploy.sh] Compiling GO program"
    # go build -o ./backend/platforms/go/bin/app ./backend/platforms/go/src/benlorantfy.com/app
    ssh root@${IP} 'cd "/root/benlorantfy.com/backend/platforms/go/src/benlorantfy.com" && go build -o /root/benlorantfy.com/backend/platforms/go/bin/app ./app'
    echo "[deploy.sh] ${GREEN}Compiled${NC} go program"

    # Start using forever
    echo "[deploy.sh] Starting go app in production mode using forever..."
    ssh root@${IP} 'cd "/root/benlorantfy.com/backend/platforms/go/bin" && forever start app'
    echo "[deploy.sh] ${GREEN}Started${NC} go app in production mode using forever"

# START NODE API
# ==============

    # Install Dependencies
    echo "[deploy.sh] Installing node dependencies..."
    ssh root@${IP} 'cd "/root/benlorantfy.com/backend/platforms/node" && npm install --production'
    echo "[deploy.sh] ${GREEN}Installed${NC} dependencies"

    echo "[deploy.sh] Pruning node dependencies..."
    ssh root@${IP} 'cd "/root/benlorantfy.com/backend/platforms/node" && npm prune --production'
    echo "[deploy.sh] ${GREEN}Pruned${NC} node dependencies"

    # Start app in production mode
    # http://stackoverflow.com/a/7675370
    echo "[deploy.sh] Starting node app in production mode using forever..."
    ssh root@${IP} 'cd "/root/benlorantfy.com/backend/platforms/node" && NODE_ENV=production forever start app.js'
    echo "[deploy.sh] ${GREEN}Started${NC} node app in production mode using forever"

echo "[deploy.sh] ${BLUE}=========================${NC}"
echo "[deploy.sh] ${BLUE}      Done Deployment    ${NC}"
echo "[deploy.sh] ${BLUE}=========================${NC}"