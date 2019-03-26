import { SQS as AwsSqs, SQSExtended } from 'aws-sdk';
import { ServerlessAPIGatewayEvent } from 'aws-lambda';

export default class SQS {
  static get LOCAL_ENDPOINT() {
    return 'http://localhost:9324';
  }
  static localClient(): AwsSqs {
    const sqs = new AwsSqs({
      apiVersion: '2012-11-05',
      region: 'localhost'
    });
    const sqsExtended: SQSExtended = <SQSExtended>sqs;
    sqsExtended.setEndpoint(this.LOCAL_ENDPOINT);
    return sqsExtended;
  }
  static queueUrl(queueName: String, event: ServerlessAPIGatewayEvent) {
    if (event.isOffline) {
      return `${this.LOCAL_ENDPOINT}/queue/${queueName}`;
    }
    return `${process.env.SQS_BASE_URL}/${queueName}`;
  }
  static client(event: ServerlessAPIGatewayEvent): AwsSqs {
    if (event.isOffline) {
      return this.localClient();
    }
    return new AwsSqs({ apiVersion: '2012-11-05' });
  }
  static createQueue(
    queueName: string,
    event: ServerlessAPIGatewayEvent
  ): Promise<AwsSqs.CreateQueueResult> {
    const client = this.client(event);
    return client.createQueue({ QueueName: queueName }).promise();
  }
  static sendMessage(
    queueName: string,
    messageBody: string,
    event: ServerlessAPIGatewayEvent
  ): Promise<AwsSqs.SendMessageResult> {
    const client = this.client(event);
    const params = {
      QueueUrl: this.queueUrl(queueName, event),
      MessageBody: messageBody
    };
    return client.sendMessage(params).promise();
  }
}
