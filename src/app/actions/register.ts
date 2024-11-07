"use server";

import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user.model";
import { UserType } from "@/app/types";

export const register = async (values: UserType) => {
  const { email, password, username } = values;

  try {
    await connectDB();

    if (password.length < 5) {
      return {
        success: false,
        error: "Password must be more than 4 characters",
      };
    }

    if (password.length > 32) {
      return {
        success: false,
        error: "Password must be less than 32 characters",
      };
    }

    const userFound = await User.findOne({ email });

    if (userFound) {
      return {
        success: false,
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return {
      success: true,
      message: "User registered successfully!",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Network error, please try again later.",
    };
  }
};
