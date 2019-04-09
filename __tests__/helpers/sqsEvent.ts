import {
  ServerlessSQSEvent,
  SQSRecord,
  SQSRecordAttributes,
  SQSMessageAttributes
} from 'aws-lambda';

export function mockSqsEvent(message: string): ServerlessSQSEvent {
  const sqsRecordAttributes: SQSRecordAttributes = {
    ApproximateReceiveCount: 'ApproximateReceiveCount',
    SentTimestamp: 'SentTimestamp',
    SenderId: 'SenderId',
    ApproximateFirstReceiveTimestamp: 'ApproximateFirstReceiveTimestamp'
  };
  const sqsMessageAttributes: SQSMessageAttributes = {
    key: {
      dataType: 'dataType',
      stringListValues: null,
      binaryListValues: null
    }
  };
  const sqsRecord: SQSRecord = {
    messageId: 'messageId',
    receiptHandle: 'receiptHandle',
    body: message,
    attributes: sqsRecordAttributes,
    messageAttributes: sqsMessageAttributes,
    md5OfBody: 'md5OfBody',
    eventSource: 'eventSource',
    eventSourceARN: 'eventSourceARN',
    awsRegion: 'awsRegion'
  };
  const event: ServerlessSQSEvent = {
    isOffline: true,
    Records: [sqsRecord]
  };
  return event;
}
