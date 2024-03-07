provider "storj" {
  access_grant = var.storj_access_grant
}

resource "storj_bucket" "this" {
  bucket = "plygrnd"
}

resource "storj_access_grant" "server" {
  access_grant   = var.storj_access_grant
  allow_delete   = true
  allow_download = true
  allow_list     = true
  allow_upload   = true
}

# No support yet to generate S3 creds...

output "storj_access_grant" {
  value     = storj_access_grant.server.derived_access_grant
  sensitive = true
}


