import React, { useState } from "react";
import {
  couponsIcon,
  earningsIcon,
  messageIcon,
  notificationsIcon,
  settingsIcon,
  dashboardIcon,
  ordersIcon,
  reportsIcon,
  supportIcon,
  shippingIcon,
} from "../../assets/SvgIcons";
import { NavLink } from "react-router-dom";
import { CDN } from "../../redux/helpers/urlConfig";
import { useSelector } from "react-redux";

/**
 * @author
 * @function Sidebar
 **/

const sidebarOptions = [
  {
    type: "User Tools",
    isTitle: true,
    options: [
      {
        name: "Dashboard",
        link: "/user/dashboard",
        icon: dashboardIcon,
      },
      {
        name: "Orders",
        link: "/user/orders",
        icon: ordersIcon,
      },
      {
        name: "Shipments",
        link: "/user/shipments",
        icon: shippingIcon,
      },
      {
        name: "Product Requests",
        link: "/user/requests",
        icon: reportsIcon,
      },

      {
        name: "Wishlist",
        link: "/user/wishlist",
        icon: couponsIcon,
      },
      {
        name: "Notifications",
        link: "/user/notifications",
        icon: notificationsIcon,
      },
      {
        name: "Messages",
        link: "/user/messages",
        icon: messageIcon,
      },
      {
        name: "My Wallet",
        link: "/user/wallet",
        icon: earningsIcon,
      },
      {
        name: "Account Settings",
        link: "/user/account",
        icon: settingsIcon,
      },
      {
        name: "Support Center",
        link: "/user/support",
        icon: supportIcon,
      },
    ],
  },
];

export const Sidebar = () => {
  const auth = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const getCountryName = (code) => {
    if (!code) return null;
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code);
  };

  return (
    <>
      {/* Mobile top bar with menu button */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-40 mt-2">
        <h1 className="font-semibold text-lg">
          {auth?.user?.name || "My Shop"}
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md border hover:bg-gray-100"
        >
          {/* Simple hamburger icon */}
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-gray-800" />
            <span className="block w-5 h-0.5 bg-gray-800" />
            <span className="block w-5 h-0.5 bg-gray-800" />
          </div>
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 h-full lg:w-full md:w-64 sm:w-64 bg-white border-r shadow-sm
          transform transition-transform duration-200 ease-in-out
          md:translate-x-0 md:relative md:shadow-none lg:rounded-lg
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col my-4">
          {/* Logo / header */}
          <div className="px-4 py-4 md:flex flex-col md:items-center gap-3 border-b hidden md:block">
            <img
              src={
                auth?.user?.avatar?.path
                  ? `${CDN}${auth.user.avatar.path}`
                  : "https://placehold.co/200x200"
              }
              alt="Shop Logo"
              className="rounded-full w-16 h-16 object-contain border"
            />
            <div className="flex flex-col items-start md:items-center">
              <h2 className="text-xl font-semibold tracking-tight">
                {auth?.user?.name || "User Name"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {getCountryName(auth?.user?.country) || "Bangladesh"}
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {sidebarOptions.map((section) => (
              <div key={section.type}>
                <ul className="space-y-1">
                  {section.options.map((item) => (
                    <li key={item.link}>
                      <NavLink
                        to={item.link}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-[#2F5651] text-white shadow-sm"
                              : "text-gray-700 hover:bg-gray-100"
                          }`
                        }
                        onClick={handleClose}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};
