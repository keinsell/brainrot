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
  value     = koyeb_app.this.domains[0].name
}

output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group ids attached to the cluster control plane"
  value       = module.eks.cluster_security_group_id
}

output "region" {
  description = "AWS region"
  value       = var.aws_region
}

output "cluster_name" {
  description = "Kubernetes Cluster Name"
  value       = module.eks.cluster_name
}