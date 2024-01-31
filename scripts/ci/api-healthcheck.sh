#!/bin/bash

# Variables
KOYEB_SERVICE_ID=$1
end=$((SECONDS+360))
attempts=0
max_attempts=20

# Wait for the new deployment to start
echo "Waiting for the new deployment to start..."
#sleep 15

LATEST_DEPLOYMENT_JSON=$(koyeb deployments list -o json | jq '.deployments | sort_by(.created_at) | last')

# Get deployment ID
DEPLOYMENT_ID=$(echo $LATEST_DEPLOYMENT_JSON | jq -r '.id')

echo "Waiting for deployment: ${DEPLOYMENT_ID}"

# Start logging deployment and get its PID
koyeb deployments logs $DEPLOYMENT_ID &
LOGS_PID=$!

# Check deployment health
while [ $SECONDS -lt $end ] && [ $attempts -lt $max_attempts ]; do
LATEST_DEPLOYMENT_JSON=$(koyeb deployments list -o json | jq '.deployments | sort_by(.created_at) | last')
  DEPLOYMENT_STATUS=$(echo $LATEST_DEPLOYMENT_JSON | jq -r '.status | select(.!=null)')

  if [ "$DEPLOYMENT_STATUS" = "HEALTHY" ]; then
    echo "Deployment ${DEPLOYMENT_ID} is healthy."
    kill $LOGS_PID
    exit 0
  fi

  if [ "$DEPLOYMENT_STATUS" = "PENDING" ]; then
      echo "Deployment ${DEPLOYMENT_ID} is pending."
      sleep 1;
      continue
  fi

  if [ "$DEPLOYMENT_STATUS" = "ERROR" ]; then
      echo "Deployment ${DEPLOYMENT_ID} failed."
      koyeb deployments logs $DEPLOYMENT_ID
      kill $LOGS_PID
      exit 1
  fi

  echo $DEPLOYMENT_STATUS
  echo "Deployment is not healthy. Waiting 10 seconds before retrying."
  sleep 10
  attempts=$((attempts+1))
done

echo "Deployment did not become healthy within the expected time or maximum attempts reached. Aborting redeployment."

koyeb deployments cancel $DEPLOYMENT_ID

kill $LOGS_PID
exit 1