import { auth } from "@/app/lib/auth";
import { signToken } from "./signToken";

export const getSignedToken = async () => {
  const session = await auth();
  let token;

  // Check if session and user exist
  if (session && session.user) {
    const { id, email, name } = session.user;

    token = signToken({
      id: id as string,
      email: email as string,
      name: name || "Unknown",
    });

    return token;
  } else {
    throw new Error("Session or user data is not available.");
  }
};
