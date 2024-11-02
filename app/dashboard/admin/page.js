"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plane,
  Users,
  Calendar,
  Briefcase,
  LogOut,
  Menu,
  Settings,
  BarChart,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <SystemOverview />;
      case "flights":
        return <FlightManagement />;
      case "passengers":
        return <PassengerManagement />;
      case "airlines":
        return <AirlineManagement />;
      case "stores":
        return <StoreManagement />;
      case "analytics":
        return <SystemAnalytics />;
      case "settings":
        return <SystemSettings />;
      default:
        return <SystemOverview />;
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
                <Plane className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-semibold text-gray-800">
                  AirportMS Admin
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link
                className="text-sm font-medium hover:text-blue-600"
                href="#"
              >
                Help
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-600"
                href="#"
              >
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative z-40 w-64 h-full bg-white shadow-md transition-transform duration-300 ease-in-out`}
        >
          <div className="h-full flex flex-col justify-between">
            <nav className="mt-8">
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("overview");
                  setIsSidebarOpen(false);
                }}
              >
                <BarChart className="h-5 w-5" />
                <span>System Overview</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "flights"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("flights");
                  setIsSidebarOpen(false);
                }}
              >
                <Plane className="h-5 w-5" />
                <span>Flight Management</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "passengers"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("passengers");
                  setIsSidebarOpen(false);
                }}
              >
                <Users className="h-5 w-5" />
                <span>Passenger Management</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "airlines"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("airlines");
                  setIsSidebarOpen(false);
                }}
              >
                <Briefcase className="h-5 w-5" />
                <span>Airline Management</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "stores"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("stores");
                  setIsSidebarOpen(false);
                }}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Store Management</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "analytics"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("analytics");
                  setIsSidebarOpen(false);
                }}
              >
                <BarChart className="h-5 w-5" />
                <span>System Analytics</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "settings"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("settings");
                  setIsSidebarOpen(false);
                }}
              >
                <Settings className="h-5 w-5" />
                <span>System Settings</span>
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

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <h1 className="text-2xl font-semibold mb-6">Welcome, Admin</h1>
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

function SystemOverview() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">System Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Total Flights Today</h3>
          <p className="text-2xl">127</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Active Passengers</h3>
          <p className="text-2xl">1,542</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Total Airlines</h3>
          <p className="text-2xl">25</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">System Health</h3>
          <p className="text-2xl text-green-500">Good</p>
        </div>
      </div>
    </div>
  );
}

function FlightManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flight Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Flight ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gate
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold  text-gray-600 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Airline
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                FL001
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                A1
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                New York (JFK)
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                London (LHR)
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                British Airways
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button className="text-blue-600 hover:text-blue-800">
                  Edit
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PassengerManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Passenger Management</h2>
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
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                P001
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                John Doe
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                john_doe
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                User
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AirlineManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Airline Management</h2>
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                AL001
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                British Airways
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StoreManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Store Management</h2>
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
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                S001
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                1
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                Terminal A
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SystemAnalytics() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">System Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">
            Passenger Traffic (Last 7 Days)
          </h3>
          {/* Placeholder for chart */}
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Store Sales Performance</h3>
          {/* Placeholder for chart */}
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemSettings() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">System Settings</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">General Settings</h3>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="airport-name"
              className="block text-sm font-medium text-gray-700"
            >
              Airport Name
            </label>
            <input
              type="text"
              id="airport-name"
              name="airport-name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter airport name"
            />
          </div>
          <div>
            <label
              htmlFor="timezone"
              className="block text-sm font-medium text-gray-700"
            >
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
              {/* Add more timezone options */}
            </select>
          </div>
          <div>
            <label htmlFor="maintenance-mode" className="flex items-center">
              <input
                type="checkbox"
                id="maintenance-mode"
                name="maintenance-mode"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">
                Enable Maintenance Mode
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
