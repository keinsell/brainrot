# TOOD: I cannot find a way to automate connection between GitHub and Sentry
# For now it will be requried to be done manually

provider "sentry" {
  token    = var.sentry_token
  base_url = var.sentry_base_url
}

# Usually this would be a data source, but we're creating a new organization
data "sentry_organization" "this" {
  # Taken from URL: https://sentry.io/organizations/[slug]/issues/
  slug = "keinsell"
}


output "sentry_organization" {
  value = data.sentry_organization.this
}


resource "sentry_team" "main" {
  organization = data.sentry_organization.this.id
  name         = "plygrnd"
}

output "sentry_team" {
  value = sentry_team.main.id
}

resource "sentry_project" "main" {
  organization = sentry_team.main.organization
  teams        = [sentry_team.main.id]
  name         = "plg-server"
  platform     = "node"
}

data "sentry_key" "plg_server" {
  organization = sentry_project.main.organization
  project      = sentry_project.main.id
  first        = true
  depends_on   = [sentry_project.main]
}

output "project_key" {
  value = data.sentry_key.plg_server
}

resource "github_app_installation_repository" "sentry" {
  installation_id = "sentry"
  repository      = "${github_repository.this.name}"
}

data "sentry_organization_integration" "github" {
  organization = data.sentry_organization.this.name
  provider_key = "github"
  name         = "keinsell"
}


resource "sentry_organization_repository_github" "this" {
  organization   = data.sentry_organization.this.name
  integration_id = data.sentry_organization_integration.github.internal_id
  identifier     = "keinsell/${github_repository.this.name}"
}
