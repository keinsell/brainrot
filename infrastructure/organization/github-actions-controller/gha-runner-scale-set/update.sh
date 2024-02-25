#!/bin/bash

source ../.env

SCALESET_FILENAME="scaleset-luminar-linux-x64"
SCALESET_INSTALLATION_NAME="luminar-linux-x64"

helm upgrade "${SCALESET_INSTALLATION_NAME}-x1" \
    --namespace "${NAMESPACE}" \
    --create-namespace \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    -f ./${SCALESET_FILENAME}-1x.yml \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set

helm upgrade "${SCALESET_INSTALLATION_NAME}-x2" \
    --namespace "${NAMESPACE}" \
    --create-namespace \
    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
    -f ./${SCALESET_FILENAME}-2x.yml \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set

#helm install "luminar-linux-x64-x4" \
#    --namespace "ghar-luminar" \
#    --create-namespace \
#    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
#    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
#    -f ./grss-luminar-linux-x64-x4.yml \
#    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set
#
#helm install "luminar-linux-x64-x8" \
#    --namespace "ghar-luminar" \
#    --create-namespace \
#    --set githubConfigUrl="${GITHUB_CONFIG_URL}" \
#    --set githubConfigSecret.github_token="${GITHUB_PAT}" \
#    -f ./grss-luminar-linux-x64-x8.yml \
#    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set
