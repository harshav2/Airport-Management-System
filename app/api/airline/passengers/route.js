import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { verifyToken } from "@/lib/auth"; // Utility function to verify the JWT token

export async function POST(request) {
  try {
    // Extract the username and flightID from the request body
    const { username, flightID } = await request.json();

    // Input validation
    if (!username || !flightID) {
      return NextResponse.json(
        { error: 'Missing required fields: username or flightID' },
        { status: 400 }
      );
    }

    // Call the stored procedure to add the passenger to the flight
    const response = await executeQuery({
      query: 'CALL AddPassengerToFlight(?, ?)', // Use '?' placeholders for parameters
      values: [username, flightID],
    });

    return NextResponse.json({
      message: 'Passenger added to flight successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding passenger:', error);

    // Check for specific error related to user not being found or not being a passenger
    if (error.code === '45000') {
      return NextResponse.json(
        { error: 'User does not exist or is not a passenger' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Extract passengerId from URL parameters
    const url = new URL(request.url);
    const passengerId = url.searchParams.get('passengerId');

    // Check for missing passengerId
    if (!passengerId) {
      return NextResponse.json(
        { error: 'Missing required field: passengerId' },
        { status: 400 }
      );
    }

    // Query to delete the user from the flight
    const response = await executeQuery({
      query: 'DELETE FROM UserOnFlight WHERE UserId = ?',
      values: [passengerId],
    });

    if (!response.affectedRows) {
      return NextResponse.json(
        { error: 'No user found with the given ID' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'User deleted successfully',
      deletedUserId: passengerId,
    });
  } catch (error) {
    console.error('Error in DELETE function:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

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

    // Extract UserID from the decoded token
    const userId = decodedToken.userId;

    // Call the GetPassengersForAirline stored procedure with userId
    const response = await executeQuery({
      query: 'CALL GetPassengersForAirline(?)',
      values: [userId],
    });

    // The response contains two result sets: flights and passengers
    if (response.length === 0 || response[0].error) {
      return NextResponse.json({ error: response[0]?.error || 'No data found' }, { status: 404 });
    }

    // Extract flights and passengers from the response
    const flights = response[0];  // Flights result set
    const passengers = response[1];  // Passengers result set

    // If no flights are found, return a 404 error
    if (flights.length === 0) {
      return NextResponse.json({ error: "No flights found for the airline" }, { status: 404 });
    }

    // If no passengers are found, return an empty array
    return NextResponse.json({ passengers: passengers || [] });
  } catch (error) {
    console.error("Token verification or database query error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching passenger data", error: error.message },
      { status: 500 }
    );
  }
}
