"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function PanelMenubar({ children }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("My Ticket");

  const commonMenus = [
    { name: "My Ticket", path: "/panel/ticket" },
  ];

  const adminMenus = [
    { name: "Dashboard", path: "/panel/dashboard" },
    { name: "Voucher", path: "/panel/voucher" },
    { name: "Event", path: "/panel/event" },
    { name: "Transaction", path: "/panel/transaction" },
    { name: "Banner", path: "/panel/banner" },
    { name: "FAQ", path: "/panel/faq" },
    { name: "Contact Information", path: "/panel/contact-information" },
  ];

  const accountMenus = [
    { name: "Information", path: "/panel/information" },
    { name: "Password", path: "/panel/password" },
  ];

  useEffect(() => {
    const currentMenu =
      adminMenus.find((menu) => menu.path == pathname) ||
      accountMenus.find((menu) => menu.path == pathname) ||
      commonMenus.find((menu) => menu.path == pathname) ;

    // console.log(currentMenu);

    if (currentMenu) {
      setActiveMenu(currentMenu.name);
    }
  }, [pathname]);


  return (
    <div className="flex">
      {/* Sidebar (dominant) */}
      <div
        className={`fixed pt-24 md:pt-10 top-0 left-0 h-screen bg-gray-800 text-white w-64 p-5 transition-transform transform overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64`}
      >
        <h2 className="text-xl font-bold mb-4">LOGO</h2>
        <nav>
          <ul>
            <li>
              <Link href={"/"} className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded mb-3">
                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>
                <span>Explore Event</span>
              </Link>
              <Link
                href={"/panel/ticket"}
                className={`flex items-center gap-2 ${pathname == '/panel/ticket' ? "bg-gray-700" : "hover:bg-gray-700"} p-2 rounded mb-3`}
                onClick={() => setIsOpen(false)}
              >
                <span>My Ticket</span>
              </Link>
            </li>
          </ul>
          <h2 className="mt-5 mb-3 font-bold text-lg">Admin Panel</h2>
          <ul>
            {adminMenus.map((menu) => (
              <li key={menu.path} className="mb-2">
                <Link
                  href={menu.path}
                  className={`block p-2 rounded ${activeMenu == menu.name ? "bg-gray-700" : "hover:bg-gray-700"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-5 mb-3 font-bold text-lg">Manage Account</h2>
          <ul>
            {accountMenus.map((menu) => (
              <li key={menu.path} className="mb-2">
                <Link
                  href={menu.path}
                  className={`block p-2 rounded ${activeMenu == menu.name ? "bg-gray-700" : "hover:bg-gray-700"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={"/ticket"} className="flex items-center gap-2 text-red-500 p-2 rounded my-3">
            <span>Keluar</span>
          </Link>
        </nav>
      </div>

      {/* Main Content with Topbar */}
      <div className={`flex flex-col flex-1 min-h-screen transition-all ${isOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
        {/* Topbar */}
        <div className="fixed md:left-64 top-0 left-0 flex items-center justify-between bg-gray-900 text-white p-4" style={{ width: "-webkit-fill-available" }}>
          <button className="md:hidden p-2 rounded bg-gray-700" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          <h1 className="text-xl font-bold">{activeMenu}</h1>
          <button className="p-2 bg-gray-600 rounded">Profile</button>
        </div>

        {/* Page Content */}
        <div className="p-10 pt-24 ">
          {children}
        </div>
      </div>
    </div>
  );
}
