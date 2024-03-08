terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.5.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "2.4.1"
    }
  }
}


provider "minikube" {}

resource "minikube_cluster" "docker" {
  driver       = "docker"
  cluster_name = "minikube"
  addons = [
    "default-storageclass",
    "storage-provisioner"
  ]
}

provider "kubernetes" {
  host = minikube_cluster.docker.host

  client_certificate     = minikube_cluster.docker.client_certificate
  client_key             = minikube_cluster.docker.client_key
  cluster_ca_certificate = minikube_cluster.docker.cluster_ca_certificate
}

resource "kubernetes_namespace" "arc-systems" {
  metadata {
    name = "arc-systems"
  }
}

provider "helm" {
  kubernetes {
    host = minikube_cluster.docker.host

    client_certificate     = minikube_cluster.docker.client_certificate
    client_key             = minikube_cluster.docker.client_key
    cluster_ca_certificate = minikube_cluster.docker.cluster_ca_certificate
  }
}

# resource "helm_release" "arc" {
#   name       = "arc"
#   namespace  = kubernetes_namespace.arc-systems.metadata[0].name
#   repository = "https://ghcr.io/actions/actions-runner-controller-charts"
#   chart      = "gha-runner-scale-set-controller"
# }

# resource "helm_release" "runner_set" {
#   name       = "luminar-linux-x64-x1"
#   namespace  = "methylphenidate-runners"
#   repository = "https://ghcr.io/actions/actions-runner-controller-charts"
#   chart      = "gha-runner-scale-set"

#   set {
#     name  = "githubConfigUrl"
#     value = "https://github.com/keinsell/plygrnd"
#   }

#   set_sensitive {
#     name  = "githubConfigSecret.github_token"
#     value = var.github_pat
#   }

#   set {
#     name  = "containerMode.type"
#     value = "dind"
#   }

#   set {
#     name  = "minRunners"
#     value = "1"
#   }

#   set {
#     name  = "maxRunners"
#     value = "10"
#   }
# }

# variable "github_pat" {
#   description = "GitHub Personal Access Token"
#   sensitive   = true
# }
