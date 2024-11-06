// api/check-in.js
import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export async function POST(request) {
  try {
    console.log("Received request:", request);

    const { type, flightId, userId: username } = await request.json();
    console.log("Received payload:", { type, flightId, username });

    // Check if FlightID exists in Flight table
    const flightCheckResult = await executeQuery({
      query: `SELECT COUNT(*) AS count FROM Flight WHERE ID = ?`,
      values: [flightId],
    });
    console.log("Flight check result:", flightCheckResult);
    console.log("Flight check result:", flightId);
    if (flightCheckResult[0].count === 0) {
      return NextResponse.json(
        { message: "FlightID does not exist" },
        { status: 404 }
      );
    }

    // Check if UserID exists in User table
    const userCheckResult = await executeQuery({
      query: `SELECT ID as ID FROM User WHERE Username = ?`,
      values: [username],
    });
    console.log("User check result:", username);

    const userId = userCheckResult[0].ID;
    console.log("User ID:", userCheckResult);

    if (userCheckResult[0].ID === undefined) {
      return NextResponse.json(
        { message: "UserID does not exist" },
        { status: 404 }
      );
    }

    // Check if user is already checked in for this flight
    const userOnFlightCheckResult = await executeQuery({
      query: `SELECT COUNT(*) AS count FROM UserOnFlight WHERE UserID = ? AND FlightID = ?`,
      values: [userId, flightId],
    });
    console.log("User on flight check result:", userOnFlightCheckResult);

    if (userOnFlightCheckResult[0].count > 0) {
      return NextResponse.json(
        { message: "User is already checked in for this flight" },
        { status: 400 }
      );
    }

    // Insert user on flight information into the UserOnFlight table
    const userOnFlightResult = await executeQuery({
      query: `INSERT INTO UserOnFlight (UserID, FlightID) VALUES (?, ?)`,
      values: [userId, flightId],
    });
    console.log("User on flight result:", userOnFlightResult);

    // Check if the user on flight insert was successful
    if (userOnFlightResult.affectedRows === 0) {
      return NextResponse.json(
        { message: "Failed to add user on flight" },
        { status: 500 }
      );
    }

    // Insert baggage information into the Baggage table
    const baggageResult = await executeQuery({
      query: `INSERT INTO Baggage (Type, FlightID, UserID) VALUES (?, ?, ?)`,
      values: [type, flightId, userId],
    });
    console.log("Baggage result:", baggageResult);

    return NextResponse.json(
      { message: "Check-in successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred during check-in" },
      { status: 500 }
    );
  }
}