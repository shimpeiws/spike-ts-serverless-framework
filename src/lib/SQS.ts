import SQS as AWS from 'aws-sdk/clients/sqs';
import { ServerlessAPIGatewayEvent } from 'aws-lambda';
import { SQS } from 'aws-sdk';

export default class SQS {
  static get LOCAL_ENDPOINT() {
    return 'http://localhost:9324';
  }
  static localClient(): SQS {
    const sqs = new SQS({
      apiVersion: '2012-11-05',
      region: 'localhost'
    });
    sqs.setEndpoint(this.LOCAL_ENDPOINT);
    return sqs;
  }
  static queueUrl(queueName: String, event: ServerlessAPIGatewayEvent) {
    if (event.isOffline) {
      return `${this.LOCAL_ENDPOINT}/queue/${queueName}`;
    }
    return `${process.env.SQS_BASE_URL}/${queueName}`;
  }
  static client(event: ServerlessAPIGatewayEvent): SQS {
    if (event.isOffline) {
      return this.localClient();
    }
    return new SQS({ apiVersion: '2012-11-05' });;
  }
}
