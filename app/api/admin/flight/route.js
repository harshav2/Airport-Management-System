import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const flights = await executeQuery({
      query: `
        SELECT 
          u.ID, 
          CASE
            WHEN u.Origin LIKE '%(JFK)' THEN af.DepartureTime
            WHEN u.Destination LIKE '%(JFK)' THEN af.ArrivalTime
            ELSE NULL
          END AS Timeslot,
          af.Gate, 
          u.Destination, 
          u.Origin, 
          a.Name as Airline,
          af.Status
        FROM Flight u
        JOIN Airline a ON u.AirlineID = a.AirlineID
        JOIN AircraftFlyingFlight af ON u.ID = af.FlightID
      `,
      values: [],
    });
    console.log(flights);
    return NextResponse.json({
      flights: flights,
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    let id, status;

    // First, try to parse the JSON body
    try {
      const body = await request.json();
      ({ id, status } = body);
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);

      // If JSON parsing fails, try to get data from URL parameters
      const url = new URL(request.url);
      id = url.searchParams.get("id");
      status = url.searchParams.get("status");
    }

    // Validate input
    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id and status" },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["On time", "Delayed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid status. Must be one of: On time, Delayed, Cancelled",
        },
        { status: 400 }
      );
    }

    // Update flight status
    const result = await executeQuery({
      query: `
        UPDATE AircraftFlyingFlight
        SET Status = ?
        WHERE FlightID = ?
      `,
      values: [status, id],
    });
    console.log(result);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Flight not found or status unchanged" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Flight status updated successfully",
      updatedFlight: { id, status },
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
