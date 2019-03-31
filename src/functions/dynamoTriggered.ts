import { Callback, Context, Handler } from 'aws-lambda';
import { ServerlessAPIGatewayEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ApiGatewayManagementApi } from 'aws-sdk';
import DynamoDB from '../lib/DynamoDB';
import ApiGateway from '../lib/ApiGateway';

export const index: Handler = async (
  event: ServerlessAPIGatewayEvent,
  _context: Context,
  callback: Callback
) => {
  const apiGateway = ApiGateway.client();
  const dynamo = DynamoDB.client(event.isOffline);
  const scanParams: DocumentClient.ScanInput = {
    TableName: process.env.CONNECTIONS_DYNAMODB_TABLE,
    ProjectionExpression: 'ConnectionId'
  };
  const socketClients = await dynamo.scan(scanParams).promise();
  socketClients.Items.map(async ({ ConnectionId }) => {
    const imageParams: DocumentClient.ScanInput = {
      TableName: process.env.IMAGES_DYNAMODB_TABLE
    };
    const images = await dynamo.scan(imageParams).promise();
    let resObj = {};
    images.Items.map(item => {
      resObj[item.query] = item.urls;
    });
    const request: ApiGatewayManagementApi.PostToConnectionRequest = {
      ConnectionId: ConnectionId,
      Data: JSON.stringify(resObj)
    };
    await apiGateway.postToConnection(request).promise();
  });
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Dynamo DB Triggered',
      input: event
    })
  };
  callback(null, response);
};
