import express, { NextFunction, Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { config } from "../config/config";
import { userRouter } from "../routes/userRoutes";
import { boardRouter } from "../routes/boardRoutes";
import { deckRouter } from "../routes/deckRouter";

import { playerRouter } from "../routes/playerRoutes";

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
  app.use("/api/v1/players", playerRouter);
  app.use("/api/v1/boards", boardRouter);
  app.use("/api/v1/decks", deckRouter);

  app.get("/signIn", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "../../public", "login.html"));
  });

  app.get("/signUp", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "../../public", "register.html"));
  });

  app.get("/profile", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "../../public", "profile.html"));
  });

  app.get("/game", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "../../public", "game.html"));
  });

  app.listen(config.server.port, () => {
    console.log(`Server is listening on port ${config.server.port}...`);
  });
}
