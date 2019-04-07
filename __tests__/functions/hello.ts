import { index } from '../../src/functions/hello';
const context = require('aws-lambda-mock-context');

const ctx = context();

test('hello handler', () => {
  index({}, ctx, (error, response) => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe(
      'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
    );
  });
});
