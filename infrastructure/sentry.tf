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

resource "sentry_project" "webapp" {
  organization = sentry_team.main.organization
  teams        = [sentry_team.main.id]
  name         = "plg-web"
  platform     = "javascript-react"
}

output "sentry_server_project" {
  value = sentry_project.main.id
}


data "sentry_key" "plg_server" {
  organization = sentry_project.main.organization
  project      = sentry_project.main.id
  first        = true
}

output "sentry_server_key" {
  value = data.sentry_key.main
}