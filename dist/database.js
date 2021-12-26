"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var client;
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DB_Test = _a.POSTGRES_DB_Test, POSTGRES_PORT = _a.POSTGRES_PORT, ENV = _a.ENV;
console.log("hello");
//console.log(ENV);
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_Test,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: POSTGRES_PORT
    });
    //console.log("Test");
}
else if (ENV === 'dev') {
    //console.log("Dev");
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: POSTGRES_PORT
    });
}
else {
    console.log("Nothing");
}
//@ts-ignore
exports["default"] = client;
