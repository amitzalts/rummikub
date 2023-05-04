"use strict";
exports.__esModule = true;
exports.config = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var MONGO_USERNAME = process.env.MONGO_USERNAME || "";
var MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
var MONGO_URL = "mongodb+srv://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@cluster0.46hauyo.mongodb.net/test";
var SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 1337;
exports.config = {
    mongo: { url: MONGO_URL },
    server: { port: SERVER_PORT }
};
