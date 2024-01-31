provider "random" {
}

provider "neon" {
  token = var.neon_token
}

provider "koyeb" {
}

provider "infisical" {
  host          = "https://app.infisical.com" # Only required if using self hosted instance of Infisical, default is https://app.infisical.com
  service_token = var.infisical_service_token
}

provider "aws" {
  region = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}