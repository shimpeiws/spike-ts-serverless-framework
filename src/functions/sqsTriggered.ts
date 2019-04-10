import { Callback, Context, SQSHandler, ServerlessSQSEvent } from 'aws-lambda';
import SearchPixabay from '../services/SearchPixabay';
import { success, invalidParameter } from '../functions/responses';

export const index: SQSHandler = async (
  event: ServerlessSQSEvent,
  _context: Context,
  callback: Callback
) => {
  if (!event.Records || !event.Records[0].body) {
    invalidParameter(callback);
    return;
  }
  const query = event.Records[0].body;
  try {
    await SearchPixabay.search(query, event.isOffline);
    success(callback, {
      message: 'SQS Triggered',
      input: event
    });
  } catch (error) {
    invalidParameter(callback);
  }
};
