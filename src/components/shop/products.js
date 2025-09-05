import React from "react";
import { chatIcon, ReportIcon } from "../../assets/SvgIcons";

/**
 * @author
 * @function Products
 **/

const productData = {
  All: [
    {
      id: 1,
      name: "Shirt",
      category: "Clothing",
      img: "https://placehold.co/400x400",
      price: 19.99,
    },
    {
      id: 2,
      name: "Laptop",
      category: "Electronics",
      img: "https://placehold.co/400x400",
      price: 999.99,
    },
    {
      id: 3,
      name: "Pants",
      category: "Clothing",
      img: "https://placehold.co/400x400",
      price: 29.99,
    },
    {
      id: 4,
      name: "Phone",
      category: "Electronics",
      img: "https://placehold.co/400x400",
      price: 799.99,
    },
    {
      id: 5,
      name: "Sofa",
      category: "Home Decor",
      img: "https://placehold.co/400x400",
    },
    {
      id: 6,
      name: "Table",
      category: "Home Decor",
      img: "https://placehold.co/400x400",
      price: 499.99,
    },
  ],
  Clothing: [
    {
      id: 1,
      name: "Shirt",
      category: "Clothing",
      img: "https://placehold.co/400x400",
      price: 19.99,
    },
    {
      id: 3,
      name: "Pants",
      category: "Clothing",
      img: "https://placehold.co/400x400",
      price: 29.99,
    },
  ],
  Electronics: [
    {
      id: 2,
      name: "Laptop",
      category: "Electronics",
      img: "https://placehold.co/400x400",
      price: 999.99,
    },
    {
      id: 4,
      name: "Phone",
      category: "Electronics",
      img: "https://placehold.co/400x400",
      price: 799.99,
    },
  ],
  "Home Decor": [
    {
      id: 5,
      name: "Sofa",
      category: "Home Decor",
      img: "https://placehold.co/400x400",
      price: 499.99,
    },
    {
      id: 6,
      name: "Table",
      category: "Home Decor",
      img: "https://placehold.co/400x400",
      price: 199.99,
    },
  ],
};

export const Products = ({
  price = 3.0,
  priceSuffix = "+",
  strikePrice = 10.73,
  discountPct = 72,
}) => {
  const [activeCategory, setActiveCategory] = React.useState("All");

  function formatCurrency(n, c = "USD") {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: c,
      }).format(n);
    } catch {
      return `USD ${Number(n).toFixed(2)}`;
    }
  }
  return (
    <div className="grid grid-cols-6 gap-4 mt-4">
      <div className="col-span-1">
        <div className="border-r border-gray-200 pr-4">
          {Object.keys(productData).map((category) => (
            <button
              key={category}
              className={`block py-2 px-4 text-left w-full hover:bg-gray-100 ${
                activeCategory === category ? "font-bold" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category} ({productData[category].length})
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4 p-2">
          <div className="bg-[#2F5651] p-2 text-white flex items-center gap-2 justify-center rounded font-medium cursor-pointer hover:bg-[#244040]">
            <p> {chatIcon}</p> Contact owner
          </div>

          <div className="p-2 border flex items-center gap-2 font-medium justify-center rounded  cursor-pointer hover:bg-gray-100">
            <p>{ReportIcon}</p> Report Shop
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <div className="grid grid-cols-4">
          {productData[activeCategory].map((product) => (
            <div
              key={product.id}
              className="border border-transparent hover:border-gray-300 p-2 rounded-md cursor-pointer"
            >
              <img src={product.img} alt={product.name} className="mb-2" />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-[#2F5651]">
                  {formatCurrency(price)}
                  {priceSuffix}
                </div>
                <div className="text-gray-400 text-sm line-through">
                  {formatCurrency(strikePrice)}
                </div>
                <span className="text-xs font-semibold text-white bg-green-600 px-2 py-1 rounded-full">
                  {discountPct}% off
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
