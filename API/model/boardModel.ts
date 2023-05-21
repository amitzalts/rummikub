import mongoose, { Schema } from "mongoose";

export interface BoardInterface {
  _id: string;
}

export interface TileInterface {
  color: string;
  value: number;
  _id: string;
}

export const BoardSchema: Schema = new Schema(
  {
    tileArr: {
      type: [{}],
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<BoardInterface>("Board", BoardSchema);
