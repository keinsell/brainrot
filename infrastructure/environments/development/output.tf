output "database_host" {
  sensitive = false
  value     = neon_project.default.branch.endpoint.host
}

output "database_password" {
  sensitive = true
  value     = neon_role.db_owner.password
}

output "database_url" {
  sensitive = true
  value     = "postgres://${neon_role.db_owner.name}:${neon_role.db_owner.password}@${neon_project.default.branch.endpoint.host}:5432"
}

output "server_host" {
  sensitive = false
  value     = koyeb_app.methyphenidate-server.domains[0].name
}