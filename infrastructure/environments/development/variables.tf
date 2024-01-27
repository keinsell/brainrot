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