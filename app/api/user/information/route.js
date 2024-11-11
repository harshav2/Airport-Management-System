import { NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/auth";  // Assuming you have this helper function for JWT verification
import { executeQuery } from "../../../../lib/db";   // Assuming you have this helper function for DB queries

export async function GET(request) {
  try {
    // Extract the token from the cookies in the request
    const token = request.cookies.get('token');

    // Log to check if the token is being retrieved
    console.log("Token from cookies:", token);

    // If no token is found, respond with an Unauthorized status
    if (!token) {
      return NextResponse.json(
        { message: "Token not found. Unauthorized access." },
        { status: 401 }
      );
    }

    // Verify and decode the token
    const decodedToken = await verifyToken(token.value);

    // Log to check if the token is being decoded properly
    console.log("Decoded token:", decodedToken);

    // If the token is invalid, respond with an Unauthorized status
    if (!decodedToken) {
      return NextResponse.json(
        { message: "Invalid token. Unauthorized access." },
        { status: 401 }
      );
    }

    // Log the userId from the decoded token for debugging
    console.log("Decoded userId:", decodedToken.userId);

    // Fetch user ticket information and flight details
    const ticketDetails = await executeQuery({
        query: `
        SELECT 
          u.ID AS UserID,
          u.Username,
          a.Name AS Airline,
          f.ID AS FlightID,  -- Adding FlightID to the query
          f.Destination,
          f.Origin,
          ac.Model AS AircraftModel,
          aff.DepartureTime,
          aff.ArrivalTime,
          aff.Gate,
          aff.Belt
        FROM 
          UserOnFlight uof
        JOIN 
          User u ON uof.UserID = u.ID
        JOIN 
          Flight f ON uof.FlightID = f.ID
        JOIN 
          AircraftFlyingFlight aff ON aff.FlightID = f.ID
        JOIN 
          Aircraft ac ON aff.AircraftID = ac.ID
        JOIN 
          Airline a ON f.AirlineID = a.AirlineID
        WHERE 
          uof.UserID = ?; -- Replace ? with the specific UserID
      `,
      values: [decodedToken.userId],  // Use userId from the token to fetch their tickets
    });

    // If no tickets are found for the user, respond with a 404 status
    if (!ticketDetails || ticketDetails.length === 0) {
      return NextResponse.json(
        { message: "No ticket information found for the user" },
        { status: 404 }
      );
    }

    // Respond with the fetched ticket and flight data
    return NextResponse.json(ticketDetails);
  } catch (error) {
    console.error("Token verification or database query error:", error);
    // Handle unexpected errors
    return NextResponse.json(
      { message: "An error occurred while fetching flight details", error: error.message },
      { status: 500 }
    );
  }
}
