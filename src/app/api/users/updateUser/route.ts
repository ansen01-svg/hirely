import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user.model";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    const requestBody = await request.json();
    const { expertise } = requestBody;

    if (!token) {
      return NextResponse.json(
        { error: "No token provided", success: false },
        { status: 401 }
      );
    }

    const userId = token.split("=")[1];
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    user.expertise = expertise;
    await user.save();

    return NextResponse.json(
      {
        message: `User with id ${userId} has been successfully updated.`,
        data: user,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
