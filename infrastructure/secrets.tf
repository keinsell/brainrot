resource "infisical_secret" "DATABASE_URI" {
  name  = "DATABASE_URI"
  value = "postgres://${neon_role.db_owner.name}:${neon_role.db_owner
  .password}@${neon_project.this.branch.endpoint
  .host}:5432/${neon_database.this.name}"
  env_slug    = "dev"
  folder_path = "/"
  depends_on  = [
    neon_project.this,
    neon_role.db_owner,
    neon_database.this
  ]
}

resource "infisical_secret" "DATABASE_HOST" {
  name        = "DATABASE_HOST"
  value       = "${neon_project.this.branch.endpoint.host}"
  env_slug    = "dev"
  folder_path = "/"
  depends_on  = [
    neon_project.this,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "KOYEB_TOKEN" {
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
  depends_on  = [
    neon_project.this,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "DATABASE_NAME" {
  name        = "DATABASE_NAME"
  value       = neon_database.this.name
  env_slug    = "dev"
  folder_path = "/"
  depends_on  = [
    neon_project.this,
    neon_role.db_owner,
    neon_database.this
  ]
}


resource "infisical_secret" "DATABASE_USER" {
  name        = "DATABASE_USER"
  value       = neon_role.db_owner.name
  env_slug    = "dev"
  folder_path = "/"
  depends_on  = [
    neon_project.this,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "DATABASE_PASSWORD" {
  name        = "DATABASE_PASSWORD"
  value       = neon_role.db_owner.password
  env_slug    = "dev"
  folder_path = "/"
  depends_on  = [
    neon_project.this,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "DOCKERHUB_USERNAME" {
  name        = "DOCKERHUB_USERNAME"
  env_slug    = "dev"
  folder_path = "/"
  value       = var.dockerhub_username
}


resource "infisical_secret" "DOCKERHUB_TOKEN" {
  name        = "DOCKERHUB_TOKEN"
  value       = var.dockerhub_token
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "AWS_SECRET_KEY" {
  name        = "AWS_SECRET_KEY"
  value       = var.aws_secret_key
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "AWS_ACCESS_KEY" {
  name        = "AWS_ACCESS_KEY"
  value       = var.aws_access_key
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "AWS_REGION" {
  name        = "AWS_REGION"
  value       = var.aws_region
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "GH_PAT" {
  name        = "GH_PAT"
  value       = var.github_token
  env_slug    = "dev"
  folder_path = "/"
}