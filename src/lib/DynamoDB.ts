import * as AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

export default class DynamoDB {
  static client(event: APIGatewayEvent): void {
    if (event.isOffline) {
      return new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      });
    }
    return new AWS.DynamoDB.DocumentClient();
  }
}
