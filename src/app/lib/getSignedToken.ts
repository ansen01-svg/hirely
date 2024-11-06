import { auth } from "@/app/lib/auth";
import { signToken } from "./signToken";

interface UserTokenPayload {
  id: string;
  email: string;
  name: string;
}

export const getSignedToken = async (): Promise<string> => {
  const session = await auth();

  if (session?.user) {
    const { id, email, name } = session.user as UserTokenPayload;

    if (!id || !email || !name) {
      throw new Error("User data is incomplete.");
    }

    // Sign and return token
    const token = signToken({ id, email, name });
    return token;
  } else {
    throw new Error("Session or user data is not available.");
  }
};
