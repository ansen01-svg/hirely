import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user.model";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { googleUser } = requestBody;
    const { email, name, image } = googleUser;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        email,
        username: name,
        password: hashedPassword,
        image,
        isVerified: true,
      });
    }

    if (!user.image) {
      user.image = image;
      await user.save();
    }

    return NextResponse.json(
      {
        message: `User fetched successfully updated.`,
        data: user,
        success: true,
      },
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
