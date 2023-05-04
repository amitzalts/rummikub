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
exports.__esModule = true;
exports.updateUser = exports.deleteUser = exports.passwordRecovery = exports.login = exports.getUser = exports.createUser = exports.getAllUsers = void 0;
var userModel_1 = require("../model/userModel");
var jwt_simple_1 = require("jwt-simple");
var secret = process.env.JWT_SECRET;
exports.getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1["default"].find({})];
            case 1:
                users = _a.sent();
                res.status(200).json({ users: users });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, gender, userName, password, email, findUser, user, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, gender = _a.gender, userName = _a.userName, password = _a.password, email = _a.email;
                return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
            case 1:
                findUser = _b.sent();
                if (findUser)
                    return [2 /*return*/, res.send("Email exists in the system")];
                return [4 /*yield*/, userModel_1["default"].create({
                        firstName: firstName.toLowerCase(),
                        lastName: lastName.toLowerCase(),
                        gender: gender.toLowerCase(),
                        userName: userName,
                        password: password,
                        email: email.toLowerCase()
                    })];
            case 2:
                user = _b.sent();
                // if (!secret) throw new Error("Missing jwt secret");
                // const token = jwt.encode({ userId: user._id, role: "public" }, secret);
                // res.cookie("user", token, {
                //   maxAge: 24 * 60 * 60 * 1000, //24 hours
                //   httpOnly: true,
                // });
                // res.redirect("/main");
                res.json({ user: user });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).send({ error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body;
                return [4 /*yield*/, userModel_1["default"].findById(userId)];
            case 1:
                user = _a.sent();
                res.json({ user: user });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).send({ error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, password, findUser, token, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, userName = _a.userName, password = _a.password;
                return [4 /*yield*/, userModel_1["default"].findOne({ userName: userName, password: password })];
            case 1:
                findUser = _b.sent();
                if (!findUser)
                    throw new Error("User not found on get user function");
                if (!secret)
                    throw new Error("Missing jwt secret");
                token = jwt_simple_1["default"].encode({ userId: findUser._id, role: "public" }, secret);
                res.cookie("user", token, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true
                });
                res.redirect("/main");
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error(error_4);
                res.status(500).send({ error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.passwordRecovery = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, userName, email, user, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, userName = _a.userName, email = _a.email;
                return [4 /*yield*/, userModel_1["default"].findOne({
                        firstName: firstName,
                        lastName: lastName,
                        userName: userName,
                        email: email
                    })];
            case 1:
                user = _b.sent();
                if (!user)
                    throw new Error("User not found, check entered data");
                res.status(200).send({ user: user });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                console.error(error_5);
                res.status(500).send({ error: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, users, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                return [4 /*yield*/, userModel_1["default"].deleteOne({ _id: userId })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, userModel_1["default"].find({})];
            case 2:
                users = _a.sent();
                res.status(200).send({ users: users });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ error: error_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, users, user, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                data = req.body;
                return [4 /*yield*/, userModel_1["default"].find({})];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, userModel_1["default"].findById({ _id: userId })];
            case 2:
                user = _a.sent();
                res.status(201).json({ users: users });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error(error_7);
                res.status(500).send({ error: error_7.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
