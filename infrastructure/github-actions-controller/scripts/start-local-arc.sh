#!/bin/bash

INSTALLATION_NAME="arc-runner-set"
NAMESPACE="arc-runners"
GITHUB_CONFIG_URL="https://github.com/keinsell/methylphenidate"

# TODO: Use Configu
op read "op://personal/gh-pat-arc-runner/token" > /tmp/gh-pat-arc-runner.token

GITHUB_PAT=$(cat /tmp/gh-pat-arc-runner.token)

# Start Minikube and Create a Kind Cluster
minikube start --driver=docker
kind create cluster --name gh-arc

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
    --set maxRunners=10 \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set

# Upgrade Runner Set
helm upgrade "${INSTALLATION_NAME}" \
    --namespace "${NAMESPACE}" \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    --set minRunners=1 \
    --set maxRunners=10 \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set