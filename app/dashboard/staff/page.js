'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plane, Users, Calendar, Briefcase, LogOut } from 'lucide-react'

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState('department')

  const renderContent = () => {
    switch (activeTab) {
      case 'department':
        return <DepartmentInfo />
      case 'shifts':
        return <ShiftSchedule />
      case 'tasks':
        return <DepartmentTasks />
      default:
        return <DepartmentInfo />
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
    </div>
  )
}

function DepartmentInfo() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Department Information</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p><strong>Department:</strong> Ground Operations</p>
        <p><strong>Manager:</strong> Jane Smith</p>
        <p><strong>Location:</strong> Terminal 2, Office 301</p>
        <p><strong>Contact:</strong> groundops@airport.com</p>
      </div>
    </div>
  )
}

function ShiftSchedule() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Shift Schedule</h2>
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
    </div>
  )
}

function DepartmentTasks() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Department Tasks</h2>
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