import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import User from "@/app/models/user.model";
import { authConfig } from "./auth.config";

interface UserToken {
  id: string;
  email: string;
  name: string;
  image?: string;
}

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
            image: user.image,
          });
        }

        // Set the user data to token
        token.user = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.username,
          image: existingUser.image || user.image,
        } as UserToken;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        const user = token.user as UserToken;

        session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          emailVerified: null, // Add emailVerified as null
        };
      }

      return session;
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`, // Make sure to add conditional logic so that the name of the cookie does not include `__Secure-` on localhost
  //     options: {
  //       // All of these options must be specified, even if you're not changing them
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: true,
  //       domain: `localhost:3000`, // Ideally, you should use an environment variable for this
  //     },
  //   },
  // },
});
