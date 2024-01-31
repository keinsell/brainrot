#!/bin/bash

INSTALLATION_NAME="methylphenidate-runner-set"
NAMESPACE="methylphenidate-runners"
GITHUB_CONFIG_URL="https://github.com/keinsell/methylphenidate"
GITHUB_PAT=$(op read op://dev/arc_4b7a43a2/token)

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
    --set minRunners=1 \
    --set maxRunners=3 \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set

