import React, { useEffect, useState } from "react";
import {
  couponsIcon,
  earningsIcon,
  messageIcon,
  notificationsIcon,
  settingsIcon,
  dashboardIcon,
  productsIcon,
  oordersIcon,
  reportsIcon,
  supportIcon,
} from "../../assets/SvgIcons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBasicShopDetails } from "../../redux/actions";

/**
 * @author
 * @function Sidebar
 **/

const sidebarOptions = [
  {
    type: "Admin Tools",
    isTitle: true,
    options: [
      {
        name: "Dashboard",
        link: "/my-shop/dashboard",
        icon: dashboardIcon,
      },
      {
        name: "Products",
        link: "/my-shop/products",
        icon: productsIcon,
      },
      {
        name: "Orders",
        link: "/my-shop/orders",
        icon: oordersIcon,
      },
      {
        name: "Reports",
        link: "/my-shop/reports",
        icon: reportsIcon,
      },

      {
        name: "Coupons",
        link: "/my-shop/coupons",
        icon: couponsIcon,
      },
      {
        name: "Earnings",
        link: "/my-shop/earnings",
        icon: earningsIcon,
      },
    ],
  },
  {
    type: "Others",
    isTitle: true,
    options: [
      {
        name: "Notifications",
        link: "/my-shop/notifications",
        icon: notificationsIcon,
      },
      {
        name: "Messages",
        link: "/my-shop/messages",
        icon: messageIcon,
      },
      {
        name: "Seller Support",
        link: "/my-shop/support",
        icon: supportIcon,
      },
      {
        name: "Settings",
        link: "/my-shop/settings",
        icon: settingsIcon,
      },
    ],
  },
];

export const Sidebar = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const { shopDetails } = useSelector((state) => state.shop);

  const getCountryName = (code) => {
    if (!code) return null;
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code);
  };

  useEffect(() => {
    dispatch(getBasicShopDetails());
  }, [dispatch]);

  return (
    <>
      {/* Mobile top bar with menu button */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-40 mt-2">
        <h1 className="font-semibold text-lg">
          {shopDetails?.name || "My Shop"}
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
          fixed inset-y-0 left-0 z-50 lg:w-full md:w-64 sm:w-64 bg-white border-r shadow-sm
          transform transition-transform duration-200 ease-in-out
          md:translate-x-0 md:relative md:shadow-none lg:rounded-lg
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col my-4">
          {/* Logo / header */}
          <div className="px-4 py-4 md:flex md:items-center gap-3 border-b hidden md:block">
            <img
              src="https://aleeha-test.s3.ap-southeast-1.amazonaws.com/rr-2.png"
              alt="Retro Revive Logo"
              className="rounded-full w-12 h-12 object-contain border"
            />
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                {shopDetails?.name || "My Shop"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {getCountryName(shopDetails?.shopCountry) || "Location"}
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {sidebarOptions.map((section) => (
              <div key={section.type}>
                {section.isTitle && (
                  <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    {section.type}
                  </p>
                )}

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
