import React from "react";
import { useSelector } from "react-redux";
import { CDN } from "../../redux/helpers/urlConfig";
import { Link } from "react-router-dom";

/**
 * @author
 * @function Popular
 **/

export const Popular = (props) => {
  const { categories } = useSelector((state) => state.category);
  return (
    <div className="py-4 w-full mx-auto">
      <div className="sm:mx-4 lg:mx-0 md:mx-0">
        <h2 className="text-lg font-bold">Popular Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-4 mt-2">
          {categories.map((item) => (
            <Link
              to={`/product-list?keyword=${encodeURIComponent(item.name)}&page=1&page_size=20&sort=default`}
              key={item.id}
              className="hover:bg-white border border-white lg:hover:border-gray-100 rounded-xl lg:hover:shadow-lg transition-shadow duration-300 lg:p-2 cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={`${CDN}${item?.image?.path}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="lg:text-md sm:text-sm text-center font-semibold  mt-2">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
