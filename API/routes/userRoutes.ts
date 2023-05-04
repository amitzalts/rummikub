import express from "express";
const userRouter = express.Router();

import { getAllUsers, createUser } from "../controller/userController";

userRouter.route("/").get(getAllUsers).post(createUser);

// userRouter.route("/login").post(login);

// userRouter.route("/userPassword").post(passwordRecovery);

export { userRouter };
