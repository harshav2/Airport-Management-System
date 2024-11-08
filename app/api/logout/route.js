import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Create a response
    const response = NextResponse.json({ message: "Logout successful" });

    // Clear the token and refreshToken cookies
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // This will immediately expire the cookie
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // This will immediately expire the cookie
    });

    // Clear the userType cookie as well
    response.cookies.set("userType", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "An error occurred during logout", error: error.message },
      { status: 500 }
    );
  }
}
