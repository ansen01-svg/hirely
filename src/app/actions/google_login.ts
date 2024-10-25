"use server";

import { signIn } from "../lib/auth";

export const googleLoginAction = async () => {
  await signIn("google");
};
