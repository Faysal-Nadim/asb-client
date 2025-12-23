import React from "react";
import { shopIconLarge, suspendedShopIcon } from "../../assets/SvgIcons";
import { useLocation, useNavigate } from "react-router-dom";
import { fb, ig, youtube } from "../../assets/svg";

/**
 * @author
 * @function OnboardStatus
 **/

export const OnboardStatus = (props) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { shopStatus, shop } = location.state || {};

  if (!shopStatus) {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-[1024px] mx-auto py-8 px-4 flex flex-col items-center justify-center gap-6 min-h-[90vh]">
      {shopStatus === "PENDING" && (
        <div className="lg:w-1/2 md:w-2/3 sm:w-full flex flex-col items-center justify-center gap-4  rounded-lg lg:p-8 sm:p-6 shadow-lg">
          <div className="mt-4">{shopIconLarge}</div>
          <p className="lg:text-xl underline md:text-lg sm:text-base text-center text-black font-semibold mt-2">
            {shop ? shop.name : "Your Shop"}
          </p>
          <p className="lg:text-xl md:text-lg sm:text-base text-center text-black font-semibold ">
            Your onboarding request is {shopStatus}.
          </p>
          <p className="lg:text-md md:text-sm sm:text-sm text-center text-justify text-gray-600">
            Thank you for submitting your onboarding information. Our team is
            currently reviewing your details. We appreciate your patience during
            this process and will notify you once your onboarding is complete.
          </p>
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p className="font-bold">Note:</p>
            <p>The review process may take up to 1-3 business days </p>
          </div>

          <div>
            <button
              onClick={() => navigate("/")}
              className="bg-white lg:text-md md:text-base sm:text-sm text-black px-4 py-2 rounded border border-black hover:bg-[#24443f] transition-colors duration-200 shadow-md hover:text-white"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {shopStatus === "REJECTED" && (
        <div className="lg:w-1/2 md:w-2/3 sm:w-full flex flex-col items-center justify-center gap-4  rounded-lg lg:p-8 sm:p-6 shadow-lg">
          <div className="mt-4">{shopIconLarge}</div>
          <p className="lg:text-xl underline md:text-lg sm:text-base text-center text-black font-semibold mt-2">
            {shop ? shop.name : "Your Shop"}
          </p>
          <p className="lg:text-xl md:text-lg sm:text-base text-center text-black font-semibold ">
            Your onboarding request has been {shopStatus}.
          </p>
          <p className="lg:text-md md:text-sm sm:text-sm text-center text-justify text-gray-600">
            We regret to inform you that your onboarding request has been
            rejected. Please review the information you provided and consider
            reapplying. If you have any questions or need further assistance,
            feel free to contact our support team.
          </p>
          <div>
            <button
              onClick={() => navigate("/merchant/onboarding?step=0")}
              className="bg-white lg:text-md md:text-base sm:text-sm text-black px-4 py-2 rounded border border-black hover:bg-[#24443f] transition-colors duration-200 shadow-md hover:text-white"
            >
              Reapply for Onboarding
            </button>
          </div>
        </div>
      )}

      {shopStatus === "SUSPENDED" && (
        <div className="lg:w-1/2 md:w-2/3 sm:w-full flex flex-col items-center justify-center gap-4  rounded-lg lg:p-8 sm:p-6 shadow-lg">
          <div className="mt-4">{suspendedShopIcon}</div>
          <p className="lg:text-xl underline md:text-lg sm:text-base text-center text-black font-semibold mt-2">
            {shop ? shop.name : "Your Shop"}
          </p>
          <p className="lg:text-xl md:text-lg sm:text-base text-center text-black font-semibold ">
            Your shop has been {shopStatus}.
          </p>
          <p className="lg:text-md md:text-sm sm:text-sm text-center text-justify text-gray-600">
            We regret to inform you that your shop has been suspended. Please
            review the terms and conditions you agreed to when creating your
            shop. If you believe this suspension is a mistake or if you have any
            questions, please contact our support team for further assistance.
          </p>
          <div>
            <button
              onClick={() => navigate("/")}
              className="bg-white lg:text-md md:text-base sm:text-sm text-black px-4 py-2 rounded border border-black hover:bg-[#24443f] transition-colors duration-200 shadow-md hover:text-white"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      <div className="text-sm text-center text-gray-500">
        <p>
          If you have any questions or need further assistance, please contact
          our support team at{" "}
          <a
            className="text-blue-600 hover:underline"
            href="mailto:support@example.com"
          >
            support@example.com
          </a>
          .
        </p>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <img
          className="w-6 h-6 hover:opacity-75 cursor-pointer"
          src={fb}
          alt="Facebook"
          onClick={() => window.open("https://www.facebook.com", "_blank")}
        />
        <img
          className="w-6 h-6 hover:opacity-75 cursor-pointer"
          src={ig}
          alt="Instagram"
          onClick={() => window.open("https://www.instagram.com", "_blank")}
        />
        <img
          className="w-6 h-6 hover:opacity-75 cursor-pointer"
          src={youtube}
          alt="YouTube"
          onClick={() => window.open("https://www.youtube.com", "_blank")}
        />
      </div>
    </div>
  );
};
