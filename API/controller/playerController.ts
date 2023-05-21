import { NextFunction, Response, Request } from "express";
import Player, { PlayerInterface } from "../model/playerModel";
import jwt from "jwt-simple";
import Game, { GameSchema } from "../model/gameModel";
const secret = process.env.JWT_SECRET;

export const getAllPlayers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const players = await Player.find({});
    res.status(200).json({ players });
  } catch (error) {
    console.error(error);
  }
};

export const createPlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, hand } = req.body;

    const player = await Player.create({ name, hand });

    res.status(200).json({ player });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getAllPlayersInGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gamdId } = req.cookies;

    if (!secret) throw new Error("No secret");

    if (!gamdId) throw new Error("No player found");

    const decodedGamdId = jwt.decode(gamdId, secret);

    const game = await Game.findById(decodedGamdId).populate("players");

    if (!game) return;
    const players = [game.players];

    res.send({ players });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: "error.message" });
  }
};


export const deleteAllPlayers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const deletedPlayers = await Player.deleteMany({})

    res.status(200).send({ deletedPlayers });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { playerId, firstName, lastName, gender, playerName, email } =
      req.body;

    const takenEmailPlayer = await Player.findOne({ email });

    // if (takenEmailPlayer){
    //   if (takenEmailPlayer.email !== email) {
    //     res.status(500).json({ ok: false, errorMessage: `Email already exists in the system` })
    //   }else if(takenEmailPlayer.email === email){
    //     updatedPlayer(playerId, firstName, lastName, gender, playerName, email, res)
    //   }
    // } else {
    //   updatedPlayer(playerId, firstName, lastName, gender, playerName, email, res)
    // }
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

async function updatedPlayer(
  playerId: any,
  firstName: any,
  lastName: any,
  gender: any,
  playerName: any,
  email: any,
  res: Response
) {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      { _id: playerId },
      {
        firstName,
        lastName,
        gender,
        playerName,
        email,
      }
    );

    const player = await Player.findById(playerId);

    if (!secret) throw new Error("Missing jwt secret");
    const token = jwt.encode(
      {
        playerId: playerId,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        playerName: playerName,
        email: email,
        playerRole: "simple",
        role: "public",
      },
      secret
    );

    res.cookie("player", token, {
      maxAge: 24 * 60 * 60 * 1000, //24 hours
      httpOnly: true,
    });

    res.status(201).json({ ok: true, player });
  } catch (error) {
    console.error(error);
  }
}

//////////////////////////

export const updatePlayerByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { playerId, firstName, lastName, gender, playerName, email } =
      req.body;

    const takenEmailPlayer = await Player.findOne({ email });

    // if (takenEmailPlayer){
    //   if (takenEmailPlayer.email !== email) {
    //     res.status(500).json({ ok: false, errorMessage: `Email already exists in the system` })
    //   }else if(takenEmailPlayer.email === email){
    //     updatedPlayerByAdmin(playerId, firstName, lastName, gender, playerName, email, res)
    //   }
    // } else {
    //   updatedPlayerByAdmin(playerId, firstName, lastName, gender, playerName, email, res)
    // }
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

async function updatedPlayerByAdmin(
  playerId: any,
  firstName: any,
  lastName: any,
  gender: any,
  playerName: any,
  email: any,
  res: Response
) {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      { _id: playerId },
      {
        firstName,
        lastName,
        gender,
        playerName,
        email,
      }
    );

    const player = await Player.findById(playerId);

    // const players = await Player.find({ playerRole: "simple" })

    res.status(201).json({ ok: true, player });
  } catch (error) {
    console.error(error);
  }
}
