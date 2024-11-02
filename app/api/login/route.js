import { NextResponse } from "next/server";
import { generateToken, generateRefreshToken } from "../../../lib/auth";
import { executeQuery } from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const users = await executeQuery({
      query: "SELECT * FROM Passenger WHERE Username = ?",
      values: [username],
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await generateToken({
      userId: user.ID,
      userType: user.UserType,
    });
    const refreshToken = await generateRefreshToken({ userId: user.ID });

    // Set cookies
    const response = NextResponse.json({
      message: "Login successful",
      userType: user.UserType,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
