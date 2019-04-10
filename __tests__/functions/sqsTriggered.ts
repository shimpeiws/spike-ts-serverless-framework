import { ServerlessSQSEvent } from 'aws-lambda';
import { index } from '../../src/functions/sqsTriggered';
import SearchPixabay from '../../src/services/SearchPixabay';
import { mockSqsEvent } from '../helpers/sqsEvent';

const context = require('aws-lambda-mock-context');

const ctx = context();

const mockPixabaySearch = () => {
  const mockSearch = jest.fn();
  mockSearch.mockReturnValue('');
  SearchPixabay.search = mockSearch.bind(SearchPixabay);
};

test('sqsTriggered handler with message', async () => {
  mockPixabaySearch();
  const callback = async (error, response) => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('SQS Triggered');
  };
  const event: ServerlessSQSEvent = mockSqsEvent('Hello');
  await index(event, ctx, callback);
});

test('sqsTriggered handler without message', async () => {
  mockPixabaySearch();
  const callback = async (error, response) => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(422);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Invalid parameter');
  };
  const event: ServerlessSQSEvent = mockSqsEvent('');
  await index(event, ctx, callback);
});
