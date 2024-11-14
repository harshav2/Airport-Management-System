"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function DashboardOverview({ storeID }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (!storeID) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/store/overview?storeID=${storeID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [storeID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div>
      {
        <div className="flex flex-col space-y-4">
          <div className="space-x-4"></div>
          <div className="space-x-4"></div>
        </div>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              Total Sales Made
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-900">
              {data?.totalSales}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              Sales From Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-900">
              {data?.salesFromToday}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              Average Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-900">
              {data?.averageOrderValue}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              Lowest Sold Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-900">
              {data?.lowestSoldItem} : {data?.lowestSoldValue}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              Most Sold Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-900">
              {data?.mostSoldItem} : {data?.mostSoldValue}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">
              Most Sold Item Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-900">
              {data?.mostSoldType} : {data?.mostTypeQty}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
