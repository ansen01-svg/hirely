import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user.model";
import sendEmail from "@/app/lib/sendEmail";
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

    const reuqestBody = await request.json();
    const { email } = reuqestBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Cannot find a user with this email.", success: false },
        { status: 404 }
      );
    }

    // create token
    const hashedToken = await bcrypt.hash(user._id.toString(), 10);

    // attach token to user
    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour in milliseconds
    await user.save();

    // send password reset email
    await sendEmail({ email, emailType: "RESET-PASSWORD", token: hashedToken });

    return NextResponse.json(
      { message: "Reset password email has been sent", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending reset password email:", error);
    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
