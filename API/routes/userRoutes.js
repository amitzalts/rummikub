"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const userController_1 = require("../controller/userController");
userRouter.route("/").get(userController_1.getAllUsers).post(userController_1.createUser);
userRouter.route("/getUser").get(userController_1.getUser);
userRouter.route("/deleteUser").delete(userController_1.deleteUser);
userRouter.route("/updateUser").patch(userController_1.updateUser);
userRouter.route("/userLogin").post(userController_1.userLogin);
userRouter.route("/userLogout").get(userController_1.userLogout);
