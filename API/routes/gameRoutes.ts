import express from "express";
const gameRouter = express.Router();

import {
  createGame,
  deleteAllGames,
  updateGame,
} from "../controller/gameController";

gameRouter.route("/").post(createGame);
gameRouter.route("/updateGame").patch(updateGame);
gameRouter.route("/deleteGames").delete(deleteAllGames);

export { gameRouter };
