import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from "./handlers/product-api";
import userRoutes from "./handlers/user-api";
import orderRoutes from "./handlers/order-api";
import config from "./config";

const app: express.Application = express();
const address: string = "3000";
const port = config.port || 8000;
const corsOptions = {
  origin: "http://someotherdomain.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", orderRoutes);

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`starting app on http://localhost:${port}`);
});
