variable "scaleway_region" {
  type        = string
  description = "Scaleway region"
  default     = "pl-waw"
}

variable "scaleway_zone" {
  type        = string
  description = "Scaleway zone"
  default     = "pl-waw-1"
}

variable "scaleway_project" {
  type        = string
  description = "Scaleway project id"
  default     = "d25f8b4c-71cc-463a-9ec9-b193a5d4c04a"
}

variable "scaleway_access_key" {
  type        = string
  description = "Scaleway access key"
}

variable "scaleway_secret_key" {
  type        = string
  description = "Scaleway secret key"
}

variable "mongodb_public_key" {
  type        = string
  description = "MongoDB Atlas public key"
}

variable "mongodb_private_key" {
  type        = string
  description = "MongoDB Atlas private key"
}

variable "mongodb_org_id" {
  type        = string
  description = "MongoDB Atlas organization id"
}

variable "database_user" {
  type        = string
  description = "MongoDB Atlas Database User Name"
}
variable "database_password" {
  type        = string
  description = "MongoDB Atlas Database User Password"
}
variable "database_name" {
  type        = string
  description = "The database in the cluster to limit the database user to, the database does not have to exist yet"
}