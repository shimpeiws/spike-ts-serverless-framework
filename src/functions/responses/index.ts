import { Callback } from 'aws-lambda';
import { LambdaResponseBody, LambdaResponse } from '../../../types';

const headers = {
  'Access-Control-Allow-Origin': '*'
};

export function success(callback: Callback, body: LambdaResponseBody): void {
  const response: LambdaResponse = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(body)
  };
  callback(null, response);
}

export function invalidParameter(callback: Callback, body: LambdaResponseBody = null): void {
  const bodyResponse = body ? body : { message: 'Invalid parameter' };
  const response: LambdaResponse = {
    statusCode: 422,
    headers: headers,
    body: JSON.stringify(bodyResponse)
  };
  callback(null, response);
}
