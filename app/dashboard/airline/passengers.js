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
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPassenger, setNewPassenger] = useState({
    name: "",
    username: "",
    password: "",
    userType: "Passenger",
  });

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/passengers");
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

  const handleEdit = (passenger) => {
    setEditingPassenger(passenger);
    setIsDialogOpen(true);
  };

  const handleDelete = async (passengerId) => {
    if (window.confirm("Are you sure you want to delete this passenger?")) {
      try {
        const response = await fetch("/api/admin/passengers", {
          method: "DELETE",
          body: JSON.stringify({ passengerId: passengerId }),
        });
        if (!response.ok) {
          throw new Error("Failed to delete passenger");
        }
        setPassengers(passengers.filter((p) => p.id !== passengerId));
      } catch (err) {
        setError("Error deleting passenger. Please try again.");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/airline/passengers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ editingPassenger: editingPassenger.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to update passenger");
      }
      setPassengers(
        passengers.map((p) =>
          p.id === editingPassenger.id ? editingPassenger : p
        )
      );
      setIsDialogOpen(false);
    } catch (err) {
      setError("Error updating passenger. Please try again.");
    }
  };

  const handleAddPassenger = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassenger),
      });
      if (!response.ok) {
        throw new Error("Failed to add passenger");
      }
      const addedPassenger = await response.json();
      fetchPassengers();
      setNewPassenger({ name: "", username: "", password: "", userType: "" });
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
            placeholder="Name"
            value={newPassenger.name}
            onChange={(e) =>
              setNewPassenger({ ...newPassenger, name: e.target.value })
            }
            required
          />
          <Input
            placeholder="Username"
            value={newPassenger.username}
            onChange={(e) =>
              setNewPassenger({ ...newPassenger, username: e.target.value })
            }
            required
          />
          <Input
            placeholder="Password"
            value={newPassenger.password}
            type="password"
            onChange={(e) =>
              setNewPassenger({ ...newPassenger, password: e.target.value })
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
                Passenger ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User Type
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.ID}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {passenger.ID}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {passenger.Name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {passenger.Username}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {passenger.UserType}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800 mr-2"
                    onClick={() => handleEdit(passenger)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(passenger.ID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Passenger</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingPassenger?.name || ""}
                  onChange={(e) =>
                    setEditingPassenger({
                      ...editingPassenger,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={editingPassenger?.username || ""}
                  onChange={(e) =>
                    setEditingPassenger({
                      ...editingPassenger,
                      username: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
