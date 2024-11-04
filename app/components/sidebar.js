"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, Calendar, Ticket, Map, Bell, LogOut } from "lucide-react";

export default function Sidebar({ setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <button
        className="absolute top-4 left-4 lg:hidden z-50 p-2 bg-blue-500 text-white rounded-md"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 absolute lg:relative z-40 w-64 h-min-full bg-white shadow-md transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <nav className="mt-8">
              <a
                href="#"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("status");
                  setIsSidebarOpen(false);
                }}
              >
                <Plane className="h-5 w-5" />
                <span>Flight Status</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("tickets");
                  setIsSidebarOpen(false);
                }}
              >
                <Ticket className="h-5 w-5" />
                <span>Ticket Details</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("info");
                  setIsSidebarOpen(false);
                }}
              >
                <Calendar className="h-5 w-5" />
                <span>Flight & Airport Info</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("map");
                  setIsSidebarOpen(false);
                }}
              >
                <Map className="h-5 w-5" />
                <span>Airport Map</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("checkin");
                  setIsSidebarOpen(false);
                }}
              >
                <Calendar className="h-5 w-5" />
                <span>Check-in</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("alerts");
                  setIsSidebarOpen(false);
                }}
              >
                <Bell className="h-5 w-5" />
                <span>Flight Alerts</span>
              </a>
            </nav>
          </div>
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
    </>
  );
}
