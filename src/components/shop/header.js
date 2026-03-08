import React from "react";
import { star } from "../../assets/svg";
import { chatIcon, wishListIcon } from "../../assets/SvgIcons";

/**
 * @author
 * @function ShopHeader
 **/

export const ShopHeader = ({ shop }) => {
  const getCountryName = (code) => {
    if (!code) return null;
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code);
  };

  return (
    <div className="space-y-4">
      <div>
        <img
          src={
            shop?.shopBanner ||
            "https://i.etsystatic.com/21008709/r/isbl/cf4c6f/75928563/isbl_3360x840.75928563_oioxhg7x.jpg"
          }
          alt="Shop"
          className="w-full h-[440px] object-cover rounded-lg"
        />
      </div>

      <div className=" max-w-[1380px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={
                shop?.shopLogo ||
                "https://i.etsystatic.com/21008709/r/isla/d15f45/64075550/isla_100x100.64075550_t9opw4pa.jpg"
              }
              alt="Shop Logo"
              className="w-[88px] h-[88px] rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">
                {shop?.name || "LamariiJewelry"}
              </h2>
              <p className="text-gray-600 text-sm">
                {getCountryName(shop?.shopCountry) || "Poltava, Ukraine"}
              </p>

              <div className="flex items-center gap-4 mt-2 text-xl">
                <div className="flex items-center gap-1">
                  <img src={star} className="w-5 h-5" alt="Star Rating" />
                  <p>
                    <strong>4.8</strong> (507)
                  </p>
                </div>

                <div>|</div>

                <div className="flex items-center gap-1">
                  <p>
                    <strong>2.7K</strong> sales
                  </p>
                </div>

                <div>|</div>

                <div className="flex items-center gap-1">
                  <p>
                    <strong>6 years</strong> on Aleeha
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="rounded-full border border-black py-2 px-4 cursor-pointer transition transform hover:scale-105 hover:shadow-md">
              <p className="flex items-center gap-1">{chatIcon} Contact</p>
            </div>

            <div className="rounded-full border border-black py-2 px-4 cursor-pointer transition transform hover:scale-105 hover:shadow-md">
              <p className="flex items-center gap-1">{wishListIcon} Follow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
