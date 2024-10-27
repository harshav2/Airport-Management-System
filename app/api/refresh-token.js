import { executeQuery } from "../../lib/db";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION } from "../../config/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if the refresh token exists in the database
    const tokens = await executeQuery({
      query: "SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ?",
      values: [decoded.userId, refreshToken],
    });

    if (tokens.length === 0) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newToken = jwt.sign(
      {
        userId: decoded.userId,
        sessionId: decoded.sessionId,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.status(200).json({ token: newToken });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
}
