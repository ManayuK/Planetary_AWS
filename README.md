# Web Application on AWS with Terraform
This project demonstrates the deployment of a dynamic, serverless web application on AWS. The application hosts a static contact form website that securely captures and stores user input. The entire cloud infrastructure is provisioned and managed using Terraform
A static website consisting of HTML, CSS, and JavaScript is hosted in an Amazon S3 bucket, which is for public web access. An Amazon API Gateway (HTTP API) provides a public-facing endpoint. This endpoint acts as the secure front door for all incoming data from the website.
When a user fills out the form and clicks "Submit," the website's script.js file sends the form data to the API Gateway endpoint.
The API Gateway triggers an AWS Lambda function, passing along the user's data. The Python-based function (handler.py) processes this information, generates a unique filename to prevent overwrites, and saves the submission as a structured JSON file into a dedicated /submissions folder within the same S3 bucket.
Submissions are stored in JSON format, ensuring data clarity and making it easy for other services to utilize it.
The application uses specific IAM Roles to grant the Lambda function the precise permissions needed to write to S3 and create logs in CloudWatch, following the principle of least privilege.
UI prototyping: v0.dev and Perplexity AI
