resource "aws_api_gateway_rest_api" "api" {
  name = "appointments-api"
}

resource "aws_api_gateway_resource" "appointments" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "appointments"
}

resource "aws_api_gateway_resource" "people" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.appointments.id
  path_part   = "people"
}

resource "aws_api_gateway_resource" "id" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.people.id
  path_part   = "{id}"
}

resource "aws_api_gateway_method" "options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.id.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "get" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.id.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.id.id
  http_method             = aws_api_gateway_method.get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:637423513396:function:appointments-service_get-scheduled-person/invocations"
}

resource "aws_api_gateway_integration" "options_lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.id.id
  http_method             = aws_api_gateway_method.options.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:637423513396:function:appointments-service_get-scheduled-person/invocations"
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    aws_api_gateway_integration.get_lambda_integration,
    aws_api_gateway_integration.options_lambda_integration,
  ]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "stag"
}


resource "aws_lambda_permission" "api_gateway_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "appointments-service_get-scheduled-person"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account}:${aws_api_gateway_rest_api.api.id}/*/*/*"
  depends_on    = [aws_api_gateway_deployment.deployment]
}
