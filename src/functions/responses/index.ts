import { Callback } from 'aws-lambda';
import { LambdaResponseBody, LambdaResponse } from '../../../types';

export function success(callback: Callback, body: LambdaResponseBody): void {
  const response: LambdaResponse = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  };
  callback(null, response);
}
