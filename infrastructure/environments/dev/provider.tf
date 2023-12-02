provider "scaleway" {
  region     = var.scaleway_region
  access_key = var.scaleway_access_key
  secret_key = var.scaleway_secret_key
  project_id = var.scaleway_project
  zone       = var.scaleway_zone
}

provider "random" {
  # Configuration options
}

provider "mongodbatlas" {
  public_key  = var.mongodb_public_key
  private_key = var.mongodb_private_key
}