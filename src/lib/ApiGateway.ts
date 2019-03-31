import { ApiGatewayManagementApi } from 'aws-sdk';
import { APIGatewayEventRequestContext } from 'aws-lambda';

export default class ApiGateway {
  static client(requestContext: APIGatewayEventRequestContext) {
    return new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: requestContext
        ? `${requestContext.domainName}/${requestContext.stage}`
        : `${process.env.WEBSOCKET_API_GATEWAY_URL}`
    });
  }
}
