import express from "express";
const userRouter = express.Router();

import {
  getAllUsers,
  createUser,
  getUser,
  login,
  deleteUser,
  updateUser,
} from "../controller/userController";

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/getUser").get(getUser);

userRouter.route("/deleteUser").delete(deleteUser);

userRouter.route("/updateUser").patch(updateUser);

userRouter.route("/login").post(login);

// userRouter.route("/userPassword").post(passwordRecovery);

export { userRouter };
