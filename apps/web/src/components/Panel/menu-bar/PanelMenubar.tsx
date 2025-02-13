"use client"

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoadingContext } from "@/context/LoadingContext";

type Props = {
  children: React.ReactNode;
};

export default function PanelMenubar({ children }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("My Ticket");
  const loading = useContext(LoadingContext);

  const commonMenus = [
    { name: "My Ticket", path: "/panel/tickets" },
  ];

  const adminMenus = [
    { name: "Dashboard", path: "/panel/dashboards" },
    { name: "Voucher", path: "/panel/vouchers" },
    { name: "Event", path: "/panel/events" },
    { name: "Transaction", path: "/panel/transactions" },
    { name: "Banner", path: "/panel/banners" },
    { name: "FAQ", path: "/panel/faqs" },
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
      commonMenus.find((menu) => menu.path == pathname);

    // console.log(currentMenu);

    if (currentMenu) {
      setActiveMenu(currentMenu.name);
    }
  }, [pathname]);


  return (
    <div>
      {loading?.loading ? (
        <div className="absolute w-[100%] h-[100vh] backdrop-blur-sm bg-opacity-90 flex justify-center items-center  bg-[#f4f8fb] z-50">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}

      <div>
        {/* Sidebar */}
        <div
          className={`fixed pt-24 md:pt-10 top-0 left-0 h-screen bg-gray-800 text-white w-64 p-5 transition-transform transform overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:w-64`}
        >
          <h2 className="text-xl font-bold mb-4">LOGO</h2>
          <nav>
            <ul>
              <li className="text-sm">
                <Link href={"/"} className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded mb-3">
                  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                  </svg>
                  <span>Explore Event</span>
                </Link>
              </li>
              <li className="text-sm">
                <Link
                  href={"/panel/ticket"}
                  className={`flex items-center gap-2 ${pathname == '/panel/ticket' ? "bg-gray-700" : "hover:bg-gray-700"} p-2 rounded mb-3`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>My Ticket</span>
                </Link>
              </li>
            </ul>
            <h2 className="mt-5 mb-3 font-bold text">Admin Panel</h2>
            <ul>
              {adminMenus.map((menu) => (
                <li key={menu.path} className="mb-2 text-sm">
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
                <li key={menu.path} className="mb-2 text-sm">
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
            <Link href={"/ticket"} className="flex items-center gap-2 text-red-500 p-2 rounded my-3 text-sm">
              <span>Keluar</span>
            </Link>
          </nav>
        </div>

        {/* Topbar */}
        <div className={`flex flex-col flex-1 min-h-screen transition-all overflow-auto ${isOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
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
    </div>
  );
}
