import express, { NextFunction, Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { config } from "../config/config";
import { userRouter } from "../routes/userRoutes";

StartServer();

async function StartServer() {
  await mongoose
    .connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("Connected to DB...");
    })
    .catch((err) => {
      console.error(err);
    });
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  //routes
  app.use("/api/v1/users", userRouter);

  app.listen(config.server.port, () => {
    console.log(`Server is listening on port ${config.server.port}...`);
  });
}
