import { NextRequest } from "next/server";
import * as jose from "jose";

const verifyToken = async (request: NextRequest) => {
  console.log("request-", request);
  //   const token = request.cookies.get("token")?.value || "";
  //   const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  //   try {
  //     const { payload } = await jose.jwtVerify(token, secret);

  //     return payload.id;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
};

export default verifyToken;

// Assuming 'response' is the Response object from your fetch request
const cookie = response.headers.get("set-cookie");

// Parse cookie if necessary
if (cookie) {
  console.log("Cookie:", cookie);

  // Optional: If you want to extract the token from the cookie value
  const authCookie = cookie.split(";")[0].split("=")[1];
  console.log("Extracted Token:", decodeURIComponent(authCookie)); // Decode if it's URL encoded
} else {
  console.error("No set-cookie header found in the response");
}
