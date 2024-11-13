import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
export async function DELETE(request) {
  try {
    let username;

    try {
      const body = await request.json();
      username = body.airline.Username;
    } catch (jsonError) {
      console.log("JSON parsing error:", jsonError);

      const url = new URL(request.url);
      username = url.searchParams.get("Username");
    }

    console.log(username);

    if (!username) {
      return NextResponse.json({
        error: "Missing required field: Username",
        status: 400,
      });
    }

    const response = await executeQuery({
      query: "DELETE FROM User WHERE Username = ?",
      values: [username],
    });

    console.log(response);

    if (!response.affectedRows) {
      return NextResponse.json({
        error: "No airline found with the given username",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Airline deleted successfully",
      deletedAirline: username,
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

export async function GET() {
  try {
    const airlines = await executeQuery({
      query:
        "SELECT a.AirlineID, u.Username, a.Name, u.UserType FROM User u, Airline a WHERE u.ID=a.UserID",
      values: [],
    });
    return NextResponse.json({ airlines });
  } catch (error) {
    console.log("Error retrieving passengers:", error);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
