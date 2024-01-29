variable "project_name" {
  type        = string
  description = "Preferably name of a complete system or repository"
  default     = "methylophenidate"
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