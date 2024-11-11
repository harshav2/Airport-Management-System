import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
export async function GET() {
  try {
    const totalFlightsToday = await executeQuery({
      query:
        "SELECT COUNT(*) as count FROM Flight u, AircraftFlyingFlight af WHERE u.ID=af.FlightID AND Date = '2023-12-03'", //ideally date should be cur_date but since we're using dummy data, use a fixed date
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
    console.log(totalAirlines, totalFlightsToday, totalPassengers);
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
