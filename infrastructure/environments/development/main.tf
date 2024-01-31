terraform {
  cloud {
    organization = "keinsell"
    workspaces {
      name = "methylphenidate"
    }
  }
  required_providers {
    scaleway = {
      source  = "scaleway/scaleway"
      version = "2.12.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
    neon = {
      source  = "terraform-community-providers/neon"
      version = "0.1.5"
    }
    koyeb = {
      source = "koyeb/koyeb"
    }
    infisical = {
      source = "infisical/infisical"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.7.0"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0.4"
    }

    cloudinit = {
      source  = "hashicorp/cloudinit"
      version = "~> 2.3.2"
    }
  }
  required_version = ">= 1.0"
}

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

resource "neon_role" "db_owner" {
  name       = "owner"
  branch_id  = neon_project.default.branch.id
  project_id = neon_project.default.id
}

resource "neon_database" "this" {
  name       = random_pet.database_name.id
  owner_name = neon_role.db_owner.name
  project_id = neon_project.default.id
  branch_id  = neon_project.default.branch.id

  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}




#resource "koyeb_secret" "secret_dockerhub_registry_configuration" {
#  name = var.secret_dockerhub_registry_configuration_name
#  type = "REGISTRY"
#  docker_hub_registry {
#    username = var.secret_dockerhub_registry_configuration_username
#    password = var.secret_dockerhub_registry_configuration_token
#  }
#}

variable "application_http_port" {
  default = 1337
}

resource "random_pet" "service_name" {}

resource "infisical_secret" "DATABASE_URI" {
  name        = "DATABASE_URI"
  value       = "postgres://${neon_role.db_owner.name}:${neon_role.db_owner
  .password}@${neon_project.default.branch.endpoint
  .host}:5432/${neon_database.this.name}"
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
    neon_database.this
  ]
}

resource "infisical_secret" "DATABASE_HOST" {
  name        = "DATABASE_HOST"
  value       = "${neon_project.default.branch.endpoint.host}"
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "KOYEB_TOKEN" {
  name        = "KOYEB_TOKEN"
  value       = var.koyeb_token
  env_slug    = "dev"
  folder_path = "/"
}


resource "infisical_secret" "TF_CLOUD_ORGANIZATION" {
  name        = "TF_CLOUD_ORGANIZATION"
  value       = "keinsell"
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "TF_WORKSPACE" {
  name        = "TF_WORKSPACE"
  value       = "methylphenidate"
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "TF_API_TOKEN" {
  name        = "TF_API_TOKEN"
  value       = var.tf_access_token
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "DATABASE_PORT" {
  name        = "DATABASE_PORT"
  value       = "5432"
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "DATABASE_NAME" {
  name        = "DATABASE_NAME"
  value       = neon_database.this.name
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
    neon_database.this
  ]
}



resource "infisical_secret" "DATABASE_USER" {
  name        = "DATABASE_USER"
  value       = neon_role.db_owner.name
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
    neon_project.default,
    neon_role.db_owner,
  ]
}

resource "infisical_secret" "DATABASE_PASSWORD" {
  name        = "DATABASE_PASSWORD"
  value       = neon_role.db_owner.password
  env_slug    = "dev"
  folder_path = "/"
  depends_on = [
        neon_project.default,
        neon_role.db_owner,
    ]
}

resource "infisical_secret" "DOCKERHUB_USERNAME" {
  name        = "DOCKERHUB_USERNAME"
  env_slug    = "dev"
  folder_path = "/"
  value      = var.dockerhub_username
}


resource "infisical_secret" "DOCKERHUB_TOKEN" {
  name        = "DOCKERHUB_TOKEN"
  value       = var.dockerhub_token
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "AWS_SECRET_KEY" {
  name        = "AWS_SECRET_KEY"
  value       = var.aws_secret_key
  env_slug    = "dev"
  folder_path = "/"
}

resource "infisical_secret" "AWS_ACCESS_KEY" {
  name        = "AWS_ACCESS_KEY"
  value       = var.aws_access_key
  env_slug    = "dev"
  folder_path = "/"
}

# Filter out local zones, which are not currently supported 
# with managed node groups
data "aws_availability_zones" "available" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

locals {
  cluster_name = "education-eks-${random_string.suffix.result}"
}

resource "random_string" "suffix" {
  length  = 8
  special = false
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "education-vpc"

  cidr = "10.0.0.0/16"
  azs  = slice(data.aws_availability_zones.available.names, 0, 3)

  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  public_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                      = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"             = 1
  }
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "19.15.3"

  cluster_name    = local.cluster_name
  cluster_version = "1.27"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"

  }

  eks_managed_node_groups = {
    one = {
      name = "node-group-1"

      instance_types = ["t3.micro"]

      min_size     = 1
      max_size     = 1
      desired_size = 1
    }
  }
}


# https://aws.amazon.com/blogs/containers/amazon-ebs-csi-driver-is-now-generally-available-in-amazon-eks-add-ons/ 
data "aws_iam_policy" "ebs_csi_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
}

module "irsa-ebs-csi" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role-with-oidc"
  version = "4.7.0"

  create_role                   = true
  role_name                     = "AmazonEKSTFEBSCSIRole-${module.eks.cluster_name}"
  provider_url                  = module.eks.oidc_provider
  role_policy_arns              = [data.aws_iam_policy.ebs_csi_policy.arn]
  oidc_fully_qualified_subjects = ["system:serviceaccount:kube-system:ebs-csi-controller-sa"]
}

resource "aws_eks_addon" "ebs-csi" {
  cluster_name             = module.eks.cluster_name
  addon_name               = "aws-ebs-csi-driver"
  addon_version            = "v1.20.0-eksbuild.1"
  service_account_role_arn = module.irsa-ebs-csi.iam_role_arn
  tags = {
    "eks_addon" = "ebs-csi"
    "terraform" = "true"
  }
}