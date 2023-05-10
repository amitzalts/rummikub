import mongoose, { Schema } from "mongoose";
import { TileInterface, TileSchema } from "./tileModel";

//a player is relevant only during a game

export interface PlayerInterface {
  name: string;
  hand: TileInterface[];
  active: boolean;
  points?: number;
  _id: string;
}

export const PlayerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hand: {
      type: [TileSchema],
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    points: {
      type: String,
      required: false,
    },
    // notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<PlayerInterface>("Player", PlayerSchema);