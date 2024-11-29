import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/app/models/user.model";
import { connectDB } from "@/app/lib/db";
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

    const requestBody = await request.json();
    const { token } = requestBody;

    if (!token) {
      return NextResponse.json(
        { error: "Please provide token", success: false },
        { status: 401 }
      );
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json(
        { error: "User is verified or does not exists", success: false },
        { status: 404 }
      );
    }

    // create token
    const hashedToken = await bcryptjs.hash(user._id.toString(), 10);

    // attach verification tokens and expiry to the user and save
    user.verificationToken = hashedToken;
    user.verificationTokenExpiry = new Date(Date.now() + 172800000);
    await user.save();

    // send mail
    await sendEmail({
      email: user.email,
      emailType: "VERIFY-EMAIL",
      token: hashedToken,
    });

    return NextResponse.json({
      message: "Email re-sent successful, please check your email.",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error resending verification email:", error);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
