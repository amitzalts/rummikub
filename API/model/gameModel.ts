import mongoose, { Schema } from "mongoose";
import { TileInterface, TileSchema } from "./tileModel";
import { PlayerInterface, PlayerSchema } from "./playerModel";

//a game is relevant only during a game

export interface GameInterface {
  players: PlayerInterface[];
  board: TileInterface[];
  deck: TileInterface[];
  _id: string;
}

export const GameSchema: Schema = new Schema(
  {
    players: {
      players: [PlayerSchema],
      required: true,
    },
    board: {
      type: [TileSchema],
      required: true,
    },
    deck: {
      type: [TileSchema],
      required: true,
    },
    // notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<GameInterface>("Game", GameSchema);
