import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/product-route';
import userRoutes from './routes/user-route';
import orderRoutes from './routes/order-route';
import config from './config';

const app: express.Application = express();
const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/', productRoutes);
app.use('/', userRoutes);
app.use('/', orderRoutes);

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

const port = config.port || 8000;

app.listen(port, function () {
  console.log(`starting app on http://localhost:${port}`);
});
