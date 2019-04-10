import { hello } from '../../src/services/Hello';

test('hello service', () => {
  expect(hello()).toBe(
    'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
  );
});
