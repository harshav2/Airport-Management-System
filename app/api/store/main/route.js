import { executeQuery } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request) {
  try {
    // Extract the token from the cookies in the request
    const token = request.cookies.get("token");

    console.log("Token from cookies:", token);

    if (!token) {
      return NextResponse.json(
        { message: "Token not found. Unauthorized access." },
        { status: 401 }
      );
    }

    const decodedToken = await verifyToken(token.value);

    console.log("Decoded token:", decodedToken);

    if (!decodedToken) {
      return NextResponse.json(
        { message: "Invalid token. Unauthorized access." },
        { status: 401 }
      );
    }

    console.log("Decoded userId:", decodedToken.userId);

    const storeID = await executeQuery({
      query: `
        SELECT StoreID
        FROM Stores WHERE UserID = ?
      `,
      values: [decodedToken.userId],
    });

    if (!storeID || storeID.length === 0) {
      return NextResponse.json(
        { message: "No StoreID found for the user" },
        { status: 404 }
      );
    }

    return NextResponse.json(storeID);
  } catch (error) {
    console.error("Token verification or database query error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching flight details",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
