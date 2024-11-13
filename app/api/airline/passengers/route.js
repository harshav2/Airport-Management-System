import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(request) {
  try {
    // Extract the token from cookies (or any other method for user verification)
    const token = request.cookies.get('token');
    if (!token) {
      return NextResponse.json({ error: "Unauthorized access, token required." }, { status: 401 });
    }

    const decodedToken = await verifyToken(token.value);
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token." }, { status: 401 });
    }

    const airlineId = decodedToken.airlineId;  // Assuming airlineId is part of the token

    const query = `
      SELECT 
        u.ID AS PassengerID, 
        u.Name, 
        u.Username, 
        u.UserType, 
        f.Origin, 
        f.Destination
      FROM User u
      INNER JOIN UserOnFlight uof ON u.ID = uof.UserID
      INNER JOIN Flight f ON uof.FlightID = f.ID
      WHERE u.UserType = 'Passenger' 
        AND f.AirlineID = ? 
        AND (f.Origin LIKE '%(JFK)%' OR f.Destination LIKE '%(JFK)%');
    `;

    const passengers = await executeQuery({
      query: query,
      values: [airlineId],
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
