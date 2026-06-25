import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: String,
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

export default User;
