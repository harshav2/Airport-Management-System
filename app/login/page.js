"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("Passenger"); // Default value for userType
  const [error, setError] = useState(""); // Initialize error state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, userType }), // Include name and userType in request
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        if (userType === "Passenger") {
          router.push("/dashboard/passenger");
        } else if (userType === "Staff") {
          router.push("/dashboard/staff-dashboard");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col justify-center items-center flex-grow bg-gray-100 px-4 py-6">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Login to Airport Management System
          </h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}
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
                htmlFor="email"
                className="text-sm sm:text-base font-medium leading-none"
              >
                Email
              </label>
              <input
                id="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Passenger">Passenger</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm sm:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 sm:h-11 px-4 py-2 w-full"
              type="submit"
            >
              Login
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
