// Terraform managed Github Repository
//
// This is intended to manage deployment environments, secrets and overall configuration
// of organization as not everything can be done within CI/CD and I think
// forwarding secrets from infra to CI is more convenient than the other way
// around. At least I do not waste time configuring this shit every time, and
// ex. when database migration is made through CI/CD and rotation of keys on
// db is enabled things tend to get a little funky.
//
// I do not recommend defining repository from scratch on Terraform, however
// this can be easily resolved by:
// $ terraform import github_repository.terraform terraform
//
// This file will setup:
// - Github Repository
// - Github Repository Environments

provider "github" {
  token = var.github_token
  owner = var.github_owner
}

resource "github_repository" "this" {
  name                        = "plygrnd"
  description                 = "🎠 Plygrnd: Place where bored developer stores his code."
  delete_branch_on_merge      = true
  allow_update_branch         = true
  allow_auto_merge            = true
  has_downloads               = true
  has_issues                  = true
  has_projects                = true
  has_wiki                    = true
  homepage_url                = "https://plygrnd.land"
  is_template                 = true
  merge_commit_message        = "PR_BODY"
  merge_commit_title          = "PR_TITLE"
  squash_merge_commit_message = "PR_BODY"
  squash_merge_commit_title   = "PR_TITLE"
  vulnerability_alerts        = true
  security_and_analysis {
    secret_scanning_push_protection {
      status = "enabled"
    }
  }
}

resource "github_repository_topics" "this" {
  repository = github_repository.this.name
  topics     = ["learning-in-public"]
}


# Github Application must be created before manually
# https://develop.sentry.dev/integrations/github/
# https://github.com/integrations/terraform-provider-github/issues/509
#resource "github_app_installation_repository" "sentry" {
#  installation_id = ""
#  repository      = ""
#}

// Github have a concept of environments which can be used to manage deployments
// and secrets. This is a good way to manage secrets and deployments in a
// centralized way. Especially in highly automated pipelines.
// https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment

resource "github_repository_environment" "development" {
  environment = "development"
  repository  = github_repository.this.name
  depends_on = [github_repository.this]
}

// Testing is performed in a gamma environment to validate that the latest code can be safely deployed to production. The environment is as production-like as possible including configuration, monitoring, and traffic. Additionally, the environment should match the same regions that the production environment uses. The gamma environment is used by other team's beta environments and therefore must maintain acceptable service levels to avoid impacting other team productivity. All actions performed in this stage should complete within 30 minutes to provide fast-feedback.
resource "github_repository_environment" "gamma" {
  environment = "testing-gamma"
  repository  = github_repository.this.name
  depends_on = [github_repository.this]
}

// Testing is performed in a beta environment to validate that the latest code is functioning as expected. This validation is done by first deploying the code and then running integration and end-to-end tests against the deployment. Beta environments will have dependencies on the applications and services from other teams in their gamma environments. All actions performed in this stage should complete within 30 minutes to provide fast-feedback.
resource "github_repository_environment" "beta" {
  environment = "testing-beta"
  repository  = github_repository.this.name
  depends_on = [github_repository.this]
}

// Real environment which is accessible by end-users.
resource "github_repository_environment" "production" {
  environment = "production"
  repository  = github_repository.this.name
  depends_on = [github_repository.this]
}