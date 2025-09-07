import React from "react";
import {
  addressIconGray,
  orderIconGray,
  paymentIconGray,
  securityIconGray,
  userIconGray,
} from "../../assets/SvgIcons";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @author
 * @function UserProfileNavbar
 **/

const navItems = [
  { name: "Account Details", link: "/user/account", icon: userIconGray },
  { name: "Orders", link: "/user/orders", icon: orderIconGray },
  { name: "Addresses", link: "/user/addresses", icon: addressIconGray },
  { name: "Payment Methods", link: "/user/payments", icon: paymentIconGray },
  { name: "Security", link: "/user/security", icon: securityIconGray },
];

export const UserProfileNavbar = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="mx-auto py-8 w-full">
      <div className="rounded-2xl bg-[#fff] p-6 w-full flex flex-col items-center justify-center mb-6 ">
        <img
          src="https://placehold.co/200x200"
          className="h-24 w-24 rounded-full"
          alt="User Avatar"
        />
        <h2 className="text-lg font-semibold mt-2">Faysal Jamil Nadim</h2>
        <p className="text-gray-600 text-sm">faysal.jamil@aleeha.co.uk</p>
      </div>

      <div className="rounded-2xl bg-[#fff] w-full flex flex-col mb-6">
        <ul className="text-gray-800 text-[15px] w-full">
          {navItems.map((item, i) => (
            <>
              <li
                onClick={() => navigate(item.link)}
                key={item.name}
                className="flex items-center space-x-2 px-4 py-4 cursor-pointer"
              >
                {item.icon}
                <p
                  className={`font-bold ${
                    pathname === item.link ? "text-[#669C97]" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </p>
              </li>
              {i !== navItems.length - 1 && (
                <div className="flex-grow h-[1px] bg-gray-300" />
              )}
            </>
          ))}
        </ul>
      </div>
    </nav>
  );
};
