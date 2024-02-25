resource "koyeb_service" "server" {
  app_name = koyeb_app.this.name

  definition {
    # This name stands for the name of the service
    # Preferably this should be related to our project name
    # Random pet is used to generate a random name
    name = "server"

    # Instance types
    instance_types {
      type = "nano"
    }

    # Scaling
    scalings {
      min = 1
      max = 1
    }

    # Environment variables
    env {
      key   = "PORT"
      value = var.application_http_port
    }

    env {
      key   = "SERVICE_NAME"
      value = var.project_name
    }
    env {
      key   = "NODE_ENV"
      value = "production"
    }
    env {
      key   = "DATABASE_URI"
      secret = "postgres://${neon_role.db_owner.name}:${neon_role.db_owner
      .password}@${neon_project.this.branch.endpoint
      .host}:5432/${neon_database.this.name}"
    }
    env {
      key = "SENTRY_DSN"
      value = data.sentry_key.plg_server
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
      image                 = "keinsell/methylphenidate-server:dev"
      image_registry_secret = var.koyeb_dockerhub_registry_secret
    }
  }

  depends_on = [
    neon_project.this,
    koyeb_app.this
  ]
}

resource "infisical_secret" "KOYEB_SERVICE_ID" {
  name        = "KOYEB_SERVICE_ID"
  value       = koyeb_service.server.id
  env_slug    = "dev"
  folder_path = "/"
  depends_on  = [
    koyeb_service.server
  ]
}