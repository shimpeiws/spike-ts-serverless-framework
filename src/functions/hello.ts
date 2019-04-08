import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { hello } from '../services/hello_service';
import { success } from '../functions/responses';

export const index: Handler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  success(callback, {
    message: hello(),
    input: event
  });
};
