import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/user.model";
import { connectDB } from "@/app/lib/db";
import verifyToken from "@/app/lib/verifyToken";

connectDB();

export async function GET(request: NextRequest) {
  try {
    console.log(request);
    // const userId = await verifyToken(request);
    // const user = await User.findOne({ _id: userId }).select("-password");
    // return NextResponse.json(
    //   {
    //     message: "Current user",
    //     data: user,
    //   },
    //   { status: 200 }
    // );
    return NextResponse.json({ message: "test" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
