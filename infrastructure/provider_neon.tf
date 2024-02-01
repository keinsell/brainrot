provider "neon" {
  token = var.neon_token
}

resource "neon_project" "this" {
  name       = local.name
  region_id  = "aws-us-west-2"
  pg_version = 16
  branch     = {
    endpoint = {
      suspend_timeout = 0
    }
    name = "main"
  }
}