"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FlightManagement from "./flight";
import PassengerManagement from "./passengers";
import CheckInDetails from "./checkin";
import {
  Plane,
  Users,
  Briefcase,
  LogOut,
  Menu,
  BarChart,
  ClipboardList,
  Bell,
  User,
} from "lucide-react";

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <FlightOverview />;
      case "passengerList":
        return <PassengerList />;
      case "checkInStats":
        return <CheckInStatistics />;
      case "announcements":
        return <Announcements />;
      default:
        return <FlightOverview />;
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
                <Plane className="h-8 w-8 text-red-500" />
                <span className="text-xl font-semibold text-gray-800">
                  AirlineMS
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link className="text-sm font-medium hover:text-red-600" href="#">
                Dashboard
              </Link>
              <Link className="text-sm font-medium hover:text-red-600" href="#">
                Operations
              </Link>
              <Link className="text-sm font-medium hover:text-red-600" href="#">
                Support
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
                  activeTab === "overview"
                    ? "bg-red-100 text-red-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("overview");
                  setIsSidebarOpen(false);
                }}
              >
                <BarChart className="h-5 w-5" />
                <span>Flight Overview</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "passengerList"
                    ? "bg-red-100 text-red-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("passengerList");
                  setIsSidebarOpen(false);
                }}
              >
                <Users className="h-5 w-5" />
                <span>Passenger List</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "checkInStats"
                    ? "bg-red-100 text-red-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("checkInStats");
                  setIsSidebarOpen(false);
                }}
              >
                <ClipboardList className="h-5 w-5" />
                <span>Check-In Statistics</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "announcements"
                    ? "bg-red-100 text-red-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("announcements");
                  setIsSidebarOpen(false);
                }}
              >
                <Briefcase className="h-5 w-5" />
                <span>Announcements</span>
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
          <h1 className="text-2xl font-semibold mb-6">Welcome, Staff Member</h1>
          {renderContent()}
        </main>
      </div>

      <footer className="bg-white shadow-md mt-auto z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <p className="text-sm text-gray-500">
              © 2024 Airline Management System. All rights reserved.
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

function FlightOverview() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Flight Overview</h2>
      <FlightManagement />
    </div>
  );
}

function PassengerList() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Passenger List</h2>
      <p>
        List of passengers would be shown here, potentially with filters and
        search options.
      </p>
      <PassengerManagement />
    </div>
  );
}

function CheckInStatistics() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Check-In Statistics</h2>
      <p>Check-in data and graphs can be displayed in this section.</p>
      <CheckInDetails />
    </div>
  );
}

function Announcements() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <p>Announcements and recent updates relevant to the airline staff.</p>
    </div>
  );
}
