// app/api/test-db/route.ts

import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export async function GET() {
  try {
    const result = await executeQuery({ query: "SELECT 1", values: [] });
    return NextResponse.json({ message: "DB connected successfully!", result });
  } catch (error) {
    return NextResponse.json({
      message: "DB connection error",
      error: error.message,
    });
  }
}
