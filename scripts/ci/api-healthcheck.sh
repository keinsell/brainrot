#!/bin/bash

# Variables
KOYEB_SERVICE_ID=$1
end=$((SECONDS+360))
attempts=0
max_attempts=40
LOGS_STARTED=false

# Wait for the new deployment to start
echo "Monitoring health of latest deployment on ${KOYEB_SERVICE_ID}..."

# Check deployment health
while [ $SECONDS -lt $end ] && [ $attempts -lt $max_attempts ]; do
  LATEST_DEPLOYMENT_JSON=$(koyeb deployments list -o json | jq '.deployments | sort_by(.created_at) | last')
  DEPLOYMENT_ID=$(echo $LATEST_DEPLOYMENT_JSON | jq -r '.id')
  DEPLOYMENT_STATUS=$(echo $LATEST_DEPLOYMENT_JSON | jq -r '.status | select(.!=null)')

  if [ "$DEPLOYMENT_STATUS" = "HEALTHY" ]; then
    echo "Deployment ${DEPLOYMENT_ID} is healthy."

    if [ "$LOGS_STARTED" = true ]; then
       kill $LOGS_PID
    fi

    exit 0
  fi

  if [ "$DEPLOYMENT_STATUS" = "STARTING" ]; then
    echo "Deployment ${DEPLOYMENT_ID} is starting."

     if [ "$LOGS_STARTED" = false ]; then
       # Start logging deployment and get its PID
       koyeb deployments logs $DEPLOYMENT_ID &
       LOGS_PID=$!
       LOGS_STARTED=true
     fi

   sleep 10;
   continue
  fi

  if [ "$DEPLOYMENT_STATUS" = "PENDING" ]; then
    echo "Deployment ${DEPLOYMENT_ID} is pending."
    sleep 10;
    continue
  fi

  if [ "$DEPLOYMENT_STATUS" = "ERROR" ]; then
    echo "Deployment ${DEPLOYMENT_ID} failed."

      if [ "$LOGS_STARTED" = true ]; then
         kill $LOGS_PID
      fi

    exit 1
  fi

  echo "Deployment is not healthy. Waiting 5 seconds before retrying."
  echo $DEPLOYMENT_STATUS
  sleep 5
  attempts=$((attempts+1))
done

echo "Deployment did not become healthy within the expected time or maximum attempts reached. Aborting redeployment."

koyeb deployments cancel $DEPLOYMENT_ID

    if [ "$LOGS_STARTED" = true ]; then
       kill $LOGS_PID
    fi

exit 1