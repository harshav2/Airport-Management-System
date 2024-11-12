"use client";

import { useState, useEffect } from "react";
import SystemOverview from "./overview";
import FlightManagement from "./flight";
import AirlineManagement from "./airline";
import PassengerManagement from "./passengers";
import StoreManagement from "./stores";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plane,
  Users,
  Briefcase,
  LogOut,
  Menu,
  Settings,
  BarChart,
  ShoppingBag,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

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
              <div className="p-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </div>
            </nav>
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
