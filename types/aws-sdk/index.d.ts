import { SQS } from 'aws-sdk';

declare module 'aws-sdk' {
  interface SQSExtended extends SQS {
    setEndpoint: (endPoint: string) => void;
  }
}
