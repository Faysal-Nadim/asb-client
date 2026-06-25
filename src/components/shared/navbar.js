import React, { useState } from "react";
import {
  cartIcon,
  searchIcon,
  userIcon,
  wishListIcon,
} from "../../assets/SvgIcons";
import { Link } from "react-router-dom";
import { asb_logo_svg } from "../../assets";
import MegaMenu from "./megamenu";
import MinimalDropdown from "./profiledropdown";
import MobileMegaMenu from "./mobilemenu";

/**
 * @author
 * @function Navbar
 **/

export const Navbar = (props) => {
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  const navIcons = [
    { icon: wishListIcon, link: "/wishlist", title: "Wishlist" },
    { icon: cartIcon, link: "/cart", title: "Cart" },
    { icon: userIcon, link: "", title: "Your Account" },
  ];
  return (
    <>
      <nav className="w-full bg-primary lg:block sm:hidden">
        <div className="flex items-center justify-between py-2 max-w-[1380px] mx-auto">
          {/* Logo and Categories */}
          <div className="flex items-center">
            <Link to={"/"}>
              <img
                src={asb_logo_svg}
                // height={28}
                width={100}
                alt="Ali Store BD Logo"
              />
            </Link>
            <MegaMenu />
          </div>

          {/* Search Bar */}
          <div className="flex items-center w-1/2">
            <div className="flex items-center border border-2 border-[#222222] rounded-full w-full overflow-hidden">
              <input
                type="text"
                placeholder="Search for anything"
                className="flex-grow px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button className="bg-[#2F5651] transform transition-transform duration-200 hover:scale-110 p-2 rounded-full mr-1">
                {searchIcon}
              </button>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center">
            {navIcons.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.link ? (
                    <Link
                      to={item.link}
                      title={item.title}
                      className="mx-2 hover:bg-gray-200 px-2 py-2 rounded-full"
                    >
                      {item.icon}
                    </Link>
                  ) : (
                    <MinimalDropdown />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {/* Bottom Border */}
        <div className="border-b border-2 border-grey-300 w-full" />
      </nav>

      <nav className="bg-white border-b lg:hidden sm:block">
        {/* TOP BAR */}
        <div className="flex items-center gap-3 px-4  md:max-w-[1380px] md:mx-auto">
          {/* Logo */}
          <Link to="/" className="mr-auto md:mr-0 py-2">
            <img src={asb_logo_svg} width={100} alt="Ali Store BD Logo" />
          </Link>

          {/* Icons */}
          <div className="flex items-center">
            {navIcons.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.link ? (
                    <Link
                      to={item.link}
                      title={item.title}
                      className="hover:bg-gray-200 p-2 rounded-full"
                    >
                      {item.icon}
                    </Link>
                  ) : item.onClick ? (
                    <button
                      type="button"
                      onClick={item.onClick}
                      title={item.title}
                      className="mx-2 hover:bg-gray-200 px-2 py-2 rounded-full"
                    >
                      {item.icon}
                    </button>
                  ) : (
                    <MinimalDropdown />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden flex items-center gap-3 px-4 pb-3 w-full">
          {/* Hamburger */}
          <button
            onClick={() => setMobileCatOpen(true)}
            className="text-xl flex-shrink-0"
          >
            ☰
          </button>

          {/* Search bar */}
          <div className="flex items-center border rounded-full px-3 flex-1">
            <input
              className="flex-1 py-2 outline-none bg-transparent"
              placeholder="Search for anything"
            />
            {searchIcon}
          </div>
        </div>

        {/* Mobile Bottom Sheet Categories */}
        <MobileMegaMenu
          mobile={true}
          open={mobileCatOpen}
          onClose={() => setMobileCatOpen(false)}
        />
      </nav>
    </>
  );
};
