import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const storeID = url.searchParams.get("storeID");

    if (!storeID) {
      return NextResponse.json(
        { error: "storeID parameter is required" },
        { status: 400 }
      );
    }

    let totalSales = await executeQuery({
      query: "SELECT get_total_sales_for_store(?) AS TotalSales",
      values: [storeID],
    });

    let averageOrderValue = await executeQuery({
      query: `SELECT ROUND(AVG(t.Qty * s.PricePerUnit),2) AS AverageOrderValueToday 
              FROM transaction t 
              JOIN stallsellsitems s 
              ON t.Item_name = s.ItemName AND t.StoreID = s.StoreID 
              WHERE DATE(t.Timestamp) = CURDATE() AND t.StoreID = ?`,
      values: [storeID],
    });

    let salesFromToday = await executeQuery({
      query: `SELECT IFNULL(SUM(Qty), 0) AS SalesFromToday 
              FROM transaction 
              WHERE StoreID = ? AND DATE(Timestamp) = CURDATE()`,
      values: [storeID],
    });

    let mostPopularItemSold = await executeQuery({
      query: `SELECT t.Item_name, SUM(t.Qty) AS QuantitySoldToday 
              FROM transaction t 
              WHERE DATE(t.Timestamp) = CURDATE() AND t.StoreID = ? 
              GROUP BY t.Item_name 
              ORDER BY QuantitySoldToday DESC 
              LIMIT 1`,
      values: [storeID],
    });

    let lowestSoldItem = await executeQuery({
      query: `SELECT s.ItemName AS Item_name, IFNULL(SUM(t.Qty), 0) AS TotalQuantitySold 
          FROM stallsellsitems s 
          LEFT JOIN transaction t 
          ON s.ItemName = t.Item_name AND s.StoreID = t.StoreID 
          WHERE s.StoreID = ? 
          GROUP BY s.ItemName 
          ORDER BY TotalQuantitySold ASC 
          LIMIT 1`,
      values: [storeID],
    });

    let mostSoldType = await executeQuery({
      query: `SELECT i.Type AS ItemType, SUM(t.Qty) AS TotalQuantitySold 
              FROM transaction t 
              JOIN stallsellsitems s 
              ON t.Item_name = s.ItemName AND t.StoreID = s.StoreID 
              JOIN item i 
              ON t.Item_name = i.Name 
              WHERE t.StoreID = ? 
              GROUP BY i.Type 
              ORDER BY TotalQuantitySold DESC 
              LIMIT 1`,
      values: [storeID],
    });

    totalSales = totalSales[0].TotalSales;
    averageOrderValue = averageOrderValue[0].AverageOrderValueToday;
    salesFromToday = salesFromToday[0].SalesFromToday;
    let mostSoldValue = mostPopularItemSold[0].QuantitySoldToday;
    let mostSoldItem = mostPopularItemSold[0].Item_name;
    let lowestSoldValue = lowestSoldItem[0].TotalQuantitySold;
    lowestSoldItem = lowestSoldItem[0].Item_name;
    let mostTypeQty = mostSoldType[0].TotalQuantitySold;
    mostSoldType = mostSoldType[0].ItemType;

    return NextResponse.json({
      totalSales,
      averageOrderValue,
      salesFromToday,
      mostSoldItem,
      mostSoldValue,
      lowestSoldItem,
      lowestSoldValue,
      mostTypeQty,
      mostSoldType,
    });
  } catch (error) {
    console.error("Error fetching total sales: ", error);
    return NextResponse.json(
      { error: "An error occurred while fetching total sales" },
      { status: 500 }
    );
  }
}
