"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_api_1 = __importDefault(require("./apis/product-api"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.use('/', product_api_1.default);
// app.get('/', function (req: Request, res: Response) {
//   res.send('Hello World!');
// });
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
