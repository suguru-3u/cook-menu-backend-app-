import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export class DynamoDBClientFactory {
    client: DynamoDBClient;

    constructor() {
        const { REGION, ACCESSKEYID, SECRETACCESSKEY } = process.env;
        if (!REGION && !ACCESSKEYID && !SECRETACCESSKEY) throw new Error('AWS設定の環境変数が設定されていません');
        this.client = new DynamoDBClient({
            region: REGION!,
            credentials: {
                accessKeyId: ACCESSKEYID!,
                secretAccessKey: SECRETACCESSKEY!,
            },
            endpoint: 'http://localhost:8000',
        });
    }
}
