import React from "react";
import {
  cartIcon,
  searchIcon,
  shopIcon,
  trippleBarIcon,
  userIcon,
  wishListIcon,
} from "../../assets/SvgIcons";
import { Link } from "react-router-dom";
import { logo_black } from "../../assets";

const navIcons = [
  { icon: wishListIcon, link: "/wishlist", title: "Wishlist" },
  { icon: shopIcon, link: "/shop", title: "Shop Manager" },
  { icon: userIcon, link: "/profile", title: "Your Account" },
  { icon: cartIcon, link: "/cart", title: "Cart" },
];

/**
 * @author
 * @function Navbar
 **/

export const Navbar = (props) => {
  return (
    <nav className="w-full bg-primary">
      <div className="flex items-center justify-between py-3 max-w-[1380px] mx-auto">
        {/* Logo and Categories */}
        <div className="flex items-center">
          <Link to={"/"}>
            <img src={logo_black} height={28} width={123} alt="Aleeha Logo" />
          </Link>
          <div className="flex items-center gap-1 ml-6 hover:cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-full ">
            {trippleBarIcon}{" "}
            <p className="text-[14px] font-semibold text-black">Categories</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-1/2">
          <div class="flex items-center border border-2 border-[#222222] rounded-full w-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for anything"
              class="flex-grow px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button class="bg-[#2F5651] transform transition-transform duration-200 hover:scale-110 p-2 rounded-full mr-1">
              {searchIcon}
            </button>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-2">
          {navIcons.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              title={item.title}
              className="mx-2 hover:bg-gray-200 px-2 py-2 rounded-full"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
      {/* Bottom Border */}
      <div className="border-b border-2 border-grey-300 w-full" />
    </nav>
  );
};
