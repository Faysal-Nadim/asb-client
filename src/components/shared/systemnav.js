import React from "react";
import { Link } from "react-router-dom";
import { asb_logo_svg } from "../../assets";

/**
 * @author
 * @function SystemNav
 **/

export const SystemNav = ({ type }) => {
  return (
    <nav className="w-full bg-primary">
      <div className="flex items-center justify-between py-2 max-w-[1380px] mx-auto">
        {/* Logo and Categories */}
        <div className="flex items-center justify-between lg:px-0 md:px-4 sm:px-4 w-full">
          <Link to={"/"}>
            <img src={asb_logo_svg} width={100} alt="Ali Store BD Logo" />
          </Link>
          <h2 className="text-lg font-semibold">{type}</h2>
        </div>
      </div>
      {/* Bottom Border */}
      <div className="border-b border-2 border-grey-300 w-full" />
    </nav>
  );
};
