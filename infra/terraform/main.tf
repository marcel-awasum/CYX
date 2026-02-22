terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" { region = var.aws_region }

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.8.1"
  name = "cyx-vpc"
  cidr = "10.10.0.0/16"
  azs  = ["${var.aws_region}a", "${var.aws_region}b"]
  private_subnets = ["10.10.1.0/24", "10.10.2.0/24"]
  public_subnets  = ["10.10.101.0/24", "10.10.102.0/24"]
}

resource "aws_s3_bucket" "docs" { bucket = "${var.prefix}-cyx-docs" }
resource "aws_db_instance" "postgres" {
  identifier = "${var.prefix}-cyx-rds"
  engine = "postgres"
  instance_class = "db.t4g.micro"
  allocated_storage = 20
  username = "cyx"
  password = var.db_password
  db_name = "cyx"
  skip_final_snapshot = true
}
resource "aws_elasticache_cluster" "redis" {
  cluster_id = "${var.prefix}-cyx-redis"
  engine = "redis"
  node_type = "cache.t4g.micro"
  num_cache_nodes = 1
}
