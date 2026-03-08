import React, { useEffect, useState } from "react";
import { searchIcon } from "../assets/SvgIcons";
import { ShopHeader } from "../components/shop/header";
import { Products } from "../components/shop/products";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopBySlug } from "../redux/actions";

/**
 * @author
 * @function ShopDetails
 **/

const shopNavigation = ["Products", "Reviews", "About", "Policies"];

export const ShopDetails = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [country, identifier] = location.pathname.split("/").slice(2);

  const [activeTab, setActiveTab] = useState("Products");

  const shop = useSelector((state) => state.shop);

  useEffect(() => {
    const slug = encodeURIComponent(`/${country}/${identifier}`);
    dispatch(getShopBySlug(slug));
  }, [country, identifier, dispatch]);

  return (
    <div className="max-w-[1380px] mx-auto mt-4">
      <ShopHeader shop={shop.publicShopDetails} />
      <div className="py-4 flex justify-between items-center">
        <div className="flex gap-8">
          {shopNavigation.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-1 text-lg font-medium transition-colors duration-200
              ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`}
              >
                {tab}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] w-full bg-black
                transform origin-left transition-transform duration-300
                ${isActive ? "scale-x-100" : "scale-x-0"}`}
                />
              </button>
            );
          })}
        </div>
        <div className="flex items-center w-1/3 ">
          <div className="flex items-center border border-2 border-[#222222] rounded-full w-full overflow-hidden">
            <input
              type="text"
              placeholder="Search in store"
              className="flex-grow px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-[#2F5651] transform transition-transform duration-200 hover:scale-110 p-2 rounded-r-full mr-1">
              {searchIcon}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        {activeTab === "Products" && <Products />}
        {activeTab === "Reviews" && <div>Reviews Content</div>}
        {activeTab === "About" && <div>About Content</div>}
        {activeTab === "Policies" && <div>Policies Content</div>}
      </div>
    </div>
  );
};
