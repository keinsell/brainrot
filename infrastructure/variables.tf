variable "project_name" {
  type        = string
  description = "Preferably name of a complete system or repository"
  default     = "methylophenidate"
}

#variable "cloudflare_token" {
#  description = "API Token to Cloudflare.\n https://dash.cloudflare.com/profile/api-tokens"
#  type        = string
#}

variable "sentry_token" {
  description = "You will need to configure the provider by providing an authentication token. You can create an authentication token within Sentry by creating an internal integration. This is also available for self-hosted Sentry. https://docs.sentry.io/product/integrations/integration-platform/internal-integration/#auth-tokens"
  type        = string
}

variable "storj_access_grant" {
  type = string
}

variable "sentry_base_url" {
  description = "Base URL to Sentry."
  type        = string
  default     = "https://sentry.io"
}

variable "neon_token" {
  description = "Developer Token dedicated to interact with Neon Platform.\n https://console.neon.tech/app/settings/api-keys"
}

variable "koyeb_token" {
  description = "Developer Token dedicated to interact with Koyeb Platform.\n https://app.koyeb.com/user/settings/api"
}

variable "infisical_service_token" {
  description = "Developer Token dedicated to interact with Infisical Platform.\n https://app.infisical.com/project/65b52b18d18e1b9f52830831/members"
}


variable "dockerhub_username" {
  description = "Username to Dockerhub.\n https://hub.docker.com/settings/security"
}

variable "dockerhub_token" {
  description = "Access Token to Dockerhub.\n https://hub.docker.com/settings/security"
}

variable "tf_access_token" {
  description = "Access Token to Terraform Cloud.\nhttps://app.terraform.io/app/settings/tokens"
}

variable "aws_region" {
  default     = "eu-west-1"
  description = "AWS region"
  type        = string
}

variable "aws_access_key" {
  type = string
}

variable "aws_secret_key" {
  type = string
}

variable "github_token" {
  description = "Access Token to Github.\nhttps://github.com/settings/tokens"
  type        = string
}

variable "github_owner" {
  default     = "keinsell"
  description = "Github owner"
}
