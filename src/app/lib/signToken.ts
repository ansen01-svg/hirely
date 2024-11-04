import jwt from "jsonwebtoken";

export type TokenType = {
  id: string;
  email: string;
  name: string;
};

const secret = process.env.AUTH_SECRET;

export const signToken = ({ id, email, name }: TokenType) => {
  const token = jwt.sign({ id, email, name }, secret as jwt.Secret);
  return token;
};
