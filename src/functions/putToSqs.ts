import { Callback, Context, Handler } from 'aws-lambda';
import SQS from '../lib/SQS';
import { ServerlessAPIGatewayEvent } from 'aws-lambda';

export const index: Handler = async (
  event: ServerlessAPIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  const client = SQS.client(event);
  const queueName = process.env.TEST_QUEUE_NAME;
  await client.createQueue({ QueueName: queueName }, () => {}).promise();
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Put To Sqs!',
      input: event
    })
  };
  callback(null, response);
};
