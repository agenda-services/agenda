# variable "role_name" {
#   description = "The name of the IAM role for Lambda"
#   type        = string
# }

variable "function_name" {
  description = "The name of the Lambda function"
  type        = string
}

variable "handler" {
  description = "The function handler"
  type        = string
}

variable "runtime" {
  description = "The runtime environment for the Lambda function"
  type        = string
}

variable "filename" {
  description = "The path to the Lambda function deployment package"
  type        = string
}

variable "environment_variables" {
  description = "Environment variables for the Lambda function"
  type        = map(string)
  default     = {}
}

variable "timeout" {
  description = "Timeout in seconds to finish the function"
  type        = number
  default     = 1
}
