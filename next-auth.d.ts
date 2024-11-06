// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      expertise: string | "";
      emailVerified: null | boolean;
      updatedAt: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image: string;
    expertise: string | "";
  }
}
