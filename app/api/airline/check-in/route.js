import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db"; // Utility function for database queries
import { verifyToken } from "@/lib/auth"; // Helper function for JWT verification

export async function GET(request) {
  try {
    // Extract the token from cookies
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

    // Extract UserID from the decoded token
    const userId = decodedToken.userId; // Ensure your JWT contains 'userId' as the user identifier

    // Log the userId for debugging
    console.log("Decoded userId:", userId);

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

    // Main query to get check-in details for flights associated with the user's airline
    const query = `
      SELECT 
  u.ID AS UserID, 
  u.Name, 
  u.Username, 
  f.FlightID, 
  f.Destination, 
  f.Origin, 
  f.NoOfCheckIn, 
  f.NoOfCabin, 
  a.Model, 
  a.TailNumber, 
  aff.Gate, 
  aff.Belt
FROM User u
INNER JOIN (
  SELECT 
    uof.UserID, 
    uof.FlightID, 
    uof.NoOfCheckIn, 
    uof.NoOfCabin, 
    f.Destination, 
    f.Origin
  FROM UserOnFlight uof
  INNER JOIN Flight f ON uof.FlightID = f.ID
  WHERE f.AirlineID = ?
    AND (f.Origin LIKE '%(JFK)%' OR f.Destination LIKE '%(JFK)%')  -- Check if Origin or Destination contains 'JFK'
) AS f ON u.ID = f.UserID
LEFT JOIN AircraftFlyingFlight aff ON f.FlightID = aff.FlightID
LEFT JOIN Aircraft a ON aff.AircraftID = a.ID
WHERE u.UserType = 'Passenger';

    `;

    // Execute the query with the AirlineID
    const rows = await executeQuery({
      query: query,
      values: [airlineId],
    });

    // Return the data as a JSON response
    return NextResponse.json({ details: rows });
  } catch (error) {
    console.error("Token verification or database query error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching check-in details", error: error.message },
      { status: 500 }
    );
  }
}
