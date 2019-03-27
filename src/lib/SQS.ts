import { SQS as AwsSqs, SQSExtended } from 'aws-sdk';

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
  static queueUrl(queueName: String, isOffline: boolean = false) {
    if (isOffline) {
      return `${this.LOCAL_ENDPOINT}/queue/${queueName}`;
    }
    return `${process.env.SQS_BASE_URL}/${queueName}`;
  }
  static client(isOffline: boolean = false): AwsSqs {
    if (isOffline) {
      return this.localClient();
    }
    return new AwsSqs({ apiVersion: '2012-11-05' });
  }
  static createQueue(
    queueName: string,
    isOffline: boolean = false
  ): Promise<AwsSqs.CreateQueueResult> {
    const client = this.client(isOffline);
    return client.createQueue({ QueueName: queueName }).promise();
  }
  static sendMessage(
    queueName: string,
    messageBody: string,
    isOffline: boolean = false
  ): Promise<AwsSqs.SendMessageResult> {
    const client = this.client(isOffline);
    const params = {
      QueueUrl: this.queueUrl(queueName, isOffline),
      MessageBody: messageBody
    };
    return client.sendMessage(params).promise();
  }
}
