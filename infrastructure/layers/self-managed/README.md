# Self-Managed Infrastructure

Welcome to the self-managed infrastructure repository! This repository is dedicated to organization-wide resources and
tools, focusing on the infrastructure side of software development. Here, you'll find configurations and implementations
for various services used by different teams within an organization. In some cases, this might include a central
`infrastructure` repository using Terraform.

This is intented to utilize cluster of Raspberry Pi's, and other low-cost hardware to host the services,
or eventually use high-end hardware to host the services with high requirements for resources such as local language
models, observability tools, and other services.
Purpose of this is to have a self-hosted infrastructure, with a "low cost" and "high availability"
(in terms of my own machines this will be chaos engineering on 20% uptime, lolz) -
a little time-waster to play along managing existing solutions that hold data and could be broken to refresh my system
administration skills.

As a repository is built with a broke developer, without willing to spend a lot of money on the cloud infrastructure,
as 20% uptime for most of these services is just enough, in my opinion (#whoCaresAboutLogs) I'll self-host most of the
crap that I need, with a fancy way of setup.

## Hardware

- Luminar (Ryzen 9 7950X @ 6.00Ghz, 128GB RAM, 5TB NVMe, 12TB HDD)
- Raspberry Pi 4 (8GB RAM, 1TB HDD)

## Features

- [ ] Common applications for developers and organizations, along with heavy-duty applications for processing tons of data (ex. Sentry)
- [ ] Automated bare-metal provisioning and configuration management
- [ ] Automated Kubernetes installation and management
- [ ] Installing and managing applications using GitOps
- [ ] Automatic rolling upgrades for OS and Kubernetes
- [ ] Automatic updates for applications upon approval
- [ ] Modular architecture, easy to add or remove features/components
- [ ] Automated certificate management
- [ ] Automatically update DNS records for exposed services
- [ ] VPN without port forwarding
- [ ] Expose services to the internet securely with Cloudflare Tunnel
- [ ] CI/CD platform
- [ ] Private container registry
- [ ] Distributed 
- [ ] Support multiple environments (dev, prod)
- [ ] Monitoring and alerting
- [ ] Automated offsite backups
- [ ] Single sign-on
- [ ] Infrastructure testing

## Tasklist

- [ ] **Grafana**: Set up Grafana for monitoring and observability.
- [ ] **Prometheus**: Set up Prometheus for monitoring and observability.
- [ ] **Sentry**: Set up Sentry for error tracking and monitoring.
- [ ] **Posthog**: Set up Posthog for product analytics.
- [ ] **Eleven CRM**: Set up Eleven CRM for customer relationship management.
- [ ] **Novu**: Set up Novu for notifications and alerts.
- [ ] **SigNoz**: Set up SigNoz for observability and monitoring.
- [ ] **Sourcegraph**: Set up Sourcegraph for code search and navigation.
- [ ] **Uptrace**: Set up Uptrace for observability and monitoring.
- [ ] **Pirsch.io for Developers**: Set up Pirsch.io for developers for analytics and monitoring.
- [ ] **Supabase**: Set up Supabase for database and authentication.
- [ ] **Hasura**: Set up Hasura for GraphQL and database.
- [ ] **Portainer**: Set up Portainer for container management.
- [ ] **Traefik**: Set up Traefik for reverse proxy and load balancing.
- [ ] **MinIO**: Set up MinIO for object storage
- [ ] https://github.com/Kong/kong 
- [ ] https://github.com/makeplane/plane
- [ ] https://github.com/appwrite/appwrite
- [ ] https://github.com/ory/hydra
- [ ] https://github.com/harness/gitness
- [ ] https://github.com/rancher/rancher
- [ ] https://github.com/maybe-finance/maybe?tab=readme-ov-file
- [ ] https://github.com/outline/outline
- [ ] https://github.com/QuivrHQ/quivr
- [ ] https://github.com/uber/kraken

## Local Port Forwarding

- `9000` - Sentry
- `9001` - Posthog
- `9002` - Grafana
- `9003` - Prometheus
- `9004` - Novu
- `9005` - Eleven CRM
- `9006` - SigNoz
- `9007` - Sourcegraph
- `10037` - Bytebase


## Docker

https://github.com/YouMightNotNeedKubernetes/rclone-volume-driver-guide

```bash
mkdir -p /home/keinsell/.config/rclone-docker
```

```bash
docker plugin install rclone/docker-volume-rclone:amd64 \
  --alias rclone \
  --grant-all-permissions \
  args="-v --allow-other"
```