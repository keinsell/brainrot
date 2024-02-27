locals {
  environments = {
    preview = "preview"
    development = "development"
    nightly     = "nightly"
    canary      = "canary"
    production  = "production"
  }
  tags = {
    application = "plygrnd"
    environment = "development"
  }
}

terraform {
  cloud {
    organization = "keinsell"
    workspaces {
      project = "plygrnd"
      tags = ["plygrnd"]
    }
  }
  required_providers {
    scaleway = {
      source  = "scaleway/scaleway"
      version = "2.12.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
    neon = {
      source  = "terraform-community-providers/neon"
      version = "0.1.5"
    }
    koyeb = {
      source = "koyeb/koyeb"
    }
    infisical = {
      source = "infisical/infisical"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.7.0"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0.4"
    }

    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }

    cloudinit = {
      source  = "hashicorp/cloudinit"
      version = "~> 2.3.2"
    }

    sentry = {
      source = "jianyuan/sentry"
    }

    // TODO: Add CDN, https://registry.terraform.io/providers/fastly
    fastly = {
      source  = "fastly/fastly"
      version = ">= 5.6.0"
    }

    // TODO: Add Configuration Management, https://registry.terraform.io/providers/configcat
    configcat = {
      source  = "configcat/configcat"
      version = "4.0.0"
    }

    // TODO: Add Airbyte (Self-Hosted), https://registry.terraform.io/providers/airbytehq/airbyte
    airbyte = {
      source  = "airbytehq/airbyte"
      version = "0.4.1"
    }

    // TODO: Give HCP a try, https://registry.terraform.io/providers/hashicorp/hcp
    hcp = {
      source  = "hashicorp/hcp"
      version = "0.83.0"
    }

    storj = {
      source  = "storj/storj"
      version = "0.0.1"
    }
  }
  required_version = ">= 1.0"
}

variable "application_http_port" {
  default = 1337
}

resource "random_pet" "service_name" {}
