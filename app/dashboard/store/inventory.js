import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function InventoryManagement({ storeID }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [newItem, setNewItem] = useState({
    Name: "",
    Quantity: "",
    Price: "",
    Type: "Other",
  });

  const fetchInventory = useCallback(async () => {
    if (!storeID) {
      setError("Store ID is missing");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/store/inventory?storeID=${storeID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      const data = await response.json();
      setInventory(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [storeID]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/store/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeID,
          name: newItem.Name,
          price: newItem.Price,
          qty: newItem.Quantity,
          type: newItem.Type,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      await fetchInventory();
      setNewItem({ Name: "", Quantity: "", Price: "", Type: "Other" });
      setSuccessMessage("Item added successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await fetch(
        `/api/store/inventory?storeID=${storeID}&name=${item.Name}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      await fetchInventory();
      setSuccessMessage("Item deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddItem} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Name"
            value={newItem.Name}
            onChange={(e) => setNewItem({ ...newItem, Name: e.target.value })}
            required
            className="flex-1"
          />
          <Input
            placeholder="Price"
            type="number"
            step="0.01"
            value={newItem.Price}
            onChange={(e) => setNewItem({ ...newItem, Price: e.target.value })}
            required
            className="flex-1"
          />
          <Input
            placeholder="Quantity"
            type="number"
            value={newItem.Quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, Quantity: e.target.value })
            }
            required
            className="flex-1"
          />
          <Select
            value={newItem.Type}
            onValueChange={(value) => setNewItem({ ...newItem, Type: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Souvenirs">Souvenirs</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Add Item</Button>
        </div>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm mb-4">{successMessage}</p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price Per Unit
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.Name}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {item.Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {item.Type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  ${parseFloat(item.PricePerUnit).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {item.TotalQuantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(item)}
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
