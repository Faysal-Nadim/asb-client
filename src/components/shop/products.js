import React from "react";

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

export const Products = (props) => {
  const [activeCategory, setActiveCategory] = React.useState("All");
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

          <div>
            <div>Contact </div>
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <div className="grid grid-cols-4 gap-4">
          {productData[activeCategory].map((product) => (
            <div key={product.id} className="border p-4 rounded-md">
              <img src={product.img} alt={product.name} className="mb-2" />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-lg font-bold">US${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
