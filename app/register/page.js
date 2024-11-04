"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("Name:", name);
    console.log("Username:", username);
    console.log("Type:", userType);
    console.log("Password:", password);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password, userType }),
      });

      if (response.ok) {
        try {
          const data = await response.json();
        } catch (jsonError) {
          console.error("JSON parsing error:", jsonError);
          setError("Error parsing server response. Please try again.");
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        router.push(`/dashboard/${userType.toLowerCase()}`);
      } else {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          console.error("Error parsing error response:", jsonError);
          setError("An unexpected error occurred. Please try again.");
          return;
        }
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col justify-center items-center flex-grow bg-gray-100 px-4 py-6">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Register for Airport Management System
          </h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm sm:text-base font-medium leading-none"
              >
                Name
              </label>
              <input
                id="name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm sm:text-base font-medium leading-none"
              >
                Username
              </label>
              <input
                id="username"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your username"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm sm:text-base font-medium leading-none"
              >
                Password
              </label>
              <input
                id="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="userType"
                className="text-sm sm:text-base font-medium leading-none"
              >
                User Type
              </label>
              <select
                id="userType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Airline">Airline</option>
                <option value="Store">Store</option>
              </select>
            </div>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 sm:h-11 px-4 py-2 w-full"
              type="submit"
            >
              Register
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
