resource "random_pet" "database_name" {}

#
#Read-Only
#
#connection_uri (String, Sensitive) Default connection uri. Note that it contains access credentials.
#database_host (String) Default database host.
#database_name (String) Default database name.
#database_password (String, Sensitive) Default database access password.
#database_user (String) Default database role.
#default_branch_id (String) Default branch ID.
#id (String) Project ID.


resource "neon_project" "this" {
  name       = var.project_name
  region_id  = "aws-us-west-2"
  pg_version = 16

  default_endpoint_settings {
    autoscaling_limit_min_cu = 0.5
    autoscaling_limit_max_cu = 1
    suspend_timeout_seconds  = 0
  }


  branch {
    name          = "main"
    database_name = random_pet.database_name.id
    role_name     = "root"
  }

  quota {
    active_time_seconds = 3600
    compute_time_seconds = 3600
    data_transfer_bytes = 1000000000
    logical_size_bytes = 1000000000
    written_data_bytes = 1000000000
  }
}

output "database_connection_uri" {
  value = neon_project.this.connection_uri
}

output "database_host" {
  value = neon_project.this.database_host
}

output "database_name" {
  value = neon_project.this.database_name
}

output "database_password" {
  value = neon_project.this.database_password
}

output "database_user" {
  value = neon_project.this.database_user
}

output "database_url" {
  sensitive = true
  value     = "postgres://${neon_project.this.database_user}:${neon_project.this.database_password}@${neon_project.this.database_host}:5432/${neon_project.this.database_name}"
}


resource "infisical_secret" "DATABASE_PORT" {
  name        = "DATABASE_PORT"
  value       = "5432"
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.this,
  ]
}


resource "infisical_secret" "DATABASE_USER" {
  name        = "DATABASE_USER"
  value       = neon_project.this.database_user
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.this,
  ]
}

resource "infisical_secret" "DATABASE_PASSWORD" {
  name        = "DATABASE_PASSWORD"
  value       = neon_project.this.database_password
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.this,
  ]
}

resource "infisical_secret" "DATABASE_URI" {
  name        = "DATABASE_URI"
  value       = "postgres://${neon_project.this.database_user}:${neon_project.this.database_password}@${neon_project.this.database_host}:5432/${neon_project.this.database_name}"
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.this,
  ]
}

resource "infisical_secret" "DATABASE_HOST" {
  name        = "DATABASE_HOST"
  value       = neon_project.this.database_host
  env_slug    = "dev"
  folder_path = "/"
    depends_on = [
    neon_project.this,
  ]
}