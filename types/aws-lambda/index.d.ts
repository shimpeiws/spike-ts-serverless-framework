import { APIGatewayEvent } from 'aws-lambda';

declare module 'aws-lambda' {
  interface ServerlessAPIGatewayEvent extends APIGatewayEvent {
    isOffline: boolean;
  }
}
