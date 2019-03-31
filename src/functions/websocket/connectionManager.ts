import { Callback, Context, Handler, ServerlessAPIGatewayEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Dynamo from '../../lib/DynamoDB';

export const index: Handler = async (
  event: ServerlessAPIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  const dynamo = Dynamo.client(event.isOffline);
  const connectionId: string = event.requestContext.connectionId;
  const eventType = event.requestContext.eventType;
  if (eventType === 'CONNECT') {
    const params: DocumentClient.PutItemInput = {
      TableName: process.env.CONNECTIONS_DYNAMODB_TABLE,
      Item: { ConnectionId: connectionId }
    };
    await dynamo.put(params).promise();
    callback(null, { statusCode: 200, body: JSON.stringify({ message: 'connected' }) });
  } else if (eventType === 'DISCONNECT') {
    const params: DocumentClient.DeleteItemInput = {
      TableName: process.env.CONNECTIONS_DYNAMODB_TABLE,
      Key: { ConnectionId: connectionId }
    };
    await dynamo.delete(params).promise();
    callback(null, { statusCode: 200, body: JSON.stringify({ message: 'disconnected' }) });
  }
};

// export const default: Handler = async (
//   event: ServerlessAPIGatewayEvent,
//   _context: Context,
//   callback: Callback
// ) => {
//   const params = {
//     ConnectionId: event.requestContext.connectionId,
//     Data: 'Error: Invalid action type'
//   };
//   const client = ApiGateway.client();
//   await apiGateway.postToConnection(params).promise();
//   callback(null, { statusCode: 500, body: JSON.stringify({ message: 'invalid message' }) });
// }
