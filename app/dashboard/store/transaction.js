import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function TransactionManagement({ storeID }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    UserID: "",
    Item_name: "",
  });

  const [inputValues, setInputValues] = useState({
    UserID: "",
    Item_name: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!storeID) {
        setError("Store ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let query = `/api/store/transaction?storeID=${storeID}`;

        if (filters.Item_name) {
          query += `&Item_name=${filters.Item_name}`;
        }
        if (filters.UserID) {
          query += `&UserID=${filters.UserID}`;
        }
        const response = await fetch(query);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [storeID, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFilters(inputValues);
  };

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleFilterSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Input
            name="UserID"
            placeholder="Filter by User ID"
            value={inputValues.UserID}
            onChange={handleFilterChange}
            className="flex-1"
          />
          <Input
            name="Item_name"
            placeholder="Filter by Item Name"
            value={inputValues.Item_name}
            onChange={handleFilterChange}
            className="flex-1"
          />
          <Button type="submit">Apply Filters</Button>
        </div>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.TransactionID}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {transaction.TransactionID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {transaction.UserID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {transaction.Item_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {transaction.Qty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {format(
                    new Date(transaction.Timestamp),
                    "dd-MM-yyyy HH:mm:ss"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
