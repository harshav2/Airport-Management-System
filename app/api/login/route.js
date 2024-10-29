import { executeQuery } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } from "../../../config/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );
    }

    // Fetch user from database
    const users = await executeQuery({
      query: "SELECT * FROM Passenger WHERE Email = ?",
      values: [email],
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = users[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a new session ID
    const sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Generate JWT token with session ID
    const token = jwt.sign(
      {
        userId: user.ID,
        email: user.Email,
        userType: "Passenger", // Assuming all users in Passenger table are of type 'Passenger'
        sessionId: sessionId,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user.ID, sessionId: sessionId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRATION }
    );

    // Calculate expiration date for refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    // Store refresh token in database
    await executeQuery({
      query:
        "INSERT INTO RefreshTokens (UserID, Token, SessionID, ExpiresAt) VALUES (?, ?, ?, ?)",
      values: [user.ID, refreshToken, sessionId, expiresAt],
    });

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
