import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  username: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
      min: [5, "Password must be more than 5 characters"],
      max: [32, "Password must be less than 32 characters"],
    },
    username: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
