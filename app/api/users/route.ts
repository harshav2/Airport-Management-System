// app/api/users/route.ts

import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const users = await executeQuery({
      query: "SELECT * FROM faculty", // Replace with your actual table
      values: [],
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve users" },
      { status: 500 }
    );
  }
}
