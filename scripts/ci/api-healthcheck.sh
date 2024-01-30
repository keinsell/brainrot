#!/bin/bash

# Variables
KOYEB_SERVICE_ID=$1
end=$((SECONDS+180))
attempts=0
max_attempts=20

# Build and deploy the application
koyeb services redeploy $KOYEB_SERVICE_ID

# Get deployment ID
DEPLOYMENT_ID=$(koyeb services describe $KOYEB_SERVICE_ID -o json| jq -r '.latest_deployment_id | select(.!=null)')

# Start logging deployment
koyeb deployments logs $DEPLOYMENT_ID &

# Check service health
while [ $SECONDS -lt $end ] && [ $attempts -lt $max_attempts ]; do
  SERVICE_STATUS=$(koyeb services describe $KOYEB_SERVICE_ID -o json | jq -r '.status | select(.!=null)')
  if [ "$SERVICE_STATUS" = "HEALTHY" ]; then
    echo "Service is healthy."
    exit 0
  fi
  echo $SERVICE_STATUS
  echo "Service is not healthy. Waiting 10 seconds before retrying."
  sleep 10
  attempts=$((attempts+1))
done

echo "Service did not become healthy within the expected time or maximum attempts reached. Aborting redeployment."
exit 1