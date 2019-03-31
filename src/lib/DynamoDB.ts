import { DynamoDB as AwsDynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export default class DynamoDB {
  static client(isOffline: boolean = false): DocumentClient {
    if (isOffline) {
      return new AwsDynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      });
    }
    return new AwsDynamoDB.DocumentClient();
  }
}
