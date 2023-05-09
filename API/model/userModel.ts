import mongoose, { Schema } from "mongoose";

export enum UserRoleEnum {
  ADMIN = "admin",
  SIMPLE = "simple",
}

export interface UserInterface {
  firstName: string;
  lastName: string;
  gender: string;
  userName: string;
  password: string;
  email: string;
  role: string;
  _id: string;
}



export const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: UserRoleEnum,
      default: UserRoleEnum.SIMPLE,
    },
    // notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<UserInterface>("User", UserSchema);






