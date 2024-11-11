import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function DELETE(request) {
  try {
    let passengerId;

    // Try to parse JSON body
    try {
      const body = await request.json();
      passengerId = body.passengerId;
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);

      // If JSON parsing fails, try to get passengerId from URL params
      const url = new URL(request.url);
      passengerId = url.searchParams.get("passengerId");
    }

    if (!passengerId) {
      return NextResponse.json(
        { error: "Missing required field: passengerId" },
        { status: 400 }
      );
    }

    const response = await executeQuery({
      query: "DELETE FROM User WHERE Id = ?",
      values: [passengerId],
    });

    if (!response.affectedRows) {
      return NextResponse.json(
        { error: "No user found with the given ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User deleted successfully",
      deletedUserId: passengerId,
    });
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const passengers = await executeQuery({
      query:
        "SELECT ID, Username, Name, UserType FROM User WHERE UserType='Passenger'",
      values: [],
    });
    return NextResponse.json({ passengers });
  } catch (error) {
    console.error("Error retrieving passengers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
