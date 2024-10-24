import Link from "next/link";
import { Plane } from "lucide-react";

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white border-b border-gray-200 shadow-sm fixed top-0 w-full z-10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link className="flex items-center justify-center" href="/">
          <Plane className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">AirportMS</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex ml-auto space-x-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/services"
          >
            Services
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Open Menu"
        >
          {/* Menu icon */}
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
