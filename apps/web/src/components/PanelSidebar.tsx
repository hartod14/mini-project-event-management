"use client"

import { useState } from "react";
import Link from "next/link";

export default function PanelSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="flex h-screen">
      {/* Sidebar (dominant) */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-5 transition-transform transform  ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:w-64`}
      >
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/" className="block p-2 hover:bg-gray-700 rounded" onClick={() => setActiveMenu("Home")}>
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/about" className="block p-2 hover:bg-gray-700 rounded" onClick={() => setActiveMenu("About")}>
                About
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/contact" className="block p-2 hover:bg-gray-700 rounded" onClick={() => setActiveMenu("Contact")}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content with Topbar */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <div className="w-100 top-0 left-0 flex items-center justify-between bg-gray-900 text-white p-4">
          <button
            className="md:hidden p-2 rounded bg-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">{activeMenu}</h1>
          <button className="p-2 bg-gray-700 rounded">Profile</button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">{activeMenu} Page</h1>
        </div>
      </div>
    </div>
  );
}
