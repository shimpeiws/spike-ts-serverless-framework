import { APIGatewayEvent } from 'aws-lambda';

declare module 'aws-lambda' {
  interface ServerlessAPIGatewayEvent extends APIGatewayEvent {
    isOffline: boolean;
  }
}
declare module 'aws-lambda' {
  interface ServerlessSQSEvent extends SQSEvent {
    isOffline: boolean;
  }
}
