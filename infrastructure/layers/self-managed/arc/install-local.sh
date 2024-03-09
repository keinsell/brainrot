#!/bin/bash

source .env

# Install ARC
helm install arc \
    --namespace "arc-systems" \
    --create-namespace \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set-controller

# Deploy Runner Set
helm install "${INSTALLATION_NAME}" \
    --namespace "${NAMESPACE}" \
    --create-namespace \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    --set containerMode.type=dind \
    --set minRunners=1 \
    --set maxRunners=10 \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set

