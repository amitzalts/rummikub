import mongoose, { Schema } from "mongoose";
import { TileInterface, TileSchema } from "./tileModel";
import { PlayerInterface, PlayerSchema } from "./playerModel";
import { UserSchema } from "./userModel";

//a game is relevant only during a game

export interface GameInterface {
  players: PlayerInterface[];
  board: TileInterface[];
  deck: TileInterface[];
  _id: string;
}

export const GameSchema: Schema = new Schema(
  {
    user: {
      type: UserSchema,
      required: true,
    },
    players: {
      type: [{ type: Schema.Types.ObjectId, ref: "Player" }],
      required: true,
    },
    board: {
      type: [String],
      required: true,
    },
    deck: {
      type: [TileSchema],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<GameInterface>("Game", GameSchema);
