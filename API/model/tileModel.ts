import mongoose, { Schema } from "mongoose";

export interface TileInterface {
  isJoker: boolean;
  tileValue: number;
  color: string;
  _id: string;
}

export const TileSchema: Schema = new Schema(
  {
    isJoker: {
      type: Boolean,
      required: true,
    },
    tileValue: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    // notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<TileInterface>("Tile", TileSchema);
