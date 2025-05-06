provider "koyeb" {
}

variable "koyeb_dockerhub_registry_secret" {
  default = "dockerhub_registry"
}

resource "koyeb_app" "this" {
  # This name stands for top-tier naming under which services are placed
  # Preferably this should be related to our project name
  name = var.project_name
}

resource "koyeb_secret" "dockerhub_registry" {
  name = var.koyeb_dockerhub_registry_secret
  type = "REGISTRY"
  docker_hub_registry {
    username = var.dockerhub_username
    password = var.dockerhub_token
  }
}