"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = __importDefault(require("./handlers/products"));
var corsOptions = {
    "origin": 'http://someotherdomain.com',
    "optionsSuccessStatus": 200
};
var app = (0, express_1["default"])();
var port = 8000;
app.use(body_parser_1["default"].json());
app.listen(cors_1["default"]); //This worked but cors(corsOptions) didnt work?
app.get('/hi', function (req, res) {
    res.send('Hello World!');
});
(0, products_1["default"])(app);
app.get('/test-cors', (0, cors_1["default"])(corsOptions), function (req, res) {
    res.json({ msg: "This is CORS enabled" });
});
app.listen(port, function () {
    console.log("starting app on: ".concat(port));
});
