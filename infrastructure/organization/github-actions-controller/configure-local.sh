#!/bin/bash

source .env

# Upgrade Runner Set
helm upgrade "${INSTALLATION_NAME}" \
    --namespace "${NAMESPACE}" \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    --set minRunners=1 \
    --set maxRunners=3 \
    --set containerMode.type=dind \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set
