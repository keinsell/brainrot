#!/bin/bash

NAMESPACE="ghar-luminar"
GITHUB_CONFIG_URL="https://github.com/keinsell/methylphenidate"
GITHUB_PAT=$(op read op://dev/arc_4b7a43a2/token)

SCALESET_FILENAME="scaleset-luminar-linux-x64"
SCALESET_INSTALLATION_NAME="luminar-linux-x64"

helm install "${SCALESET_INSTALLATION_NAME}-x1" \
    --namespace "${NAMESPACE}" \
    --create-namespace \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    -f ./${SCALESET_FILENAME}-1x.yml \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set

helm install "${SCALESET_INSTALLATION_NAME}-x2" \
    --namespace "${NAMESPACE}" \
    --create-namespace \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    -f ./${SCALESET_FILENAME}-2x.yml \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set

helm install "${SCALESET_INSTALLATION_NAME}-x4" \
    --namespace "${NAMESPACE}" \
    --create-namespace \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    -f ./${SCALESET_FILENAME}-4x.yml \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set

helm install "${SCALESET_INSTALLATION_NAME}-x8" \
    --namespace "${NAMESPACE}" \
    --create-namespace \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    -f ./${SCALESET_FILENAME}-8x.yml \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set