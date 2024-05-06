/**
 * 献立メニューについてのユースケース（プロジェクトの作成、参照、更新、削除）を
 * 記載しています。
 */

import { Request } from 'express';
import { RequestCookMenu } from '../domain/model/request-cookmenu';
import { UpdateRequestCookMenu } from '../domain/model/update-request-cookmenu';
import { CookMenuRepository } from '../domain/repository/cook-menu-repository';
import { SequencesRepository } from '../domain/repository/sequences-repository';

export class CookMenuService {
    readonly IndexCountUpNum = 1;

    private cookMenuDatasource: CookMenuRepository;

    private sequencesDatasource: SequencesRepository;

    constructor(cookMenuDatasource: CookMenuRepository, sequencesDatasource: SequencesRepository) {
        console.log('CookMenuService');
        this.cookMenuDatasource = cookMenuDatasource;
        this.sequencesDatasource = sequencesDatasource;
    }

    async list() {
        const items = await this.cookMenuDatasource.list();
        if (!items) throw new Error('献立メニュー一覧を取得できませんでした');
        return items
            .filter((item) => !item.deleteFlg)
            .map((item) => {
                return { id: item.id, name: item.name };
            });
    }

    async register(request: Request) {
        const cookMenu = new RequestCookMenu(request);
        const item = await this.sequencesDatasource.detail();
        if (!item) throw new Error('テーブルインデックス番号が取得できませんでした');

        const setIndexNum = item.tableCount + this.IndexCountUpNum;
        await this.cookMenuDatasource.insert(setIndexNum, cookMenu);
        await this.sequencesDatasource.update(setIndexNum);
    }

    async detail(id: number) {
        const res = await this.cookMenuDatasource.detail(id);
        if (!res) throw new Error('指定されたIDの献立メニューはございませんでした');
        return res;
    }

    async update(id: number, request: Request) {
        const cookMenu = new UpdateRequestCookMenu(id, request);
        await this.cookMenuDatasource.update(cookMenu);
    }

    async delete(id: number) {
        await this.cookMenuDatasource.delete(id);
    }
}
