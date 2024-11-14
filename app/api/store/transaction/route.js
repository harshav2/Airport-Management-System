import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeID = searchParams.get("storeID");
    const userID = searchParams.get("userID");
    const itemName = searchParams.get("itemName");

    if (!storeID) {
      return NextResponse.json(
        { error: "storeID is required" },
        { status: 400 }
      );
    }

    let query = `
      SELECT TransactionID, Qty, Timestamp, Item_name, UserID, StoreID
      FROM Transaction
      WHERE StoreID = ?
    `;
    const values = [storeID];

    if (userID) {
      query += " AND UserID = ?";
      values.push(userID);
    }

    if (itemName) {
      query += " AND Item_name = ?";
      values.push(itemName);
    }

    const result = await executeQuery({
      query,
      values,
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      details: error.message,
      stack: error.stack,
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      return NextResponse.json({
        error: "Invalid JSON in request body",
        details: jsonError.message,
        status: 400,
      });
    }

    const { storeID, userID, itemName, qty } = body;

    if (!storeID || !userID || !itemName || !qty) {
      return NextResponse.json({
        error: "Required fields not given",
        status: 400,
      });
    }

    const result = await executeQuery({
      query: `
        INSERT INTO Transaction (StoreID, UserID, Item_name, Qty)
        VALUES (?, ?, ?, ?)
      `,
      values: [storeID, userID, itemName, qty],
    });

    console.log(result);

    return NextResponse.json(
      { message: "Transaction recorded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
