resource "random_pet" "database_name" {}

resource "neon_role" "db_owner" {
  name       = "owner"
  branch_id  = neon_project.this.branch.id
  project_id = neon_project.this.id
}

resource "neon_database" "this" {
  name       = random_pet.database_name.id
  owner_name = neon_role.db_owner.name
  project_id = neon_project.this.id
  branch_id  = neon_project.this.branch.id

  depends_on = [
    neon_project.this,
    neon_role.db_owner,
  ]
}