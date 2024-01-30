output "server_host" {
  sensitive = false
  value     = koyeb_app.this.domains[0].name
}