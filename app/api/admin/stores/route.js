import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const stores = await executeQuery({
      query:
        "SELECT s.StoreID, s.UserID, u.Name, s.Floor, s.Building FROM Stores s, User u WHERE s.UserID=u.ID ",
      values: [],
    });
    return NextResponse.json({ stores });
  } catch (error) {
    console.error("Error retrieving stores:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    let storeId;

    // Attempt to extract the store ID from the JSON body or URL
    try {
      const body = await request.json();
      storeId = body.storeId;
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      const url = new URL(request.url);
      storeId = url.searchParams.get("storeId");
    }

    // Check if storeId was provided
    if (!storeId) {
      return NextResponse.json({
        error: "Missing required field: storeId",
        status: 400,
      });
    }

    // Execute delete query
    const response = await executeQuery({
      query: "DELETE FROM Stores WHERE StoreID = ?",
      values: [storeId],
    });

    if (!response.affectedRows) {
      return NextResponse.json({
        error: "No store found with the given storeId",
        status: 404,
      });
    }

    // Respond with success message
    return NextResponse.json({
      message: "Store deleted successfully",
      deletedStoreId: storeId,
      status: 200,
    });
  } catch (error) {
    console.error("Error in DELETE function:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      details: error.message,
      status: 500,
    });
  }
}
