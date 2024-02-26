# Generate S3 in AWS

module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3"

  bucket = "my-s3-bucket"
  acl    = "private"

  control_object_ownership = true
  object_ownership         = "ObjectWriter"

  versioning = {
    enabled = true
  }
}
