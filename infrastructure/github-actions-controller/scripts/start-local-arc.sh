#!/bin/bash

INSTALLATION_NAME="methylphenidate-runner-set"
NAMESPACE="methylphenidate-runners"
GITHUB_CONFIG_URL="https://github.com/keinsell/methylphenidate"

op read "op://personal/gh-pat-arc-runner/token" > /tmp/gh-pat-arc-runner.token

GITHUB_PAT=$(cat /tmp/gh-pat-arc-runner.token)

# Start Minikube with signle-node configuration
#minikube start -p local-arc
#kind create cluster --name local-arc

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

# Upgrade Runner Set
helm upgrade "${INSTALLATION_NAME}" \
    --namespace "${NAMESPACE}" \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    --set containerMode.type=dind \
    --set minRunners=3 \
    --set maxRunners=10 \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set