"use server";

import { signIn } from "@/app/lib/auth";

type UserLoginType = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: UserLoginType) => {
  const res = await signIn("credentials", {
    email: email,
    password: password,
    redirect: false,
  });

  return res;
};
