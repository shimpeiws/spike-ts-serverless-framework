import { Callback, Context, Handler } from 'aws-lambda';
import { ServerlessAPIGatewayEvent } from 'aws-lambda';

export const index: Handler = async (
  event: ServerlessAPIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SQS Triggered',
      input: event
    })
  };
  callback(null, response);
};
