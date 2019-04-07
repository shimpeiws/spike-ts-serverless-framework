import { LambdaResponseBody, LambdaResponse } from '../../../types';

export default function success(body: LambdaResponseBody): LambdaResponse {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  };
}
