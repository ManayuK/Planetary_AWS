import json
import boto3
import os
from datetime import datetime

s3 = boto3.client('s3')
BUCKET = os.environ['UPLOAD_BUCKET']

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
    except Exception:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"message": "Invalid request body"})
        }

    name = body.get("name")
    email = body.get("email")
    message = body.get("message")

    if not name or not email or not message:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"message": "Missing required fields"})
        }

    timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H-%M-%S-%fZ")
    key = f"submissions/{timestamp}_{email}.json"

    data = {
        "name": name,
        "email": email,
        "message": message,
        "timestamp": timestamp
    }

    try:
        s3.put_object(
            Bucket=BUCKET,
            Key=key,
            Body=json.dumps(data),
            ContentType="application/json"
        )
    except Exception as e:
        # Log exception if needed
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"message": "Failed to save submission"})
        }

    # Return a successful HTTP response with CORS headers
    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"message": "Submission saved successfully"})
    }
