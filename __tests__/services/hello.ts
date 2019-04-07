import { hello } from '../../src/services/hello_service';

test('hello handler', () => {
  expect(hello()).toBe(
    'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
  );
});
