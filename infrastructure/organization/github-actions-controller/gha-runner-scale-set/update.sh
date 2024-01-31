#!/bin/bash

NAMESPACE="ghar-luminar"
GITHUB_CONFIG_URL="https://github.com/keinsell/methylphenidate"
GITHUB_PAT=$(op read op://dev/arc_4b7a43a2/token)

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