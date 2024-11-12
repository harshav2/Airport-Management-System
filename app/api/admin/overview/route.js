import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
export async function GET() {
  try {
    const totalFlightsToday = await executeQuery({
      query:
        "SELECT COUNT(*) as count FROM Flight u, AircraftFlyingFlight af WHERE u.ID=af.FlightID AND Date = '2023-12-03'", //ideally date should be cur_date but since we're using dummy data, use a fixed date
      values: [],
    });
    const totalPassengers = await executeQuery({
      query: "SELECT COUNT(*) as count FROM User WHERE UserType = 'Passenger'",
      values: [],
    });
    const totalAirlines = await executeQuery({
      query: "SELECT COUNT(*) as count FROM Airline",
      values: [],
    });
    const currentRevenue = await executeQuery({
      query: `
SELECT 
    IFNULL(SUM(Qty * PricePerUnit), 0) AS TotalRevenue
FROM 
    (
        SELECT 
            t.Qty, 
            s.PricePerUnit
        FROM 
            Transaction t
        JOIN 
            StallSellsItems s ON t.Item_name = s.ItemName AND t.StoreID = s.StoreID
        WHERE 
            DATE(t.Timestamp) = CURDATE()  
    ) AS RevenueData;
`,
      values: [],
    });
    const registeredStores = await executeQuery({
      query: "SELECT COUNT(*) AS count FROM Stores",
      values: [],
    });

    return NextResponse.json({
      totalFlights: totalFlightsToday[0].count,
      activePassengers: totalPassengers[0].count,
      totalAirlines: totalAirlines[0].count,
      currentRevenue: currentRevenue[0].TotalRevenue,
      registeredStores: registeredStores[0].count,
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
