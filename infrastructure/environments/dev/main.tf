terraform {
  cloud {
    organization = "keinsell"
    workspaces {
      name = "methylphenidate"
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
  }
  required_version = ">= 1.0"
}

resource "random_pet" "database_name" {}

resource "neon_project" "default" {
  name       = var.project_name
  region_id  = "aws-us-west-2"
  pg_version = 16
  branch     = {
    endpoint = {
      suspend_timeout = 0
    }
    name = "main"
  }
}

resource "neon_role" "db_owner" {
  name       = "owner"
  branch_id  = neon_project.default.branch.id
  project_id = neon_project.default.id
}

resource "neon_database" "postgres" {
  name       = random_pet.database_name.id
  owner_name = neon_role.db_owner.name
  project_id = neon_project.default.id
  branch_id  = neon_project.default.branch.id

  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}
