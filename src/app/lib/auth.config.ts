import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { ZodError } from "zod";
import { signInSchema } from "./zod";

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
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/custom_auth/signin_with_credentials`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
          }

          const { data } = await response.json();

          return {
            id: data.id,
            email: data.email,
            name: data.username,
            image: data.image || "",
            expertise: data.expertise || "",
          };
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error);
            throw error;
          } else {
            console.error("Authorization error:", error);
            throw error;
          }
        }
      },
    }),
  ],
};
