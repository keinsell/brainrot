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