import { v1 } from 'uuid';
import axios from 'axios';
import DynamoDB from '../lib/DynamoDB';

export default class SearchPixabay {
  static async search(query: String, isOffline: boolean = false) {
    const client = axios.create({
      baseURL: 'https://pixabay.com/api',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'json'
    });
    const res = await client.get('/', {
      params: {
        key: process.env.PIXABAY_API_KEY,
        q: query
      }
    });
    if (!res.data || !res.data.hits) {
      return;
    }
    const sliced = res.data.hits.slice(0, 9);
    const urls = sliced.map(obj => obj.webformatURL);

    const dynamo = DynamoDB.client(isOffline);
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.IMAGES_DYNAMODB_TABLE,
      Item: {
        id: v1(),
        query,
        urls,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    };
    try {
      await dynamo.put(params).promise();
      return;
    } catch (error) {
      console.info('error', error);
      return;
    }
  }
}
