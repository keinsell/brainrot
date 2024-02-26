data "terraform_remote_state" "shared" {
  backend = "remote"

  config = {
    organization = "keinsell"
    workspaces = {
      name    = "methylphenidate"
      project = "plygrnd"
    }
  }
}
