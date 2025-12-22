import React from "react";
import { Link } from "react-router-dom";
import { logo_black } from "../../assets";

/**
 * @author
 * @function SystemNav
 **/

export const SystemNav = ({ type }) => {
  return (
    <nav className="w-full bg-primary">
      <div className="flex items-center justify-between py-6 max-w-[1380px] mx-auto">
        {/* Logo and Categories */}
        <div className="flex items-center justify-between w-full px-4">
          <Link to={"/"}>
            <img src={logo_black} height={28} width={123} alt="Aleeha Logo" />
          </Link>
          <h2 className="text-lg font-semibold">{type}</h2>
        </div>
      </div>
      {/* Bottom Border */}
      <div className="border-b border-2 border-grey-300 w-full" />
    </nav>
  );
};
