import { connectDB } from "@/utils/config/mongoose";
import User from "@/utils/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "please all fileld sections" });
    }

    const ifUserExistEmail = await User.findOne({ email });
    const ifUserExistUsername = await User.findOne({ username });

    if (ifUserExistEmail || ifUserExistUsername) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered" });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: "error", error: err });
  }
}
