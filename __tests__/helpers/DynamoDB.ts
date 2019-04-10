import { DynamoDB } from 'aws-sdk';

export const TABLE_NAMES = {
  images: 'test-images-spike-ts-serverless-framework'
};
const REGION = 'localhost';
const ENDPOINT = 'http://localhost:8000';

async function initImagesTable(client: DynamoDB): Promise<any> {
  await client
    .createTable({
      AttributeDefinitions: [
        {
          AttributeName: 'query',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'query',
          KeyType: 'HASH'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      TableName: TABLE_NAMES.images
    })
    .promise();
}

async function dropImageTable(client: DynamoDB): Promise<any> {
  await client.deleteTable({ TableName: TABLE_NAMES.images }).promise();
}

export async function initTables(): Promise<any> {
  const client = new DynamoDB({
    region: REGION,
    endpoint: ENDPOINT
  });
  await initImagesTable(client);
}

export async function dropTables(): Promise<any> {
  const client = new DynamoDB({
    region: REGION,
    endpoint: ENDPOINT
  });
  await dropImageTable(client);
}
