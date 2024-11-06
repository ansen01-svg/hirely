"use server";

import { signIn } from "@/app/lib/auth";

export const googleLoginAction = async () => {
  await signIn("google");
};
