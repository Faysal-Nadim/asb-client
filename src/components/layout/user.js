import React from "react";
import { Navbar } from "../shared/navbar";
import { Footer } from "../shared/footer";
import { UserProfileNavbar } from "../shared/userprofilenav";

const UserProfileLayout = ({ children }) => {
  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      {/* 1440 */}
      <Navbar />

      <div className="mx-auto max-w-[1380px] lg:px-2 md:px-4 sm:px-4 flex gap-6 items-start">
        <div className="lg:w-3/12 md:w-5/12 sm:w-0 lg:block md:block sm:hidden">
          <UserProfileNavbar />
        </div>
        <div className="lg:w-9/12 md:w-7/12 sm:w-full">{children}</div>
      </div>
      {/* 1440 */}
      <Footer />
    </div>
  );
};

export default UserProfileLayout;
