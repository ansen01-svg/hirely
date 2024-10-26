import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { signInSchema } from "./zod";
import { connectDB } from "./db";
import User from "@/app/models/user.model";

export const authConfig: NextAuthConfig = {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          await connectDB();

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await User.findOne({
            email: email,
          }).select("+password");

          if (!user) throw new Error("Incorrect Email");

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) throw new Error("Incorrect Password");

          return {
            email: user.email,
            name: user.username,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }

          return null;
        }
      },
    }),
  ],
};
