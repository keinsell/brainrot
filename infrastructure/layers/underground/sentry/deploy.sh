#!/bin/bash

helm repo add sentry https://sentry-kubernetes.github.io/charts

helm install "sentry" \
    --namespace "sentry" \
    --create-namespace \
    -f ./values.yml \
    sentry/sentry