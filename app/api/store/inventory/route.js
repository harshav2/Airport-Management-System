import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeID = searchParams.get("storeID");

    if (!storeID) {
      return NextResponse.json(
        { error: "storeID is required" },
        { status: 400 }
      );
    }

    const result = await executeQuery({
      query: `
        SELECT i.Name, si.StoreID, si.PricePerUnit, si.TotalQuantity, i.Type
        FROM StallSellsItems si
        JOIN Item i ON si.ItemName = i.Name
        WHERE si.StoreID = ?
      `,
      values: [storeID],
    });

    return NextResponse.json({ result }, { status: 200 });
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

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      return NextResponse.json(
        { error: "Invalid JSON in request body", details: jsonError.message },
        { status: 400 }
      );
    }

    const { storeID, name, price, qty, type } = body;

    if (!storeID || !name || !price || !qty || !type) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await executeQuery({
      query: `
        INSERT INTO Item (Name, Type)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE Type = VALUES(Type)
      `,
      values: [name, type],
    });

    const result = await executeQuery({
      query: `
        INSERT INTO StallSellsItems (StoreID, ItemName, PricePerUnit, TotalQuantity)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        PricePerUnit = VALUES(PricePerUnit),
        TotalQuantity = TotalQuantity + VALUES(TotalQuantity)
      `,
      values: [storeID, name, price, qty],
    });

    return NextResponse.json(
      { message: "Item added/updated successfully" },
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

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeID = searchParams.get("storeID");
    const name = searchParams.get("name");

    if (!storeID || !name) {
      return NextResponse.json(
        { error: "storeID and name are required" },
        { status: 400 }
      );
    }

    const result = await executeQuery({
      query: `
        DELETE FROM StallSellsItems WHERE StoreID = ? AND ItemName = ?
      `,
      values: [storeID, name],
    });

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
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
