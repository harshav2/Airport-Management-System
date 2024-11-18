"use client";

import Link from "next/link";
import { Plane, Users, ShoppingBag } from "lucide-react";
import Navbar from "/app/components/navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <Navbar />
      <main className="flex-1 w-full">
        <section className="flex items-center w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 min-h-screen">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Airport Management System
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your airport operations with our comprehensive
                  management solution.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  Get Started
                </Link>
                <Link
                  href="/"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Services
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Staff Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Efficiently manage airport staff and operations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Plane className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Flight Operations</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Monitor and control flight schedules and operations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <ShoppingBag className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Duty-Free Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Optimize duty-free shop operations and inventory.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
