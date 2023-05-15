import express from "express";
const userRouter = express.Router();

import {
  getAllUsers,
  createUser,
  getUser,
  userLogin,
  userLogout,
  deleteUser,
  updateUser,
  getAllSimpleUsers,
} from "../controller/userController";

userRouter.route("/").get(getAllUsers).post(createUser)

userRouter.route("/getAllSimpleUsers").get(getAllSimpleUsers);

userRouter.route("/getAllUsers").get(getAllUsers);

userRouter.route("/getUser").get(getUser);

userRouter.route("/deleteUser").delete(deleteUser);

userRouter.route("/updateUser").patch(updateUser);

userRouter.route("/userLogin").post(userLogin);

userRouter.route("/userLogout").get(userLogout);

// userRouter.route("/userPassword").post(passwordRecovery);

export { userRouter };
