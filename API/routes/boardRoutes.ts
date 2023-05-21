import express from "express";
const boardRouter = express.Router();

import { createBoard, deleteAllBoards } from "../controller/boardController";

boardRouter.route("/").post(createBoard);
boardRouter.route("/deleteBoards").delete(deleteAllBoards);

export { boardRouter };
