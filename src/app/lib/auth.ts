import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { UserDataType } from "../types";

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
      if (user) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/custom_auth/signin_with_google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ googleUser: user }),
            }
          );

          if (!response.ok) {
            const data = await response.json();
            console.log(data);
            return token;
          }

          const { data } = await response.json();

          // Set the user data to token
          token.user = {
            id: data._id,
            email: data.email,
            name: data.username,
            image: data.image || user.image,
            expertise: data.expertise || "",
            emailVerified: data.isVerified,
          } as UserDataType;
        } catch (error) {
          console.error("Fetching user error:", error);
          return token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        const { id } = token.user as UserDataType;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/users/getUser?userId=${id}`
          );

          if (response.ok) {
            const { data } = await response.json();

            session.user = {
              id: data._id,
              email: data.email,
              name: data.username,
              image: data.image || null,
              expertise: data.expertise || null,
              emailVerified: data.isVerified,
              updatedAt: data.updatedAt,
            };
          } else {
            console.error("Fetch user response error:", await response.json());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      return session;
    },
  },
});
