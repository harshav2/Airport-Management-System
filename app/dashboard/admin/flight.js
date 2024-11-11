"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FlightManagement() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/flight", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
      const data = await response.json();
      setStatus(true);
      setFlights(data.flights);
    } catch (err) {
      setError("Error fetching flights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updateFlightStatus = async (flightId, newStatus) => {
    try {
      const response = await fetch("/api/admin/flight", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: flightId, status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update flight status");
      }
      fetchFlights();
    } catch (err) {
      setError("Error updating flight status. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!status)
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
                Flight ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Timeslot
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gate
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Airline
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.ID}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {flight.ID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {flight.Timeslot}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {flight.Gate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {flight.Destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {flight.Origin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {flight.Airline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  <Select
                    value={flight.Status}
                    onValueChange={(value) =>
                      updateFlightStatus(flight.ID, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On time">On time</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
