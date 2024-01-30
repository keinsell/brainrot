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

resource "neon_branch" "main" {
  name       = "main"
  project_id = neon_project.default.id
}

resource "neon_endpoint" "main" {
  branch_id  = neon_branch.main.id
  project_id = neon_project.default.id
}

resource "neon_role" "db_owner" {
  name       = "owner"
  branch_id  = neon_branch.main.id
  project_id = neon_project.default.id

  depends_on = [
    neon_project.default,
    neon_branch.main,
    neon_endpoint.main
  ]
}

resource "neon_database" "postgres" {
  name       = random_pet.database_name.id
  owner_name = neon_role.db_owner.name
  project_id = neon_project.default.id
  branch_id  = neon_branch.main.id

  depends_on = [
    neon_project.default,
    neon_role.db_owner,
    neon_branch.main,
    neon_endpoint.main
  ]
}