# Use brew to install pre-commit hooks
# https://pre-commit.com/#install
brew install pre-commit
pre-commit install
pre-commit autoupdate

# Install and update pnpm
# https://pnpm.io/installation
npm install -g pnpm

# Install trunk
# https://docs.trunk.io/cli/install-trunk
# curl https://get.trunk.io -fsSL | bash

# Install gitleaks to protect against exposing secrets
# https://github.com/gitleaks/gitleaks
docker pull ghcr.io/gitleaks/gitleaks:latest

# TODO: Install rtx-cli