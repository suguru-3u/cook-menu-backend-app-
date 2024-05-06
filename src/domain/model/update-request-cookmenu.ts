/**
 * 管理画面からリクエストされた献立メニューを受け取るクラス
 */
import { Request } from 'express';
import { RequestCookMenu } from '../model/request-cookmenu';

export class UpdateRequestCookMenu extends RequestCookMenu {
    id: number;

    constructor(id: number, request: Request) {
        const requestBody = request.body || '';
        if (!requestBody) throw new Error('リクエストの値がありませんでした');
        super(request);
        this.id = id;
    }
}
