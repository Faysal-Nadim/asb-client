import React from "react";
import { home_banner_one, home_banner_two } from "../../assets";

/**
 * @author
 * @function Hero
 **/

export const Hero = (props) => {
  return (
    <div className="flex items-center justify-between w-full gap-8 ">
      <div className="lg:w-2/3 sm:full lg:h-[400px] md:h-[350px] sm:h-[300px] flex items-center rounded-xl lg:hover:shadow-lg lg:hover:shadow-black/40 cursor-pointer">
        <div className="sm:hidden md:flex lg:flex h-full px-16 bg-[#669C97] rounded-tl-xl rounded-bl-xl flex-1 flex flex-col items-center justify-center text-white gap-4">
          <p className="text-4xl text-center">Elevate Your Everyday</p>
          <p className="text-lg text-center font-medium">
            Handcrafted pieces for modern living, made with care and tradition.
          </p>
          <div className="px-6 py-3 rounded-full bg-black mt-4 hover:scale-105 transition duration-300 cursor-pointer">
            <p className="font-medium">Explore now</p>
          </div>
        </div>

        <div className="lg:hidden md:hidden sm:flex h-full mx-4 px-16 bg-[#669C97] sm:rounded-xl flex-1 flex flex-col items-center justify-center text-white gap-4">
          <p className="text-2xl text-center font-semibold">
            Elevate Your Everyday
          </p>
          <p className="text-md text-center">
            Handcrafted pieces for modern living, made with care and tradition.
          </p>
          <div className="px-6 py-3 rounded-full bg-black mt-4 hover:scale-105 transition duration-300 cursor-pointer">
            <p className="font-medium text-md">Explore now</p>
          </div>
        </div>
        <div className="sm:hidden lg:block md:block w-[400px] h-full rounded-tr-xl rounded-br-xl">
          <img
            src={home_banner_one}
            className="rounded-tr-xl rounded-br-xl object-cover w-full h-full"
            alt="Home Banner One"
          />
        </div>
      </div>
      <div className="flex-1 lg:w-1/3 lg:h-[400px] md:h-[350px] sm:h-[300px] sm:hidden lg:block md:block hover:shadow-lg hover:shadow-black/40 rounded-xl cursor-pointer">
        <img
          src={home_banner_two}
          alt="Home Banner Two"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};
