import { ApiGatewayManagementApi } from 'aws-sdk';

export default class ApiGateway {
  static client() {
    return new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: process.env.WEBSOCKET_API_GATEWAY_URL
    });
  }
}
