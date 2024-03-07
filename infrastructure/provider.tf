provider "random" {
}

provider "infisical" {
  host          = "https://app.infisical.com"
  # Only required if using self hosted instance of Infisical, default is https://app.infisical.com
  service_token = var.infisical_service_token
}

#provider "cloudflare" {
#  api_token = var.cloudflare_api_token
#}


provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}
