import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/user.model";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await request.nextUrl.searchParams.get("userId");

    const user = await User.findOne({ _id: userId });

    return NextResponse.json(
      {
        message: `User fetched successfully.`,
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
