import { executeQuery } from "../../../lib/db";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION } from "../../../config/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token is required" },
        { status: 400 }
      );
    }

    // Verify the refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Check if the refresh token exists in the database and is not expired
    const tokens = await executeQuery({
      query:
        "SELECT * FROM RefreshTokens WHERE UserID = ? AND Token = ? AND ExpiresAt > NOW()",
      values: [decoded.userId, refreshToken],
    });

    if (tokens.length === 0) {
      return NextResponse.json(
        { message: "Invalid or expired refresh token" },
        { status: 401 }
      );
    }

    // Fetch user details
    const users = await executeQuery({
      query: "SELECT * FROM Passenger WHERE ID = ?",
      values: [decoded.userId],
    });

    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = users[0];

    // Generate a new access token
    const newToken = jwt.sign(
      {
        userId: user.ID,
        email: user.Email,
        userType: "Passenger", // Assuming all users in Passenger table are of type 'Passenger'
        sessionId: decoded.sessionId,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    return NextResponse.json({ token: newToken }, { status: 200 });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
