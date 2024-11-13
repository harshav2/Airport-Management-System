"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function PassengerManagement() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPassenger, setNewPassenger] = useState({
    username: "",
    flightID: "",
  });

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/airline/passengers");
      if (!response.ok) {
        throw new Error("Failed to fetch passengers");
      }
      const data = await response.json();
      setPassengers(data.passengers);
      console.log(data.passengers);
    } catch (err) {
      setError("Error fetching passengers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userID) => {
    if (window.confirm("Are you sure you want to delete this passenger?")) {
      try {
        const response = await fetch(`/api/airline/passengers?passengerId=${userID}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete passenger");
        }
        setPassengers(passengers.filter((p) => p.UserID !== userID));
      } catch (err) {
        setError("Error deleting passenger. Please try again.");
      }
    }
  };

  const handleAddPassenger = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/airline/passengers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassenger),
      });
      if (!response.ok) {
        throw new Error("Failed to add passenger");
      }
      await fetchPassengers();
      setNewPassenger({ userID: "", username: "", flightID: "" });
    } catch (err) {
      setError("Error adding passenger. Please try again.");
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
    <div>
      <form onSubmit={handleAddPassenger} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <Input
            placeholder="Username"
            value={newPassenger.username}
            onChange={(e) =>
              setNewPassenger({ ...newPassenger, username: e.target.value })
            }
            required
          />
          <Input
            placeholder="Flight ID"
            value={newPassenger.flightID}
            onChange={(e) =>
              setNewPassenger({ ...newPassenger, flightID: e.target.value })
            }
            required
          />
          <Button type="submit">Add Passenger</Button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Flight ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.UserID}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {passenger.UserID}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {passenger.Username}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {passenger.FlightID}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(passenger.UserID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
