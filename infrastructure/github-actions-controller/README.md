# Github Actions Controller (ARC)

## Running Locally

```
minikube start
kind create cluster --name gh-arc
```

## Install ARC

```bash
helm install arc \
    --namespace "arc-systems" \
    --create-namespace \
    oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set-controller
```

## Deploy Runner Set

```bash
INSTALLATION_NAME="arc-runner-set"
NAMESPACE="arc-runners"
GITHUB_CONFIG_URL="https://github.com/keinsell/methylphenidate"
GITHUB_PAT="https://start.1password.com/open/i?a=AGB6IINATJEM3PFXXMECF4LH5Y&v=fsb3rbeutn2ylhotgweoxvwreu&i=po5tl4bvf3hjjql2snrtpobiui&h=my.1password.com"

helm install "${INSTALLATION_NAME}" \
--namespace "${NAMESPACE}" \
--create-namespace \
--set githubConfigUrl="${GITHUB_CONFIG_URL}" \
--set githubConfigSecret.github_token="${GITHUB_PAT}" \
--set minRunners=3 \
--set maxRunners=20 \
oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set
```

## Updating

```
kubectl create secret generic gh-arc-pat \
   --namespace=arc-runners \
   --from-literal=github_token='https://start.1password.com/open/i?a=AGB6IINATJEM3PFXXMECF4LH5Y&v=fsb3rbeutn2ylhotgweoxvwreu&i=po5tl4bvf3hjjql2snrtpobiui&h=my.1password.com'
```

```
helm upgrade "${INSTALLATION_NAME}" \
oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set \
--namespace "${NAMESPACE}" \
--set githubConfigUrl="${GITHUB_CONFIG_URL}" \
--set githubConfigSecret.github_token="${GITHUB_PAT}" \
--set minRunners=3 \
--set maxRunners=20
```


