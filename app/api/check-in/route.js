import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export async function POST(request) {
  try {
    const { type, flightId, userId } = await request.json();

    // Check if FlightID exists in Flight table
    const flightCheckResult = await executeQuery({
      query: `SELECT COUNT(*) AS count FROM Flight WHERE ID = ?`,
      values: [flightId],
    });

    if (flightCheckResult[0].count === 0) {
      return NextResponse.json(
        { message: "FlightID does not exist" },
        { status: 404 }
      );
    }

    // Check if UserID exists in User table
    const userCheckResult = await executeQuery({
      query: `SELECT COUNT(*) AS count FROM User WHERE ID = ?`,
      values: [userId],
    });

    if (userCheckResult[0].count === 0) {
      return NextResponse.json(
        { message: "UserID does not exist" },
        { status: 404 }
      );
    }

    // Insert user on flight information into the UserOnFlight table
    const userOnFlightResult = await executeQuery({
      query: `INSERT INTO UserOnFlight (UserID, FlightID) VALUES (?, ?)`,
      values: [userId, flightId],
    });

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

    // Check if the baggage insert was successful
    if (baggageResult.affectedRows === 0) {
      return NextResponse.json(
        { message: "Failed to add baggage" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User on flight and baggage added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Baggage insertion error:", error);
    return NextResponse.json(
      { message: "An error occurred during insertion", error: error.message },
      { status: 500 }
    );
  }
}
