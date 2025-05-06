data "terraform_remote_state" "development" {
  backend = "remote"
  config  = {
    organization = "keinsell"
    workspaces   = {
      project     = "plygrnd"
      environment = "development"
    }
  }
}

provider "koyeb" {
}
