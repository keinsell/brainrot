# Infrastructure

1. Developer Control Plane (DCP)
 - IDE
 - Service Catalog
 - Version Control
 - Application Source Code
 - Workloads
 - Platform Source Code
2. Integration Control Plane (ICP)
 - CI/CD
 - Artifact Registry
 - Container Registry
 - Image Registry
 - Helm Repository
 - Kustomize Repository
 - FlexCD Repository
3. Monitoring Control Plane (MCP)
    - Logging
    - Metrics
    - Tracing
    - Alerting
    - Observability
    - Security
4. Security Control Plane (SCP)
    - Identity and Access Management
    - Network Security
    - Data Security
    - Application Security
    - Infrastructure Security
    - Compliance
5. Resource Plane
    - Compute, Data, Networking, Services

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
