import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/product-api';
import userRoutes from './handlers/user-api';
import orderRoutes from './handlers/order-api';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.use('/', productRoutes);
app.use('/', userRoutes);
app.use('/', orderRoutes);

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on http//localhost:${address}`);
});
