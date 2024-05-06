import * as dotenv from 'dotenv';
import express from 'express';
import { Request, Response } from 'express';
import { cookMenuRouter } from './presentation/cook-menu-router';

// 環境変数の設定
dotenv.config();

const app = express();
const port = 3000;

// JSONデータを扱う為に必要な設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cook-menu', cookMenuRouter);

app.get('*', (req: Request, res: Response) => {
    res.status(404).send('存在しないURLです');
});
app.post('*', (req: Request, res: Response) => {
    res.status(404).send('存在しないURLです');
});
app.put('*', (req: Request, res: Response) => {
    res.status(404).send('存在しないURLです');
});
app.delete('*', (req: Request, res: Response) => {
    res.status(404).send('存在しないURLです');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
