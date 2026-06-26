// components/layout/shopmanager.js
import React from "react";
import { Navbar } from "../shared/navbar";
import { Sidebar } from "../usermanager/sidebar";
import { Footer } from "../shared/footer";

export const UserLayout = (props) => {
  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-[1380px] lg:px-2 md:px-4 sm:px-4 flex flex-col md:flex-row lg:gap-6 sm:gap-4 items-start">
        {/* Sidebar: visible on all screens, layout changes with breakpoints */}
        <div className=" w-full md:w-5/12 lg:w-2/12 lg:sticky top-2 self-start">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="w-full md:w-7/12 lg:w-10/12">{props.children}</div>
      </div>

      <Footer />
    </div>
  );
};
