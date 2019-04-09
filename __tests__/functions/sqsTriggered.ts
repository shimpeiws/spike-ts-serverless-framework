import { ServerlessSQSEvent } from 'aws-lambda';
import { index } from '../../src/functions/sqsTriggered';
import SearchPixabay from '../../src/lib/SearchPixabay';
import { mockSqsEvent } from '../helpers/sqsEvent';

const context = require('aws-lambda-mock-context');

const ctx = context();

beforeEach(async () => {
  const mockSearch = jest.fn();
  mockSearch.mockReturnValue('');
  SearchPixabay.search = mockSearch.bind(SearchPixabay);
});

test('sqsTriggered handler', async () => {
  const callback = async (error, response) => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
  };
  const event: ServerlessSQSEvent = mockSqsEvent('Hello');
  await index(event, ctx, callback);
});
