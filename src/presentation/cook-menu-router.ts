/**
 * 献立アプリのアクセスパスを管理している。
 *
 */

import { Request, Response, Router, NextFunction } from 'express';
import { CookMenuService } from '../application/cook-menu-service';
import { CookMenuDatasource } from '../infrastructure/datasource/cook-menu-datasource';
import { SequencesDatasource } from '../infrastructure/datasource/sequences-datasource';

const cookMenuRouter = Router();
let cookMenuDatasource: CookMenuDatasource;
let sequencesDatasource: SequencesDatasource;
let cookMenuService: CookMenuService;

cookMenuRouter.use((_: Request, res: Response, next: NextFunction) => {
    cookMenuDatasource = new CookMenuDatasource();
    sequencesDatasource = new SequencesDatasource();
    cookMenuService = new CookMenuService(cookMenuDatasource, sequencesDatasource);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

cookMenuRouter.get('/', async (_: Request, res: Response) => {
    try {
        const cookMenuLists = await cookMenuService.list();
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.status(200).send(cookMenuLists);
    } catch (err) {
        console.log(err);
        res.status(500).send('献立メニュー一覧取得処理に失敗しました');
    }
});

cookMenuRouter.post('/', async (req: Request, res: Response) => {
    try {
        await cookMenuService.register(req);
        res.status(200).send('sucsess');
    } catch (err) {
        console.log(err);
        res.status(500).send('献立メニューの登録に失敗しました');
    }
});

cookMenuRouter.get('/:id', async (req: Request, res: Response) => {
    const paramId = req.params.id;
    if (!paramId) throw new Error('パスパラメーターが設定されていません');
    try {
        const cookMenu = await cookMenuService.detail(parseInt(paramId));
        res.status(200).send(cookMenu);
    } catch (err) {
        console.log(err);
        res.status(500).send('献立メニュー取得処理に失敗しました');
    }
});

cookMenuRouter.put('/:id', async (req: Request, res: Response) => {
    const paramId = req.params.id;
    if (!paramId) throw new Error('パスパラメーターが設定されていません');
    try {
        await cookMenuService.update(parseInt(paramId), req);
        res.status(200).send('success');
    } catch (err) {
        console.log(err);
        res.status(500).send('献立メニュー取得処理に失敗しました');
    }
});

cookMenuRouter.delete('/:id', async (req: Request, res: Response) => {
    const paramId = req.params.id;
    if (!paramId) throw new Error('パスパラメーターが設定されていません');
    try {
        await cookMenuService.delete(parseInt(paramId));
        res.status(200).send('success');
    } catch (err) {
        console.log(err);
        res.status(500).send('献立メニュー取得処理に失敗しました');
    }
});

// リファクタリング
// テストコードの実装を行う

export { cookMenuRouter };
