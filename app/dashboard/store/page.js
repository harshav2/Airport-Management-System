"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InventoryManagement from "./inventory";
import DashboardOverview from "./overview";
import {
  ShoppingBag,
  Users,
  Package,
  LogOut,
  Menu,
  BarChart,
  DollarSign,
  Truck,
  Tag,
} from "lucide-react";

const SalesManagement = ({ storeID }) => (
  <div>Sales Management for Store ID: {storeID}</div>
);

const CustomerManagement = ({ storeID }) => (
  <div>Customer Management for Store ID: {storeID}</div>
);
const SupplierManagement = ({ storeID }) => (
  <div>Supplier Management for Store ID: {storeID}</div>
);
const Promotions = ({ storeID }) => (
  <div>Promotions for Store ID: {storeID}</div>
);

export default function StoreDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [storeID, setStoreID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreID = async () => {
      try {
        const response = await fetch("/api/store/main");
        if (!response.ok) {
          throw new Error("Failed to fetch store ID");
        }
        const data = await response.json();
        setStoreID(data[0].StoreID);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchStoreID();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    switch (activeTab) {
      case "overview":
        return <DashboardOverview storeID={storeID} />;
      case "sales":
        return <SalesManagement storeID={storeID} />;
      case "inventory":
        return <InventoryManagement storeID={storeID} />;
      case "customers":
        return <CustomerManagement storeID={storeID} />;
      case "suppliers":
        return <SupplierManagement storeID={storeID} />;
      case "promotions":
        return <Promotions storeID={storeID} />;
      default:
        return <DashboardOverview storeID={storeID} />;
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
                <ShoppingBag className="h-8 w-8 text-yellow-500" />
                <span className="text-xl font-semibold text-gray-800">
                  StoreMS Admin
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
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("overview");
                  setIsSidebarOpen(false);
                }}
              >
                <BarChart className="h-5 w-5" />
                <span>Dashboard Overview</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "sales"
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("sales");
                  setIsSidebarOpen(false);
                }}
              >
                <DollarSign className="h-5 w-5" />
                <span>Sales Management</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "inventory"
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("inventory");
                  setIsSidebarOpen(false);
                }}
              >
                <Package className="h-5 w-5" />
                <span>Inventory Management</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "customers"
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("customers");
                  setIsSidebarOpen(false);
                }}
              >
                <Users className="h-5 w-5" />
                <span>Customer Management</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "suppliers"
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("suppliers");
                  setIsSidebarOpen(false);
                }}
              >
                <Truck className="h-5 w-5" />
                <span>Supplier Management</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  activeTab === "promotions"
                    ? "bg-yellow-100 text-yellow-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("promotions");
                  setIsSidebarOpen(false);
                }}
              >
                <Tag className="h-5 w-5" />
                <span>Promotions</span>
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
          <h1 className="text-2xl font-semibold mb-6">Welcome, Store Admin</h1>
          {renderContent()}
        </main>
      </div>

      <footer className="bg-white shadow-md mt-auto z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <p className="text-sm text-gray-500">
              © 2024 Store Management System. All rights reserved.
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
