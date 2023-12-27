#!/bin/bash
#
# MIT License
#
# Copyright (c) 2023 Jakub Olan <keinsell@protonmail.com>
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
#

source ../.env

# Color Definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Define the ports you're interested in as an array
PORTS=("$DATABASE_PORT" 5678 9012) # Add your ports here

# Loop through each port and stop containers using it
for port in "${PORTS[@]}"
do
    echo -e "$(date "+%Y-%m-%d %H:%M:%S") ${YELLOW}INFO:${NC} Stopping containers using port $port..."
    docker ps --format '{{.ID}}\t{{.Ports}}' | grep "0.0.0.0:$port" | cut -f1 | xargs -r docker stop && \
    echo -e "$(date "+%Y-%m-%d %H:%M:%S") ${GREEN}SUCCESS:${NC} Containers on port $port stopped." || \
    echo -e "$(date "+%Y-%m-%d %H:%M:%S") ${RED}ERROR:${NC} Failed to stop containers on port $port."
done

cd ../ && docker compose -f "compose-dev.yml" up -d

cd apps/server && pnpm db:push

pnpm dev