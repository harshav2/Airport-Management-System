import { executeQuery } from "../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } from "../../config/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await executeQuery({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    });

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    const result = await executeQuery({
      query:
        "INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)",
      values: [name, email, hashedPassword, userType],
    });

    // Generate a new session ID
    const sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Generate JWT token with session ID
    const token = jwt.sign(
      {
        userId: result.insertId,
        email,
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

    // Store refresh token in database
    await executeQuery({
      query:
        "INSERT INTO refresh_tokens (user_id, token, session_id) VALUES (?, ?, ?)",
      values: [result.insertId, refreshToken, sessionId],
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      refreshToken,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
