import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/user.model";
import { connectDB } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/verifyToken";
import { JwtPayload } from "jsonwebtoken";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "No token provided", success: false },
        { status: 401 }
      );
    }

    let userId;

    if (token.includes("userId")) {
      userId = token.split("=")[1];
    } else {
      const userData = verifyToken(token) as JwtPayload;
      userId = userData?.id;
    }

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Current user", success: true, data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
