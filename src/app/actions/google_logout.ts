"use server";

import { signOut } from "../lib/auth";

export const googleLogoutAction = async () => {
  await signOut();
};
