"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StoreManagement() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStore, setNewStore] = useState({
    storeId: "",
    floor: "",
    building: "",
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
      console.log(data.stores);
    } catch (err) {
      setError("Error fetching stores. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (storeId) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        const response = await fetch("/api/admin/stores", {
          method: "DELETE",
          body: JSON.stringify({ storeId }),
        });
        if (!response.ok) {
          throw new Error("Failed to delete store");
        }
        fetchStores();
      } catch (err) {
        setError("Error deleting store. Please try again.");
      }
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStore),
      });
      if (!response.ok) {
        throw new Error("Failed to add store");
      }
      fetchStores();
      setNewStore({
        storeId: "",
        floor: "",
        building: "",
      });
    } catch (err) {
      setError("Error adding store. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleAddStore} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <Input
            placeholder="Store ID"
            value={newStore.storeId}
            onChange={(e) =>
              setNewStore({ ...newStore, storeId: e.target.value })
            }
            required
          />
          <Input
            placeholder="Floor"
            value={newStore.floor}
            onChange={(e) =>
              setNewStore({ ...newStore, floor: e.target.value })
            }
            required
          />
          <Input
            placeholder="Building"
            value={newStore.building}
            onChange={(e) =>
              setNewStore({ ...newStore, building: e.target.value })
            }
            required
          />
          <Button type="submit">Add Store</Button>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Store ID
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
              <tr key={store.storeId}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {store.storeId}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {store.floor}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {store.building}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(store.storeId)}
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
