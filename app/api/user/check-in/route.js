import { NextResponse } from "next/server";
import { executeQuery } from "../../../../lib/db";

export async function POST(request) {
  try {
    console.log("Received request:", request);

    // Get the payload from the request
    const { type, flightId, userId: username, noOfCheckIn, noOfCabin } = await request.json();
    console.log("Received payload:", { type, flightId, username, noOfCheckIn, noOfCabin });

    // Check if the UserID exists in the User table
    const userCheckResult = await executeQuery({
      query: `SELECT ID FROM User WHERE Username = ?`,
      values: [username],
    });
    console.log("User check result:", username);

    if (userCheckResult.length === 0) {
      return NextResponse.json(
        { message: "UserID does not exist" },
        { status: 404 }
      );
    }

    const userId = userCheckResult[0].ID;
    console.log("User ID:", userId);

    // Check if the user is already checked in for this flight
    const userOnFlightCheckResult = await executeQuery({
      query: `SELECT COUNT(*) AS count FROM UserOnFlight WHERE UserID = ? AND FlightID = ?`,
      values: [userId, flightId],
    });
    console.log("User on flight check result:", userOnFlightCheckResult);

    if (userOnFlightCheckResult[0].count === 0) {
      return NextResponse.json(
        { message: "Check-in record not found. Ensure the correct FlightID is provided." },
        { status: 400 } // Bad request indicating incorrect FlightID or no existing check-in
      );
    }

    // Update the UserOnFlight table for existing entries
    const updateUserOnFlightResult = await executeQuery({
      query: `UPDATE UserOnFlight SET NoOfCheckIn = ?, NoOfCabin = ? WHERE UserID = ? AND FlightID = ?`,
      values: [noOfCheckIn, noOfCabin, userId, flightId],
    });
    console.log("Updated UserOnFlight result:", updateUserOnFlightResult);

    if (updateUserOnFlightResult.affectedRows === 0) {
      return NextResponse.json(
        { message: "Failed to update luggage information" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: "Check-in and baggage information updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred during check-in" },
      { status: 500 }
    );
  }
}
