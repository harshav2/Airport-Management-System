"use client";

import { useState, useEffect } from "react";

export default function TestDatabasePage() {
  const [dbTest, setDbTest] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/test-db");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }
      const data = await response.json();
      setDbTest(data.result);
      console.log(data);
    } catch (err) {
      setError(`Failed to test database connection: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(`Failed to fetch users: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testDatabase();
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Database Test Result:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : dbTest ? (
          <p className="text-green-500">
            Database connection successful! Test value: {dbTest[0]?.test}
          </p>
        ) : (
          <p>No result</p>
        )}
        <button
          onClick={testDatabase}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Database Connection
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Users:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length > 0 ? (
          <ul className="list-disc pl-5">
            {users.map((user, index) => (
              <li key={index}>{JSON.stringify(user)}</li>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
        <button
          onClick={fetchUsers}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Users
        </button>
      </div>
    </div>
  )
}