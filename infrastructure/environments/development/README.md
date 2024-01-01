```bash
terraform init
terraform plan -var-file=.tfvars
terraform apply -var-file=.tfvars -auto-approve
terraform output -json > /tmp/terraform-output.json && cat /tmp/terraform-output.json

terraform destroy -var-file=.tfvars -auto-approve
```