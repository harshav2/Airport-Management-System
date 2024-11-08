import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: "Token is valid" });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
