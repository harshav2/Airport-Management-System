import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { verifyToken } from "@/lib/auth"; // Utility function to verify the JWT token

export async function GET(request) {
  try {
    // Extract the token from cookies
    const token = request.cookies.get('token');

    // If no token is found, respond with an Unauthorized status
    if (!token) {
      return NextResponse.json(
        { message: "Token not found. Unauthorized access." },
        { status: 401 }
      );
    }

    // Verify and decode the token
    const decodedToken = await verifyToken(token.value);

    // If the token is invalid, respond with an Unauthorized status
    if (!decodedToken) {
      return NextResponse.json(
        { message: "Invalid token. Unauthorized access." },
        { status: 401 }
      );
    }

    // Extract the UserID from the decoded token
    const userId = decodedToken.userId;

    // Query to get the AirlineID for the authenticated user
    const airlineQuery = `
      SELECT AirlineID
      FROM Airline
      WHERE UserID = ?
    `;
    const airlineResult = await executeQuery({
      query: airlineQuery,
      values: [userId],
    });

    if (airlineResult.length === 0) {
      return NextResponse.json({ error: "Airline not found for the user" }, { status: 404 });
    }

    const airlineId = airlineResult[0].AirlineID;

    // Query to get flights only for the authenticated user's airline
    const flightsQuery = `
      SELECT 
        u.ID AS FlightID, 
        CASE
          WHEN u.Origin LIKE '%(JFK)' THEN af.DepartureTime
          WHEN u.Destination LIKE '%(JFK)' THEN af.ArrivalTime
          ELSE 'This flight is for another airport'  
        END AS Timeslot,
        af.Gate, 
        u.Destination, 
        u.Origin, 
        a.Name as Airline,
        af.Status
      FROM Flight u
      JOIN Airline a ON u.AirlineID = a.AirlineID
      JOIN AircraftFlyingFlight af ON u.ID = af.FlightID
      WHERE a.AirlineID = ?;

    `;

    // Execute the query with the AirlineID of the authenticated user
    const flights = await executeQuery({
      query: flightsQuery,
      values: [airlineId],
    });

    // Return the flight data as JSON
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
