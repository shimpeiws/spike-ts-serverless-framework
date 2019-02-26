import * as AWS from 'aws-sdk';
import { ServerlessAPIGatewayEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export default class DynamoDB {
  static client(event: ServerlessAPIGatewayEvent): DocumentClient {
    if (event.isOffline) {
      return new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      });
    }
    return new AWS.DynamoDB.DocumentClient();
  }
}
