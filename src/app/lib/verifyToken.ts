import jwt from "jsonwebtoken";

const secret = process.env.AUTH_SECRET;

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret as jwt.Secret);
};
