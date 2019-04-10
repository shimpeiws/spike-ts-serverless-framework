import SearchPixabay from '../../src/services/SearchPixabay';
import DynamoDB from '../../src/lib/DynamoDB';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { initTables, dropTables, TABLE_NAMES } from '../helpers/DynamoDB';

const mockImageUrls = ['http://example.com'];

beforeEach(async () => {
  await initTables();
  const currentEnv = process.env;
  process.env = {
    ...currentEnv,
    IMAGES_DYNAMODB_TABLE: TABLE_NAMES.images
  };
});

afterAll(async () => {
  await dropTables();
});

const mockSearchPixaby = () => {
  const mockSearch = jest.fn();
  mockSearch.mockReturnValue(mockImageUrls);
  SearchPixabay.searchPixabay = mockSearch.bind(SearchPixabay);
};

test('search', async () => {
  mockSearchPixaby();
  const searchQuery = 'hello';
  await SearchPixabay.search(searchQuery, true);
  const client = DynamoDB.client(true);
  const imageParams: DocumentClient.ScanInput = {
    TableName: TABLE_NAMES.images
  };
  const images = await client.scan(imageParams).promise();
  const items = images.Items;
  expect(items.length).toBe(1);
  expect(items[0].query).toBe(searchQuery);
  expect(items[0].urls.length).toBe(mockImageUrls.length);
  expect(items[0].urls[0]).toBe(mockImageUrls[0]);
});
