'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plane, Bell, User, Menu } from 'lucide-react'
import Sidebar from '../../components/sidebar'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('status')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const renderContent = () => {
    switch (activeTab) {
      case 'status':
        return <FlightStatus />
      case 'tickets':
        return <TicketDetails />
      case 'info':
        return <FlightAndAirportInfo />
      case 'map':
        return <AirportMap />
      case 'checkin':
        return <CheckIn />
      case 'alerts':
        return <FlightAlerts />
      default:
        return <FlightStatus />
    }
  }

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
                <span className="text-xl font-semibold text-gray-800">AirportMS</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link className="text-sm font-medium hover:text-blue-600" href="#">
                About
              </Link>
              <Link className="text-sm font-medium hover:text-blue-600" href="#">
                Services
              </Link>
              <Link className="text-sm font-medium hover:text-blue-600" href="#">
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
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <h1 className="text-2xl font-semibold mb-6">Welcome, User</h1>
          {renderContent()}
        </main>
      </div>

      <footer className="bg-white shadow-md mt-auto z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <p className="text-sm text-gray-500">© 2024 Airport Management System. All rights reserved.</p>
            <nav className="flex space-x-4">
              <Link className="text-sm text-gray-500 hover:text-gray-700" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm text-gray-500 hover:text-gray-700" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FlightStatus() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Flight Status Board</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Flight
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                AA1234
              </td>
              <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                New York (JFK)
              </td>
              <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                10:00 AM
              </td>
              <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  On Time
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TicketDetails() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <p className="mt-1 text-sm text-gray-900">John Doe</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Flight number</label>
            <p className="mt-1 text-sm text-gray-900">AA1234</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Seat</label>
            <p className="mt-1 text-sm text-gray-900">14A</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Departure</label>
            <p className="mt-1 text-sm text-gray-900">New York (JFK) - 10:00 AM</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Arrival</label>
            <p className="mt-1 text-sm text-gray-900">Los Angeles (LAX) - 1:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlightAndAirportInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Flight Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Flight:</strong> AA1234</p>
            <p><strong>Departure:</strong> New York (JFK) at 10:00 AM</p>
            <p><strong>Arrival:</strong> Los Angeles (LAX) at 1:00 PM</p>
          </div>
          <div>
            <p><strong>Duration:</strong> 6 hours</p>
            <p><strong>Aircraft:</strong> Boeing 787 Dreamliner</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Airport Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Airport:</strong> John F. Kennedy International Airport (JFK)</p>
            <p><strong>Location:</strong> Queens, New York, USA</p>
            <p><strong>Terminal:</strong> Terminal 8</p>
          </div>
          <div>
            <p><strong>Services:</strong> Restaurants, Duty-free shops, Lounges</p>
            <p><strong>Transportation:</strong> Taxi, Bus, Train (AirTrain JFK)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AirportMap() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Airport Map</h2>
      <div className="bg-gray-200 p-4 text-center rounded-lg">
        <p>Airport map placeholder</p>
        <p>In a real application, you would integrate an interactive map here.</p>
      </div>
    </div>
  )
}

function CheckIn() {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Check-in</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="flightNumber">
            Flight Number
          </label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="flightNumber"
            type="text"
            placeholder="AA1234"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="lastName"
            type="text"
            placeholder="Doe"
          />
        </div>
        <div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Check In
          </button>
        </div>
      </form>
    </div>
  )
}

function FlightAlerts() {
  return (
    <div className="space-y-4">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg" role="alert">
        <p className="font-bold">Flight Delay</p>
        <p>Flight AA1234 to Los Angeles (LAX) is delayed by 30 minutes. New departure time: 10:30 AM.</p>
      </div>
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg" role="alert">
        <p className="font-bold">Gate Change</p>
        <p>Flight BB5678 to Chicago (ORD) has changed gates. New gate: B22.</p>
      </div>
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg" role="alert">
        <p className="font-bold">On Time</p>
        <p>Flight CC9012 to Miami (MIA) is on time. Departure at 2:15 PM from gate C14.</p>
      </div>
    </div>
  )
}