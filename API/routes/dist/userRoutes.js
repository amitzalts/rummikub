"use strict";
exports.__esModule = true;
exports.userRouter = void 0;
var express_1 = require("express");
var userRouter = express_1["default"].Router();
exports.userRouter = userRouter;
var userController_1 = require("../controller/userController");
userRouter.route("/").get(userController_1.getAllUsers).post(userController_1.createUser);