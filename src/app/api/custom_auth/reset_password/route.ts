import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/app/models/user.model";
import { connectDB } from "@/app/lib/db";
import { rateLimit } from "@/app/lib/rateLimit";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const isAllowed = rateLimit(request, 3, 60 * 60 * 1000); // 3 requests/hour
    if (!isAllowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          success: false,
        },
        { status: 429 }
      );
    }

    const requestBody = await request.json();
    const { password, token } = requestBody;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Link has expired. Request new link again.", success: false },
        { status: 404 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // update user password and save
    user.password = hashedPassword;
    user.passwordResetToken = "";
    user.passwordResetTokenExpiry = "";
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
