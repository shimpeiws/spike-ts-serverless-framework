import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { hello } from '../services/hello_service';

export const index: Handler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: hello(),
      input: event
    })
  };
  callback(null, response);
};
