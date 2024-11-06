"use server";

import { signOut } from "@/app/lib/auth";

export const googleLogoutAction = async () => {
  await signOut();
};
