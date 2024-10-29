'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plane, Calendar, Ticket, Map, Bell, LogOut } from 'lucide-react'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('status')

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">AirportMS</span>
          </Link>
        </div>
        <nav className="mt-8">
          <a
            href="#"
            className={`flex items-center space-x-2 px-4 py-2 ${
              activeTab === 'status' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('status')}
          >
            <Plane className="h-5 w-5" />
            <span>Flight Status</span>
          </a>
          <a
            href="#"
            className={`flex items-center space-x-2 px-4 py-2 ${
              activeTab === 'tickets' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('tickets')}
          >
            <Ticket className="h-5 w-5" />
            <span>Ticket Details</span>
          </a>
          <a
            href="#"
            className={`flex items-center space-x-2 px-4 py-2 ${
              activeTab === 'info' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('info')}
          >
            <Calendar className="h-5 w-5" />
            <span>Flight & Airport Info</span>
          </a>
          <a
            href="#"
            className={`flex items-center space-x-2 px-4 py-2 ${
              activeTab === 'map' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('map')}
          >
            <Map className="h-5 w-5" />
            <span>Airport Map</span>
          </a>
          <a
            href="#"
            className={`flex items-center space-x-2 px-4 py-2 ${
              activeTab === 'checkin' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('checkin')}
          >
            <Calendar className="h-5 w-5" />
            <span>Check-in</span>
          </a>
          <a
            href="#"
            className={`flex items-center space-x-2 px-4 py-2 ${
              activeTab === 'alerts' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('alerts')}
          >
            <Bell className="h-5 w-5" />
            <span>Flight Alerts</span>
          </a>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Welcome, User</h1>
        {renderContent()}
      </main>
    </div>
  )
}

function FlightStatus() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flight Status Board</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Flight
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Destination
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              AA1234
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              New York (JFK)
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              10:00 AM
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                On Time
              </span>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  )
}

function TicketDetails() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Passenger Information
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                John Doe
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Flight number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                AA1234
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Departure</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                New York (JFK) - 10:00 AM
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Arrival</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Los Angeles (LAX) - 1:00 PM
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Seat</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                14A
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

function FlightAndAirportInfo() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flight and Airport Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Flight Information</h3>
          <p><strong>Flight:</strong> AA1234</p>
          <p><strong>Departure:</strong> New York (JFK) at 10:00 AM</p>
          <p><strong>Arrival:</strong> Los Angeles (LAX) at 1:00 PM</p>
          <p><strong>Duration:</strong> 6 hours</p>
          <p><strong>Aircraft:</strong> Boeing 787 Dreamliner</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Airport Information</h3>
          <p><strong>Airport:</strong> John F. Kennedy International Airport (JFK)</p>
          <p><strong>Location:</strong> Queens, New York, USA</p>
          <p><strong>Terminal:</strong> Terminal 8</p>
          <p><strong>Services:</strong> Restaurants, Duty-free shops, Lounges</p>
          <p><strong>Transportation:</strong> Taxi, Bus, Train (AirTrain JFK)</p>
        </div>
      </div>
    </div>
  )
}

function AirportMap() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Airport Map</h2>
      <div className="bg-gray-200 p-4 text-center">
        {/* Replace this with an actual map component or image */}
        <p>Airport map placeholder</p>
        <p>In a real application, you would integrate an interactive map here.</p>
      </div>
    </div>
  )
}

function CheckIn() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Check-in</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flightNumber">
            Flight Number
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="flightNumber" type="text" placeholder="AA1234" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Doe" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Check In
          </button>
        </div>
      </form>
    </div>
  )
}

function FlightAlerts() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flight Alerts</h2>
      <div className="space-y-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Flight Delay</p>
          <p>Flight AA1234 to Los Angeles (LAX) is delayed by 30 minutes. New departure time: 10:30 AM.</p>
        </div>
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
          <p className="font-bold">Gate Change</p>
          <p>Flight BB5678 to Chicago (ORD) has changed gates. New gate: B22.</p>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">On Time</p>
          <p>Flight CC9012 to Miami (MIA) is on time. Departure at 2:15 PM from gate C14.</p>
        </div>
      </div>
    </div>
  )
}