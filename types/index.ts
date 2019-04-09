import { APIGatewayEvent, SQSEvent } from 'aws-lambda';

export interface LambdaResponse {
  statusCode: number;
  body: string;
  headers: { 'Access-Control-Allow-Origin': string };
}

export interface LambdaResponseBody {
  message: string;
  input?: APIGatewayEvent | SQSEvent;
}
