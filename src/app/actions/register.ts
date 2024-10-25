"use server";

import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user.model";
import { UserType } from "@/app/types";

export const register = async (values: UserType) => {
  const { email, password, username } = values;

  try {
    await connectDB();

    const userFound = await User.findOne({ email });

    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    console.log(savedUser);
  } catch (error) {
    console.error(error);
  }
};
