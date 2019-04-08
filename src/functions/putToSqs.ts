import { Callback, Context, Handler, ServerlessAPIGatewayEvent } from 'aws-lambda';
import SQS from '../lib/SQS';
import { success } from '../functions/responses';

export const index: Handler = async (
  event: ServerlessAPIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  const queueName = process.env.TEST_QUEUE_NAME;
  await SQS.createQueue(queueName, event.isOffline);
  await SQS.sendMessage(queueName, JSON.parse(event.body).message, event.isOffline);
  success(callback, {
    message: 'Put To Sqs Success!',
    input: event
  });
};
