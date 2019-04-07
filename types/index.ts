import { APIGatewayEvent } from 'aws-lambda';

export interface LambdaResponse {
  statusCode: number;
  body: string;
}

export interface LambdaResponseBody {
  message: string;
  input?: APIGatewayEvent;
}
