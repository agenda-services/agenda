# Documento de política para DynamoDB
data "aws_iam_policy_document" "get_scheduled_person_dynamo" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:Query",
      "dynamodb:GetItem"
    ]
    resources = [
      "arn:aws:dynamodb:${var.region}:${var.account}:table/people"
    ]
  }
}

# Creación de la política IAM basada en el documento anterior
resource "aws_iam_policy" "get_scheduled_person_dynamo" {
  name   = "get-scheduled-person-dynamo"
  policy = data.aws_iam_policy_document.get_scheduled_person_dynamo.json
}

# Documento de política de asunción para el rol IAM
data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "get_scheduled_person_service" {
  name               = "get-scheduled-person-service"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

# Adjuntar la política DynamoDB al rol IAM
resource "aws_iam_role_policy_attachment" "dynamo_policy_attachment" {
  role       = "lambda_role"
  policy_arn = aws_iam_policy.get_scheduled_person_dynamo.arn
}

# Definición de la función Lambda utilizando el rol IAM creado
module "lambda_function" {
  source        = "../../../../../modules/lambda"
  function_name = "appointments-service_get-scheduled-person"
  handler       = "com.agenda.appointments.functions.GetScheduledPerson::handleRequest"
  runtime       = "java17"
  filename      = "getscheduledperson.jar"
  timeout       = 30

  environment_variables = {
    VAR1 = "value1"
  }
}

