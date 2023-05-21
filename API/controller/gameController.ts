import { NextFunction, Response, Request } from "express";
import Game, { GameInterface } from "../model/gameModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const getAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const games = await Game.find({});
    res.status(200).json({ games });
  } catch (error) {
    console.error(error);
  }
};

export const createGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.cookies;
    const { players, board, deck } = req.body;

    const game = await Game.create({ user, players, board, deck });

    res.send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: "error.message" });
  }
};
