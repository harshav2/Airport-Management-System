'use client'

import { useState } from 'react'
import Link from 'next/link'
<<<<<<< HEAD
import { Plane, Users, Calendar, Briefcase, LogOut } from 'lucide-react'

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState('department')

  const renderContent = () => {
    switch (activeTab) {
      case 'department':
        return <DepartmentInfo />
=======
import { Plane, Users, Calendar, Briefcase, LogOut, Menu } from 'lucide-react'

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState('flights')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const renderContent = () => {
    switch (activeTab) {
      case 'flights':
        return <FlightSchedule />
      case 'planes':
        return <PlanesInfo />
>>>>>>> 162e9a6 (initial backend work)
      case 'shifts':
        return <ShiftSchedule />
      case 'tasks':
        return <DepartmentTasks />
      default:
<<<<<<< HEAD
        return <DepartmentInfo />
=======
        return <FlightSchedule />
>>>>>>> 162e9a6 (initial backend work)
    }
  }

  return (
<<<<<<< HEAD
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
              activeTab === 'department' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('department')}
          >
            <Briefcase className="h-5 w-5" />
            <span>Department Info</span>
          </a>
          <a
            href="#"
            className={`flex items-center space-x-2 px-4 py-2 ${
              activeTab === 'shifts' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('shifts')}
          >
            <Calendar className="h-5 w-5" />
            <span>Shift Schedule</span>
          </a>
          <a
            href="#"
            className={`flex items-center space-x-2 px-4 py-2 ${
              activeTab === 'tasks' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            <Users className="h-5 w-5" />
            <span>Department Tasks</span>
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
        <h1 className="text-2xl font-semibold mb-6">Welcome, Staff Member</h1>
        {renderContent()}
      </main>
=======
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
                <span className="text-xl font-semibold text-gray-800">Airline Management</span>
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
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 w-64 h-full bg-white shadow-md transition-transform duration-300 ease-in-out`}>
          <div className="h-full flex flex-col justify-between">
            <nav className="mt-8">
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${activeTab === 'flights' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => {
                  setActiveTab('flights')
                  setIsSidebarOpen(false)
                }}
              >
                <Plane className="h-5 w-5" />
                <span>Flight Schedule</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${activeTab === 'planes' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => {
                  setActiveTab('planes')
                  setIsSidebarOpen(false)
                }}
              >
                <Briefcase className="h-5 w-5" />
                <span>Planes Info</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${activeTab === 'shifts' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => {
                  setActiveTab('shifts')
                  setIsSidebarOpen(false)
                }}
              >
                <Calendar className="h-5 w-5" />
                <span>Shift Schedule</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 px-4 py-2 ${activeTab === 'tasks' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => {
                  setActiveTab('tasks')
                  setIsSidebarOpen(false)
                }}
              >
                <Users className="h-5 w-5" />
                <span>Department Tasks</span>
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
          <h1 className="text-2xl font-semibold mb-6">Welcome, Airline Staff Member</h1>
          {renderContent()}
        </main>
      </div>

      <footer className="bg-white shadow-md mt-auto z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <p className="text-sm text-gray-500">© 2024 Airline Management System. All rights reserved.</p>
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
>>>>>>> 162e9a6 (initial backend work)
    </div>
  )
}

<<<<<<< HEAD
function DepartmentInfo() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Department Information</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p><strong>Department:</strong> Ground Operations</p>
        <p><strong>Manager:</strong> Jane Smith</p>
        <p><strong>Location:</strong> Terminal 2, Office 301</p>
        <p><strong>Contact:</strong> groundops@airport.com</p>
=======
function FlightSchedule() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flight Schedule</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Flight Number
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Departure Time
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                AAL123
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                New York (JFK)
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                10:00 AM
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                On Time
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PlanesInfo() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Planes Owned by the Airport</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Plane Model
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Registration Number
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                Boeing 737
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                N12345
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                180
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                In Service
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
>>>>>>> 162e9a6 (initial backend work)
      </div>
    </div>
  )
}

function ShiftSchedule() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Shift Schedule</h2>
<<<<<<< HEAD
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Shift
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              2023-05-01
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              Morning
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              6:00 AM - 2:00 PM
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
=======
      {/* Add shift schedule content here */}
>>>>>>> 162e9a6 (initial backend work)
    </div>
  )
}

function DepartmentTasks() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Department Tasks</h2>
<<<<<<< HEAD
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        <li>
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                Baggage Handling System Maintenance
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  In Progress
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  Team A
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <p>
                  Due by <time dateTime="2023-05-07">May 7, 2023</time>
                </p>
              </div>
            </div>
          </div>
        </li>
        {/* Add more list items for additional tasks */}
      </ul>
    </div>
  )
}
=======
      {/* Add department tasks content here */}
    </div>
  )
}
>>>>>>> 162e9a6 (initial backend work)
