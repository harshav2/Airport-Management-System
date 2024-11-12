import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AirlineManagement() {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAirline, setNewAirline] = useState({
    name: "",
    username: "",
    password: "",
    userType: "Airline",
  });

  useEffect(() => {
    fetchAirlines();
  }, []);

  const fetchAirlines = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/airlines");
      if (!response.ok) {
        throw new Error("Failed to fetch airlines");
      }
      const data = await response.json();
      setAirlines(data.airlines);
    } catch (err) {
      setError("Error fetching airlines. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (airline) => {
    if (window.confirm("Are you sure you want to delete this airline?")) {
      try {
        const response = await fetch("/api/admin/airlines", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ airline }), // Send AirlineID for deletion
        });

        if (!response.ok) {
          throw new Error("Failed to delete airline");
        }

        fetchAirlines();
      } catch (err) {
        setError("Error deleting airline. Please try again.");
      }
    }
  };

  const handleAddAirline = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAirline),
      });

      if (!response.ok) {
        throw new Error("Failed to add airline");
      }

      const result = await response.json();

      if (result.refreshToken) {
        fetchAirlines();
      } else {
        throw new Error("Invalid airline data");
      }

      setNewAirline({
        name: "",
        username: "",
        password: "",
        userType: "Airline",
      });
    } catch (err) {
      setError("Error adding airline. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleAddAirline} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <Input
            placeholder="Name"
            value={newAirline.name}
            onChange={(e) =>
              setNewAirline({ ...newAirline, name: e.target.value })
            }
            required
          />
          <Input
            placeholder="Username"
            value={newAirline.username}
            onChange={(e) =>
              setNewAirline({ ...newAirline, username: e.target.value })
            }
            required
          />
          <Input
            placeholder="Password"
            value={newAirline.password}
            type="password"
            onChange={(e) =>
              setNewAirline({ ...newAirline, password: e.target.value })
            }
            required
          />
          <Button type="submit">Add Airline</Button>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Airline ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                UserType
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {airlines.map((airline) => (
              <tr key={airline.AirlineID}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {airline.AirlineID}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {airline.Name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {airline.Username}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {airline.UserType}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(airline)}
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
