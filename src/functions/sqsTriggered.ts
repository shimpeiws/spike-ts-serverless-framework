import { Callback, Context, SQSHandler, ServelessSQSEvent } from 'aws-lambda';
import SearchPixabay from '../lib/SearchPixabay';

export const index: SQSHandler = async (
  event: ServelessSQSEvent,
  _context: Context,
  callback: Callback
) => {
  const query = event.Records[0].body;
  await SearchPixabay.search(query, event.isOffline);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SQS Triggered',
      input: event
    })
  };
  callback(null, response);
};
