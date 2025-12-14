import React, { useState } from "react";

/**
 * @author
 * @function Wishlist
 **/

const demoWishlist = [
  {
    id: "1",
    name: "Handcrafted Jute Rug",
    image:
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&w=400",
    price: 4500,
    currency: "৳",
    inStock: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Macrame Wall Hanging",
    image:
      "https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&w=400",
    price: 2800,
    currency: "৳",
    inStock: true,
    isNew: false,
  },
  {
    id: "3",
    name: "Clay Tea Set",
    image:
      "https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg?auto=compress&w=400",
    price: 3200,
    currency: "৳",
    inStock: false,
    isNew: false,
  },
  {
    id: "4",
    name: "Scented Soy Candle",
    image:
      "https://images.pexels.com/photos/964093/pexels-photo-964093.jpeg?auto=compress&w=400",
    price: 1200,
    currency: "৳",
    inStock: true,
    isNew: false,
  },
];

export const Wishlist = () => {
  const [items, setItems] = useState(demoWishlist);

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (item) => {
    // TODO: call your "add to cart" API here
    console.log("Move to cart:", item);
    // optional: remove from wishlist after moving
    setItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            My Wishlist
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Save your favourite items and move them to cart whenever you’re
            ready.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          Total items:{" "}
          <span className="font-semibold text-slate-900">{items.length}</span>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center bg-white">
          <p className="text-lg font-semibold text-slate-800 mb-1">
            Your wishlist is empty
          </p>
          <p className="text-sm text-slate-500 mb-4">
            Browse products and tap the ❤️ icon to add them to your wishlist.
          </p>
          <button className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
            Continue shopping
          </button>
        </div>
      )}

      {/* Wishlist grid */}
      {items.length > 0 && (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 w-full object-cover"
                />

                {item.isNew && (
                  <span className="absolute top-3 left-3 rounded-full bg-emerald-500 text-[11px] font-semibold text-white px-2 py-0.5">
                    New
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col p-3 sm:p-4">
                <h2 className="text-sm font-medium text-slate-900 line-clamp-2">
                  {item.name}
                </h2>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-slate-900">
                      {item.currency}
                      {item.price.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs ${
                        item.inStock ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {item.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item)}
                    disabled={!item.inStock}
                    className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium ${
                      item.inStock
                        ? "bg-[#2F5651] text-white hover:bg-[#24443F]"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Move to cart
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
