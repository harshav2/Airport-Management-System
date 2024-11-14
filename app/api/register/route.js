import { executeQuery } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } from "@/config/jwt";
import { NextResponse } from "next/server";

// Define allowed user types based on the ENUM in the database
const ALLOWED_USER_TYPES = ["Admin", "Passenger", "Airline", "Store"];

export async function POST(request) {
  try {
    const { name, username, password, userType } = await request.json();

    if (!name || !username || !password || !userType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate userType
    if (!ALLOWED_USER_TYPES.includes(userType)) {
      return NextResponse.json(
        {
          message:
            "Invalid user type. Allowed types are: " +
            ALLOWED_USER_TYPES.join(", "),
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser;
    try {
      existingUser = await executeQuery({
        query: "SELECT * FROM User WHERE Username = ?",
        values: [username],
      });
    } catch (dbError) {
      console.error("Database error when checking existing user:", dbError);
      return NextResponse.json(
        { message: "Database error", error: dbError.message },
        { status: 500 }
      );
    }

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (bcryptError) {
      console.error("Bcrypt error:", bcryptError);
      return NextResponse.json(
        { message: "Error hashing password", error: bcryptError.message },
        { status: 500 }
      );
    }

    // Insert new user into the database
    let result;
    try {
      result = await executeQuery({
        query:
          "INSERT INTO User (Name, Username, Password, UserType) VALUES (?, ?, ?, ?)",
        values: [name, username, hashedPassword, userType],
      });
    } catch (insertError) {
      console.error("Database error when inserting new user:", insertError);
      return NextResponse.json(
        { message: "Error creating user", error: insertError.message },
        { status: 500 }
      );
    }

    // Generate a new session ID
    const sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Generate JWT token with session ID
    let token, refreshToken;
    try {
      token = jwt.sign(
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
      refreshToken = jwt.sign(
        { userId: result.insertId, sessionId: sessionId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: JWT_REFRESH_EXPIRATION }
      );
    } catch (jwtError) {
      console.error("JWT error:", jwtError);
      return NextResponse.json(
        { message: "Error generating tokens", error: jwtError.message },
        { status: 500 }
      );
    }

    // Calculate expiration date for refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    // Store refresh token in database
    try {
      const insertResult = await executeQuery({
        query:
          "INSERT INTO RefreshTokens (UserID, Token, SessionID, ExpiresAt) VALUES (?, ?, ?, ?)",
        values: [result.insertId, refreshToken, sessionId, expiresAt],
      });

      if (!insertResult || insertResult.affectedRows !== 1) {
        throw new Error("Failed to insert refresh token");
      }
    } catch (refreshTokenError) {
      console.error("Error storing refresh token:", refreshTokenError);
      if (refreshTokenError.code === "ER_NO_REFERENCED_ROW_2") {
        return NextResponse.json(
          { message: "Invalid UserID", error: "Foreign key constraint failed" },
          { status: 500 }
        );
      } else if (refreshTokenError.code === "ER_DUP_ENTRY") {
        return NextResponse.json(
          { message: "Duplicate refresh token", error: "Token already exists" },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          {
            message: "Error storing refresh token",
            error: refreshTokenError.message,
          },
          { status: 500 }
        );
      }
    }

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
    return NextResponse.json({
      message: "Internal server error",
      error: error.message,
      status: 500,
    });
  }
}
