import { Callback, Context, Handler } from 'aws-lambda';
import SQS from '../lib/SQS';
import { ServerlessAPIGatewayEvent } from 'aws-lambda';

export const index: Handler = async (
  event: ServerlessAPIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  const queueName = process.env.TEST_QUEUE_NAME;
  await SQS.createQueue(queueName, event);
  await SQS.sendMessage(queueName, JSON.parse(event.body).message, event);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Put To Sqs Success!'
    })
  };
  callback(null, response);
};
