/**
 * 管理画面からリクエストされた献立メニューを受け取るクラス
 */
import { Request } from 'express';
import { type cookMenuRequest, type reqFood } from '../../model/cook-menu';

export class RequestCookMenu {
    name: string;

    genre?: number;

    weight?: number;

    ingredients?: reqFood[];

    seasonings?: reqFood[];

    url?: string;

    memo?: string;

    constructor(request: Request) {
        const requestBody = request.body || '';
        if (!requestBody) throw new Error('リクエストの値がありませんでした');
        const body = requestBody as cookMenuRequest;
        this.verifyRequest(body);
        this.name = body.name;
        this.genre = body.genre;
        this.weight = body.weight;
        this.ingredients = body.ingredients;
        this.seasonings = body.seasonings;
        this.url = body.url;
        this.memo = body.memo;
    }

    private verifyRequest(request: cookMenuRequest) {
        if (this.checkUndefindAndNull(request.name)) throw new Error('名前が入力されていません');
        if (!this.checkGenreNum(request.genre)) throw new Error('正しいジャンルの値が入力されていません');
        if (!this.checkWeightNum(request.weight)) throw new Error('正しい料理の重さの値が入力されていません');
        if (!this.checkFood(request.ingredients)) throw new Error('正しい食材の値が入力されていません');
        if (!this.checkFood(request.seasonings)) throw new Error('正しいの調味料の値が入力されていません');
        if (!this.checkUrlCount(request.url)) throw new Error('URLが126文字を超えています。');
        if (!this.checkMemoCount(request.memo)) throw new Error('Memoが1000文字を超えています。');
    }

    private checkUndefindAndNull(requestItem: any) {
        return requestItem === undefined || requestItem === null;
    }

    private checkGenreNum(requestGenre?: number) {
        if (this.checkUndefindAndNull(requestGenre)) return true;
        return requestGenre === 0 || requestGenre === 1 || requestGenre === 2 || requestGenre === 3;
    }

    private checkWeightNum(requestGenre?: number) {
        if (this.checkUndefindAndNull(requestGenre)) return true;
        return requestGenre === 0 || requestGenre === 1 || requestGenre === 2 || requestGenre === 3;
    }

    private checkFood(requestFood?: reqFood[]) {
        if (this.checkUndefindAndNull(requestFood)) return true;
        const checkUndefindAndNull = requestFood!.every((element: any) => {
            const checkUndefindAndNullName = this.checkUndefindAndNull(element.name);
            const checkUndefindAndNullCount = this.checkUndefindAndNull(element.count);
            return !checkUndefindAndNullName && !checkUndefindAndNullCount;
        });
        return checkUndefindAndNull;
    }

    private checkUrlCount(requestUrl?: string) {
        if (this.checkUndefindAndNull(requestUrl)) return true;
        return requestUrl!.length <= 126;
    }
    private checkMemoCount(requestUrl?: string) {
        if (this.checkUndefindAndNull(requestUrl)) return true;
        return requestUrl!.length <= 1000;
    }
}
