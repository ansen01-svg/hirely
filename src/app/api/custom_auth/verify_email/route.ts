import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user.model";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token", success: false },
        { status: 401 }
      );
    }

    // update and save user
    user.isVerified = true;
    user.verificationToken = "";
    user.verificationTokenExpiry = "";
    await user.save();

    return NextResponse.json(
      {
        message: "Your email has been successfully verified",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error veryfying email:", error);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
