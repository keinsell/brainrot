# Use brew to install pre-commit hooks
# https://pre-commit.com/#install
brew install pre-commit
pre-commit install

# Install and update pnpm
# https://pnpm.io/installation
npm install -g pnpm

# Install gitleaks to protect against exposing secrets
# https://github.com/gitleaks/gitleaks
docker pull ghcr.io/gitleaks/gitleaks:latest
