import { index } from '../../src/functions/putToSqs';
import SQS from '../../src/lib/SQS';
const context = require('aws-lambda-mock-context');

const ctx = context();
const queueName = 'test-queue-name';

beforeEach(async () => {
  jest.resetModules();
  await SQS.createQueue(queueName, true);
  const currentEnv = process.env;
  process.env = {
    ...currentEnv,
    TEST_QUEUE_NAME: queueName
  };
});

afterEach(async () => {
  await SQS.deleteQueue(queueName, true);
});

test('putToSqs handler', async () => {
  const queueMessage = 'Hello PutToSqs';

  const callback = async (error, response) => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Put To Sqs Success!');
    const receive = await SQS.receiveMessage(process.env.TEST_QUEUE_NAME, true);
    expect(receive.Messages.length).toBe(1);
    expect(receive.Messages[0].Body).toBe(queueMessage);
  };
  await index({ isOffline: true, body: JSON.stringify({ message: queueMessage }) }, ctx, callback);
});

test('putToSqs handler', async () => {
  const queueMessage = '';

  const callback = async (error, response) => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(422);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Invalid parameter');
    try {
      await SQS.receiveMessage(process.env.TEST_QUEUE_NAME, true);
    } catch (e) {
      expect(e).not.toBe(null);
    }
  };
  await index({ isOffline: true, body: JSON.stringify({ message: queueMessage }) }, ctx, callback);
});
