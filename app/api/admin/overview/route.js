import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
export async function GET() {
  try {
    const totalFlightsToday = await executeQuery({
      query:
        "SELECT COUNT(*) as count FROM Flight WHERE DATE(DepartureTime) = CURDATE()",
      values: [],
    });
    const totalPassengers = await executeQuery({
      query: "SELECT COUNT(*) as count FROM User WHERE UserType = 'User'",
      values: [],
    });
    const totalAirlines = await executeQuery({
      query: "SELECT COUNT(*) as count FROM Airline",
      values: [],
    });
    // Close the database connection
    await connection.end();

    // Return the data as JSON
    return NextResponse.json({
      totalFlights: totalFlightsToday[0].count,
      activePassengers: totalPassengers[0].count,
      totalAirlines: totalAirlines[0].count,
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
