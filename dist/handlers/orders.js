"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var order_1 = require("../models/order");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var checkNull_1 = __importDefault(require("../utilities/checkNull"));
var checkNaN_1 = __importDefault(require("../utilities/checkNaN"));
var shopping = new order_1.Shopping();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, shopping.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, authorizationHeader, token, orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied, invalid token');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                (0, checkNull_1["default"])([username]);
                return [4 /*yield*/, shopping.show(username)];
            case 2:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, authorizationHeader, token, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    username: req.body.username
                };
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied, invalid token');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                (0, checkNull_1["default"])([order.username]);
                return [4 /*yield*/, shopping.create(order)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, quantity, authorizationHeader, token, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = parseInt(req.params.id);
                productId = parseInt(req.body.product_id);
                quantity = parseInt(req.body.quantity);
                try {
                    authorizationHeader = req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied, invalid token');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                (0, checkNull_1["default"])([orderId, productId, quantity]);
                (0, checkNaN_1["default"])([orderId, productId, quantity]);
                return [4 /*yield*/, shopping.addProduct(orderId, productId, quantity)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        //@ts-ignore
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Invalid Token");
    }
};
var order_routes = function (app) {
    //console.log("try to connect");
    app.get('/orders', index);
    app.get('/orders/:username', verifyAuthToken, show);
    app.post('/orders', create);
    app.post('/orders/:id/products', addProduct);
};
exports["default"] = order_routes;
