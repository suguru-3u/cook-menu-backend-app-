/**
 * 献立メニューのDB関連を記述しています
 */

import { UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

import { DynamoDBClientFactory } from '../config/dynamodb-client-factory';
import { SequencesRepository } from '../../domain/repository/sequences-repository';
import { dynamoIndexManageTable } from '../../model/cook-menu';

export class SequencesDatasource implements SequencesRepository {
    private dynamoDBClient: DynamoDBClientFactory;

    readonly indexManageTbaleName = 'Sequences';

    readonly cookMenuTableName = 'CookMenus';

    constructor() {
        console.log('SequencesDatasource');
        this.dynamoDBClient = new DynamoDBClientFactory();
    }

    async detail(): Promise<dynamoIndexManageTable> {
        try {
            console.log('テーブルインデックス番号取得処理を開始');
            const readParams = new GetCommand({
                TableName: this.indexManageTbaleName,
                Key: { name: this.cookMenuTableName },
            });
            const res = await this.dynamoDBClient.client.send(readParams);
            const dynamodbData = res.Item as unknown as dynamoIndexManageTable;
            return dynamodbData;
        } catch (err) {
            console.error(err);
            throw new Error('テーブルインデックス数の取得処理に失敗しました');
        }
    }

    async update(indexCount: number) {
        try {
            console.log('テーブルインデックス番号更新処理を開始');
            const updateParams = new UpdateCommand({
                TableName: this.indexManageTbaleName,
                Key: { name: this.cookMenuTableName },
                UpdateExpression: 'set tableCount = :setId',
                ExpressionAttributeValues: {
                    ':setId': indexCount,
                },
            });
            await this.dynamoDBClient.client.send(updateParams);
        } catch (err) {
            console.error(err);
            throw new Error('テーブルインデックス数の更新処理に失敗しました');
        }
    }
}
