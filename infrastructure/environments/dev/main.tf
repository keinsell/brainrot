terraform {
  cloud {
    organization = "keinsell"
    workspaces {
      name = "methylphenidate"
    }
  }
  required_providers {
    scaleway = {
      source  = "scaleway/scaleway"
      version = "2.12.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }
  required_version = ">= 1.0"
}


resource "random_pet" "cluster" {}
resource "random_pet" "pool" {}
resource "random_pet" "database_name" {}

resource "scaleway_account_project" "project" {
  name = "methylphenidate"
}

resource "scaleway_k8s_cluster" "cluster" {
  project_id                  = var.scaleway_project
  name                        = random_pet.cluster.id
  version                     = "1.24.3"
  cni                         = "cilium"
  delete_additional_resources = true

  depends_on = [scaleway_account_project.project]
}

resource "scaleway_rdb_database" "postgres" {
  instance_id = ""
  name        = ""
  depends_on  = [scaleway_account_project.project]
}

resource "scaleway_k8s_pool" "pool" {
  depends_on          = [scaleway_k8s_cluster.cluster]
  cluster_id          = scaleway_k8s_cluster.cluster.id
  region              = var.scaleway_region
  name                = random_pet.pool.id
  node_type           = "PLAY2-NANO"
  size                = 1
  zone                = var.scaleway_zone
  wait_for_pool_ready = true
}