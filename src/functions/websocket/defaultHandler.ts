import { Callback, Context, Handler, ServerlessAPIGatewayEvent } from 'aws-lambda';
import ApiGateway from '../../lib/ApiGateway';

export const index: Handler = async (
  event: ServerlessAPIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  const params = {
    ConnectionId: event.requestContext.connectionId,
    Data: 'Error: Invalid action type'
  };
  const client = ApiGateway.client();
  await client.postToConnection(params).promise();
  callback(null, { statusCode: 500, body: JSON.stringify({ message: 'invalid message' }) });
};
