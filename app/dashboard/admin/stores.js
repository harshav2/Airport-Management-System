"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StoreManagement() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [newStore, setNewStore] = useState({
    Name: "",
    Username: "",
    Building: "",
    Password: "",
    Floor: "",
    UserType: "Store",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/stores");
      if (!response.ok) {
        throw new Error("Failed to fetch stores");
      }
      const data = await response.json();
      setStores(data.stores);
    } catch (err) {
      setError("Error fetching stores. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (store) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        const response = await fetch("/api/admin/stores", {
          method: "DELETE",
          body: JSON.stringify({ storeId: store }),
        });
        if (!response.ok) {
          throw new Error("Failed to delete store");
        }
        setSuccessMessage("Store deleted successfully");
        fetchStores();
      } catch (err) {
        setError("Error deleting store. Please try again.");
      }
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch("/api/admin/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStore),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add store");
      }
      setSuccessMessage("Store added successfully");
      fetchStores();
      setNewStore({
        Floor: "",
        Building: "",
        Password: "",
        Username: "",
        Name: "",
        UserType: "Store",
      });
    } catch (err) {
      setError(err.message || "Error adding store. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleAddStore} className="mb-6 space-y-4">
        <div className="flex flex-col space-y-3">
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Name"
              value={newStore.Name}
              onChange={(e) =>
                setNewStore({ ...newStore, Name: e.target.value })
              }
              required
            />
            <Input
              placeholder="Username"
              value={newStore.Username}
              onChange={(e) =>
                setNewStore({ ...newStore, Username: e.target.value })
              }
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={newStore.Password}
              onChange={(e) =>
                setNewStore({ ...newStore, Password: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-row space-x-4">
            <Input
              placeholder="Floor"
              value={newStore.Floor}
              onChange={(e) =>
                setNewStore({ ...newStore, Floor: e.target.value })
              }
              required
            />
            <Input
              placeholder="Building"
              value={newStore.Building}
              onChange={(e) =>
                setNewStore({ ...newStore, Building: e.target.value })
              }
              required
            />
            <Button type="submit">Add Store</Button>
          </div>
        </div>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm mb-4">{successMessage}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Store ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Floor
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Building
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.StoreID}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {store.StoreID}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {store.Name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {store.Floor}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {store.Building}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(store)}
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
