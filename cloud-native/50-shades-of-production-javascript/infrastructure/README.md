# Infrastructure

This directory contains all the infrastructure code for project and
organization, and is organized through Terraform and Pulumi.

- `Terraform`
- `Pulumi`
- `Kubernetes`
- `FlexCD`
- `Helm`
- `Kustomize`
- `Kubeflow`

## Layers of Infrastructure

- `Foundry`, everything on which organization is built, this may be mostly
  external services which needs to be set up and imported manually because
  infrastructure bootstrapping.
- `Core`, the core infrastructure of the organization, this may be the
  infrastructure which is required to run the organization.
- `Platform`, the platform infrastructure of the organization, this may be the
  infrastructure which is required to run the platform.
- `Application`, the application infrastructure of the organization, this may be
  the infrastructure which is required to run the application.
- `Data`, the data infrastructure of the organization, this may be the
  infrastructure which is required to run the data.
