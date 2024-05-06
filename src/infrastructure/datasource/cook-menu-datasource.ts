/**
 * 献立メニューのDB関連を記述しています
 */

import { PutCommand, UpdateCommand, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

import { DynamoDBClientFactory } from '../config/dynamodb-client-factory';
import { RequestCookMenu } from '../../domain/model/request-cookmenu';
import { UpdateRequestCookMenu } from '../../domain/model/update-request-cookmenu';
import { CookMenuRepository } from '../../domain/repository/cook-menu-repository';
import { cookMenuList } from '../../model/cook-menu';

export class CookMenuDatasource implements CookMenuRepository {
    private dynamoDBClient: DynamoDBClientFactory;

    readonly indexManageTbaleName = 'Sequences';

    readonly cookMenuTableName = 'CookMenus';

    constructor() {
        console.log('CookMenuDatasource');
        this.dynamoDBClient = new DynamoDBClientFactory();
    }

    async list(): Promise<cookMenuList[]> {
        try {
            console.log('献立メニュー一覧取得処理を開始');
            const scanCommand = new ScanCommand({
                TableName: this.cookMenuTableName,
            });
            const res = await this.dynamoDBClient.client.send(scanCommand);
            const dynamodbData = res.Items as unknown as cookMenuList[];
            return dynamodbData;
        } catch (err) {
            console.error(err);
            throw new Error('献立メニュー一覧取得処理に失敗しました');
        }
    }

    async insert(indexNum: number, requestCookMenu: RequestCookMenu) {
        try {
            console.log('献立メニュー登録処理を開始');
            const registerParams = new PutCommand({
                TableName: this.cookMenuTableName,
                Item: {
                    id: indexNum,
                    name: requestCookMenu.name,
                    genre: requestCookMenu.genre,
                    weight: requestCookMenu.weight,
                    ingredients: requestCookMenu.ingredients,
                    seasonings: requestCookMenu.seasonings,
                    url: requestCookMenu.url,
                    memo: requestCookMenu.memo,
                    deleteFlg: false,
                },
            });
            await this.dynamoDBClient.client.send(registerParams);
        } catch (err) {
            console.error(err);
            throw new Error('献立メニューの登録処理に失敗しました。');
        }
    }

    async detail(cookMenuId: number) {
        try {
            console.log('編集用献立メニューを取得します');
            const readParams = new GetCommand({
                TableName: this.cookMenuTableName,
                Key: { id: cookMenuId },
            });
            const res = await this.dynamoDBClient.client.send(readParams);
            const dynamodbData = res.Item as unknown as cookMenuList;
            return dynamodbData;
        } catch (err) {
            console.error(err);
            throw new Error('献立メニュー取得処理に失敗しました');
        }
    }

    async update(requestCookMenu: UpdateRequestCookMenu) {
        try {
            console.log('献立メニューを更新処理を開始します');
            const registerParams = new PutCommand({
                TableName: this.cookMenuTableName,
                Item: {
                    id: requestCookMenu.id,
                    name: requestCookMenu.name,
                    genre: requestCookMenu.genre,
                    weight: requestCookMenu.weight,
                    ingredients: requestCookMenu.ingredients,
                    seasonings: requestCookMenu.seasonings,
                    url: requestCookMenu.url,
                    memo: requestCookMenu.memo,
                },
            });
            await this.dynamoDBClient.client.send(registerParams);
        } catch (err) {
            console.error(err);
            throw new Error('献立メニュー更新処理に失敗しました');
        }
    }

    async delete(cookMenuId: number) {
        try {
            console.log('献立メニューの論理削除処理を開始します');
            const updateParams = new UpdateCommand({
                TableName: this.cookMenuTableName,
                Key: { id: cookMenuId },
                UpdateExpression: 'set deleteFlg = :flg',
                ExpressionAttributeValues: {
                    ':flg': true,
                },
            });
            await this.dynamoDBClient.client.send(updateParams);
        } catch (err) {
            console.error(err);
            throw new Error('献立メニュー論理削除処理に失敗しました');
        }
    }
}
