"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var product_api_1 = __importDefault(require("./handlers/product-api"));
var user_api_1 = __importDefault(require("./handlers/user-api"));
var order_api_1 = __importDefault(require("./handlers/order-api"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
app.use(body_parser_1["default"].json());
app.use('/', product_api_1["default"]);
app.use('/', user_api_1["default"]);
app.use('/', order_api_1["default"]);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
