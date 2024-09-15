terraform {
  backend "s3" {
    bucket  = "appointments-terraform"
    key     = "terraform/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}
