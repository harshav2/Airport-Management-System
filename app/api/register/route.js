import { executeQuery } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } from "../../../config/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, username, password, userType } = await request.json();

    if (!name || !username || !password || !userType) {
      return NextResponse.json(
        { message: "Missing required fields" },

        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await executeQuery({
      query: "SELECT * FROM User WHERE Username = ?",
      values: [username],
    });

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    const result = await executeQuery({
      query:
        "INSERT INTO User (Name, Username, password, usertype) VALUES (?, ?, ?, ?)",
      values: [name, username, hashedPassword, userType],
    });

    // Generate a new session ID
    const sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Generate JWT token with session ID
    const token = jwt.sign(
      {
        userId: result.insertId,
        username,
        userType,
        sessionId: sessionId,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: result.insertId, sessionId: sessionId },
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
      values: [result.insertId, refreshToken, sessionId, expiresAt],
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        token,
        refreshToken,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
