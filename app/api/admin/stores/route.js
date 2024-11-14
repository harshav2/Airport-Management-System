import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } from "@/config/jwt";
import { exec } from "child_process";

export async function GET() {
  try {
    const stores = await executeQuery({
      query:
        "SELECT s.StoreID,  u.Username, u.Name, s.Floor, s.Building FROM Stores s, User u WHERE s.UserID=u.ID ",
      values: [],
    });
    return NextResponse.json({ stores });
  } catch (error) {
    console.error("Error retrieving stores:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    let Username;

    try {
      const body = await request.json();
      Username = body.storeId.Username;
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      const url = new URL(request.url);
      Username = url.searchParams.get("Username");
    }

    // Check if storeId was provided
    if (!Username) {
      return NextResponse.json({
        error: "Missing required field: Username",
        status: 402,
      });
    }

    // Execute delete query
    const response = await executeQuery({
      query: "DELETE FROM User WHERE Username = ?",
      values: [Username],
    });

    if (!response.affectedRows) {
      return NextResponse.json({
        error: "No store found with the given Username",
        status: 404,
      });
    }

    // Respond with success message
    return NextResponse.json({
      message: "Store deleted successfully",
      deletedStore: Username,
      status: 201,
    });
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      details: error.message,
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);

    const { Name, Username, Password, UserType, Floor, Building } = body;

    if (!Name || !Username || !Password || !UserType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await executeQuery({
      query: "SELECT * FROM User WHERE Username = ?",
      values: [Username],
    });

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const userResult = await executeQuery({
      query:
        "INSERT INTO User (Name, Username, Password, UserType) VALUES (?, ?, ?, ?)",
      values: [Name, Username, hashedPassword, UserType],
    });

    const userId = userResult.insertId;

    await executeQuery({
      query:
        "INSERT INTO Stores (UserID, Floor, Building) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Floor = VALUES(Floor), Building = VALUES(Building)",
      values: [userId, Floor, Building],
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        username: Username,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
