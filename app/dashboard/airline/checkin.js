"use client";

import { useState, useEffect } from "react";

export default function CheckInDetails() {
  const [checkInDetails, setCheckInDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCheckInDetails();
  }, []);

  const fetchCheckInDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/airline/check-in", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch check-in details");
      }
      const data = await response.json();
      setCheckInDetails(data.details);
    } catch (err) {
      setError("Error fetching check-in details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-red-500" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Passenger Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Flight ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Number of Checked-in Bags
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Number of Carry-on Bags
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Aircraft Model
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tail Number
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gate
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Belt
              </th>
            </tr>
          </thead>
          <tbody>
            {checkInDetails.map((detail) => (
              <tr key={`${detail.UserID}-${detail.FlightID}`}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.UserID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.FlightID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.Destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.Origin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.NoOfCheckIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.NoOfCabin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.Model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.TailNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.Gate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {detail.Belt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
