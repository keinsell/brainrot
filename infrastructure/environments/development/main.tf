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
    neon = {
      source  = "terraform-community-providers/neon"
      version = "0.1.5"
    }
    koyeb = {
      source = "koyeb/koyeb"
    }
    infisical = {
      source = "infisical/infisical"
    }
  }
  required_version = ">= 1.0"
}

resource "random_pet" "database_name" {}

resource "neon_project" "default" {
  name       = var.project_name
  region_id  = "aws-us-west-2"
  pg_version = 16
  branch     = {
    endpoint = {
      suspend_timeout = 0
    }
    name = "main"
  }
}

resource "neon_role" "db_owner" {
  name       = "owner"
  branch_id  = neon_project.default.branch.id
  project_id = neon_project.default.id
}

resource "neon_database" "postgres" {
  name       = random_pet.database_name.id
  owner_name = neon_role.db_owner.name
  project_id = neon_project.default.id
  branch_id  = neon_project.default.branch.id

  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}


resource "koyeb_app" "methyphenidate-server" {
  # This name stands for top-tier naming under which services are placed
  # Preferably this should be related to our project name
  name = var.project_name
}

#resource "koyeb_secret" "secret_dockerhub_registry_configuration" {
#  name = var.secret_dockerhub_registry_configuration_name
#  type = "REGISTRY"
#  docker_hub_registry {
#    username = var.secret_dockerhub_registry_configuration_username
#    password = var.secret_dockerhub_registry_configuration_token
#  }
#}

variable "application_http_port" {
  default = 1337
}

resource "random_pet" "service_name" {}

resource "infisical_secret" "DATABASE_URI" {
  name        = "DATABASE_URI"
  value       = "postgres://${neon_role.db_owner.name}:${neon_role.db_owner.password}@${neon_project.default.branch.endpoint.host}:5432"
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "DATABASE_HOST" {
  name        = "DATABASE_HOST"
  value       = "${neon_project.default.branch.endpoint.host}"
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "DATABASE_HOST" {
  name        = "KOYEB_TOKEN"
  value       = var.koyeb_token
  env_slug    = "dev"
  folder_path = "/"
}


resource "infisical_secret" "TF_CLOUD_ORGANIZATION" {
  name        = "TF_CLOUD_ORGANIZATION"
  value       = "keinsell"
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "TF_WORKSPACE" {
  name        = "TF_WORKSPACE"
  value       = "methylphenidate"
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "TF_API_TOKEN" {
  name        = "TF_API_TOKEN"
  value       = var.tf_access_token
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "DATABASE_PORT" {
  name        = "DATABASE_PORT"
  value       = "5432"
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}


resource "infisical_secret" "DATABASE_USER" {
  name        = "DATABASE_USER"
  value       = neon_role.db_owner.name
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "DATABASE_PASSWORD" {
  name        = "DATABASE_PASSWORD"
  value       = neon_role.db_owner.password
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
        neon_project.default,
        neon_role.db_owner,
    ]
}

resource "infisical_secret" "DOCKERHUB_USERNAME" {
  name        = "DOCKERHUB_USERNAME"
  env_slug    = "dev"
  folder_path = "/"
  value      = var.dockerhub_username
}


resource "infisical_secret" "DOCKERHUB_TOKEN" {
  name        = "DOCKERHUB_TOKEN"
  value       = var.dockerhub_token
  env_slug    = "dev"
  folder_path = "/"
}

resource "koyeb_service" "methylophenidate-server" {
  app_name = koyeb_app.methyphenidate-server.name
  definition {
    # This name stands for the name of the service
    # Preferably this should be related to our project name
    # Random pet is used to generate a random name
    name = random_pet.service_name.id

    # Instance types
    instance_types {
      type = "free"
    }

    # Scaling
    scalings {
      min = 1
      max = 1
    }

    # Environment variables
    env {
      key   = "SERVICE_NAME"
      value = random_pet.service_name.id
    }
    env {
      key   = "NODE_ENV"
      value = "production"
    }
    env {
      key   = "DATABASE_URI"
      value = "postgres://${neon_role.db_owner.name}:${neon_role.db_owner.password}@${neon_project.default.branch.endpoint.host}:5432"
    }

    # Exposure
    routes {
      path = "/"
      port = var.application_http_port
    }
    # Ports
    ports {
      port     = var.application_http_port
      protocol = "http"
    }

    # Health checks
    health_checks {
          http {
            port = var.application_http_port
            path = "/health"
          }
        }


    # Regions
    regions = ["fra"]

    # Configuration of docker deployment
    docker {
      image = "keinsell/methylphenidate-server:dev"
    }
  }

  depends_on = [
    neon_project.default,
    koyeb_app.methyphenidate-server
  ]
}