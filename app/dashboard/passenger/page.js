"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plane,
  Users,
  Briefcase,
  LogOut,
  Menu,
  BarChart,
  ShoppingBag,
  Bell,
  User,
} from "lucide-react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("checkin");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case "checkin":
        return <CheckIn />;
      case "status":
        return <FlightStatusAndAlerts />;
      case "info":
        return <Information />;
      case "map":
        return <AirportMap />;
      default:
        return <CheckIn />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                className="p-2 rounded-md lg:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/" className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-green-500" />
                <span className="text-xl font-semibold text-gray-800">
                  AirportMS
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link
                className="text-sm font-medium hover:text-green-600"
                href="#"
              >
                About
              </Link>
              <Link
                className="text-sm font-medium hover:text-green-600"
                href="#"
              >
                Services
              </Link>
              <Link
                className="text-sm font-medium hover:text-green-600"
                href="#"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
              <User className="h-6 w-6 text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative z-40 w-64 h-[calc(100vh-4rem)] bg-white shadow-md transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="flex flex-col h-full justify-between">
            <nav className="mt-8">
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "checkin"
                    ? "bg-green-100 text-green-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("checkin");
                  setIsSidebarOpen(false);
                }}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Check In</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "status"
                    ? "bg-green-100 text-green-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("status");
                  setIsSidebarOpen(false);
                }}
              >
                <BarChart className="h-5 w-5" />
                <span>Flight Status</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "info"
                    ? "bg-green-100 text-green-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("info");
                  setIsSidebarOpen(false);
                }}
              >
                <Users className="h-5 w-5" />
                <span>Information</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "map"
                    ? "bg-green-100 text-green-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("map");
                  setIsSidebarOpen(false);
                }}
              >
                <Briefcase className="h-5 w-5" />
                <span>Airport Map</span>
              </a>
            </nav>
            <div className="p-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <h1 className="text-2xl font-semibold mb-6">Welcome, User</h1>
          {renderContent()}
        </main>
      </div>

      <footer className="bg-white shadow-md mt-auto z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <p className="text-sm text-gray-500">
              © 2024 Airport Management System. All rights reserved.
            </p>
            <nav className="flex space-x-4">
              <Link
                className="text-sm text-gray-500 hover:text-gray-700"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm text-gray-500 hover:text-gray-700"
                href="#"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function FlightStatusAndAlerts() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightStatus = async () => {
      try {
        const response = await fetch("/api/user/status", {
          headers: {
            Authorization: `Bearer ${document.cookie.replace(
              /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
              "$1"
            )}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch flight status");
        }

        const data = await response.json();
        setFlights(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFlightStatus();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Flight Status Board</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Flight ID
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Departure Time
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Gate
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.FlightID}>
                  <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                    {flight.FlightID}
                  </td>
                  <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                    {flight.time} {/* Display time in a readable format */}
                  </td>
                  <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                    {flight.Destination}
                  </td>
                  <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                    {flight.Gate}
                  </td>
                  <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                    {flight.Status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Information() {
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flight details on component mount
  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await fetch("/api/user/information"); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error("Failed to fetch flight details");
        }

        const data = await response.json();
        setFlightDetails(data); // Set the flight details from the API response
      } catch (error) {
        setError(error.message); // Capture any errors
      } finally {
        setLoading(false); // Stop loading after fetch is complete
      }
    };

    fetchFlightDetails();
  }, []); // Empty dependency array means it runs only once after the component mounts

  // If still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching data
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If flightDetails are fetched successfully
  return (
    <div className="space-y-6">
      {/* Ticket Information Section */}
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Full Name:</strong> {flightDetails[0].Username}{" "}
              {/* Dynamic Username */}
            </p>
            <p>
              <strong>Flight ID:</strong> {flightDetails[0].FlightID}{" "}
              {/* Dynamic Flight ID */}
            </p>
          </div>
          <div>
            <p>
              <strong>Departure:</strong> {flightDetails[0].Origin} at{" "}
              {flightDetails[0].DepartureTime} {/* Dynamic Departure Time */}
            </p>
            <p>
              <strong>Arrival:</strong> {flightDetails[0].Destination} at{" "}
              {flightDetails[0].ArrivalTime} {/* Dynamic Arrival Time */}
            </p>
          </div>
        </div>
      </div>

      {/* Flight Information Section */}
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Flight Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Airline:</strong> {flightDetails[0].Airline}{" "}
              {/* Dynamic Airline Name */}
            </p>
            <p>
              <strong>Departure:</strong> {flightDetails[0].Origin} at{" "}
              {flightDetails[0].DepartureTime}
            </p>
            <p>
              <strong>Arrival:</strong> {flightDetails[0].Destination} at{" "}
              {flightDetails[0].ArrivalTime}
            </p>
          </div>
          <div>
            <p>
              <strong>Aircraft:</strong> {flightDetails[0].AircraftModel}{" "}
              {/* Dynamic Aircraft Model */}
            </p>
            <p>
              <strong>Gate:</strong> {flightDetails[0].Gate}{" "}
              {/* Dynamic Gate */}
            </p>
            <p>
              <strong>Belt:</strong> {flightDetails[0].Belt}{" "}
              {/* Dynamic Belt */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AirportMap() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Airport Map</h2>
      <div className="bg-gray-200 p-4 text-center rounded-lg">
        <p>Airport map placeholder</p>
        <p>
          In a real application, you would integrate an interactive map here.
        </p>
      </div>
    </div>
  );
}
export function CheckIn() {
  const [userId, setUserId] = useState("");
  const [flightId, setFlightId] = useState("");
  const [noOfCheckIn, setNoOfCheckIn] = useState(0); // State for checked-in luggage
  const [noOfCabin, setNoOfCabin] = useState(0); // State for carry-on luggage
  const [alertMessage, setAlertMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled out
    if (!userId || !flightId || noOfCheckIn < 0 || noOfCabin < 0) {
      setAlertMessage("Please fill in all required fields.");
      setTimeout(() => setAlertMessage(""), 3000); // Display alert for 3 seconds
      return;
    }

    const payload = {
      flightId,
      userId,
      noOfCheckIn, // Number of checked-in luggage
      noOfCabin, // Number of carry-on luggage
    };

    try {
      const response = await fetch("/api/user/check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlertMessage(
          `Error: ${response.status} ${response.statusText} - ${
            errorData?.message || "Please try again later."
          }`
        );
        setTimeout(() => setAlertMessage(""), 3000);
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      setAlertMessage("Check-in successful!");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("There was an error during check-in. Please try again.");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Check-in</h2>

      {alertMessage && (
        <div className="alert bg-red-500 text-white p-2 rounded-md mb-4">
          {alertMessage}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="userId"
          >
            User ID
          </label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            id="userId"
            type="text"
            placeholder="Enter your User ID"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="flightId"
          >
            Flight ID
          </label>
          <input
            value={flightId}
            onChange={(e) => setFlightId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            id="flightId"
            type="text"
            placeholder="Enter your Flight ID"
          />
        </div>

        {/* New fields for No of Checked-In and Carry-On Luggage */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="noOfCheckIn"
          >
            Number of Checked-in Luggage
          </label>
          <input
            value={noOfCheckIn}
            onChange={(e) => setNoOfCheckIn(parseInt(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            id="noOfCheckIn"
            type="number"
            min="0"
            placeholder="Enter number of checked-in luggage"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="noOfCabin"
          >
            Number of Carry-On Luggage
          </label>
          <input
            value={noOfCabin}
            onChange={(e) => setNoOfCabin(parseInt(e.target.value) || 0)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            id="noOfCabin"
            type="number"
            min="0"
            placeholder="Enter number of carry-on luggage"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
