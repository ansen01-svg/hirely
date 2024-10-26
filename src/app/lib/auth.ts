import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import User from "@/app/models/user.model";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/login", // Redirect to your login page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      await connectDB();

      if (user) {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // If the user doesn't exist, create a new user with a random password
          const randomPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          existingUser = await User.create({
            email: user.email,
            username: user.name,
            password: hashedPassword,
          });
        }

        // Set the user data to token
        token.user = {
          email: existingUser.email,
          name: existingUser.username,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.email = token.email as string;
        session.user.name = token.name;
      }

      return session;
    },
  },
});
