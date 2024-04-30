const express = require('express');
const app = express();
const port = 3000
import { Request, Response } from 'express';

app.get('/', (req:Request, res:Response) => {
  res.send('hello!!');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))