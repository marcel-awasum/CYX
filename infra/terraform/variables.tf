variable "aws_region" { type = string default = "eu-west-1" }
variable "prefix" { type = string default = "demo" }
variable "db_password" { type = string sensitive = true }
