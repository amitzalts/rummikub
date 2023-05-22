import { NextFunction, Response, Request } from "express";
import Game, { GameInterface } from "../model/gameModel";
import User from "../model/userModel";
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
    const { userId, players, board, deck } = req.body;
    console.log(req.body);

    const user = await User.findById(userId);
    if (!user) return "User not found";

    const game = await Game.create({ user, players, board, deck });

    res.send({ ok: true, game });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: "error.message" });
  }
};

export const deleteAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedGames = await Game.deleteMany({});

    res.status(200).send({ deletedGames });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gameId, hand } = req.body;

    await Game.findByIdAndUpdate(gameId, { hand });

    const findGame = await Game.findById(gameId);

    res.status(200).send({ findGame });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
