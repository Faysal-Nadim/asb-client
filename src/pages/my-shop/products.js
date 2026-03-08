// components/shopmanager/SellerProductsPage.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 8;

// Demo products – replace with API data later
const demoProducts = [
  {
    id: "1",
    name: "Handcrafted Jute Rug",
    sku: "JR-001",
    image:
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&w=200",
    category: "Home & Living",
    price: 45,
    currency: "৳",
    stock: 12,
    status: "Active",
  },
  {
    id: "2",
    name: "Macrame Wall Hanging",
    sku: "MW-012",
    image:
      "https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&w=200",
    category: "Decor",
    price: 28,
    currency: "৳",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "3",
    name: "Clay Tea Set",
    sku: "CT-221",
    image:
      "https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg?auto=compress&w=200",
    category: "Kitchen",
    price: 32,
    currency: "৳",
    stock: 7,
    status: "Active",
  },
  {
    id: "4",
    name: "Handmade Scented Candle",
    sku: "SC-090",
    image:
      "https://images.pexels.com/photos/964093/pexels-photo-964093.jpeg?auto=compress&w=200",
    category: "Lifestyle",
    price: 18,
    currency: "৳",
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "5",
    name: "Jute Storage Basket",
    sku: "JB-345",
    image:
      "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&w=200",
    category: "Storage",
    price: 22,
    currency: "৳",
    stock: 19,
    status: "Active",
  },
  {
    id: "6",
    name: "Kantha Stitch Throw",
    sku: "KT-102",
    image:
      "https://images.pexels.com/photos/3081309/pexels-photo-3081309.jpeg?auto=compress&w=200",
    category: "Textiles",
    price: 55,
    currency: "৳",
    stock: 4,
    status: "Low Stock",
  },
  {
    id: "7",
    name: "Terracotta Planter",
    sku: "TP-568",
    image:
      "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&w=200",
    category: "Garden",
    price: 16,
    currency: "৳",
    stock: 25,
    status: "Active",
  },
  {
    id: "8",
    name: "Bamboo Serving Tray",
    sku: "BT-788",
    image:
      "https://images.pexels.com/photos/4109992/pexels-photo-4109992.jpeg?auto=compress&w=200",
    category: "Kitchen",
    price: 27,
    currency: "৳",
    stock: 0,
    status: "Inactive",
  },
  {
    id: "9",
    name: "Embroidered Cushion Cover",
    sku: "EC-334",
    image:
      "https://images.pexels.com/photos/1439965/pexels-photo-1439965.jpeg?auto=compress&w=200",
    category: "Textiles",
    price: 20,
    currency: "৳",
    stock: 10,
    status: "Active",
  },
  {
    id: "10",
    name: "Wooden Photo Frame",
    sku: "WF-998",
    image:
      "https://images.pexels.com/photos/1111372/pexels-photo-1111372.jpeg?auto=compress&w=200",
    category: "Decor",
    price: 15,
    currency: "৳",
    stock: 6,
    status: "Active",
  },
  {
    id: "11",
    name: "Handwoven Table Runner",
    sku: "TR-552",
    image:
      "https://images.pexels.com/photos/3738085/pexels-photo-3738085.jpeg?auto=compress&w=200",
    category: "Dining",
    price: 30,
    currency: "৳",
    stock: 2,
    status: "Low Stock",
  },
  {
    id: "12",
    name: "Mini Jute Coaster Set",
    sku: "JC-081",
    image:
      "https://images.pexels.com/photos/3738081/pexels-photo-3738081.jpeg?auto=compress&w=200",
    category: "Dining",
    price: 12,
    currency: "৳",
    stock: 34,
    status: "Active",
  },
  {
    id: "13",
    name: "Handcrafted Jute Rug",
    sku: "JR-001",
    image:
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&w=200",
    category: "Home & Living",
    price: 45,
    currency: "৳",
    stock: 12,
    status: "Active",
  },
  {
    id: "14",
    name: "Macrame Wall Hanging",
    sku: "MW-012",
    image:
      "https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&w=200",
    category: "Decor",
    price: 28,
    currency: "৳",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "15",
    name: "Clay Tea Set",
    sku: "CT-221",
    image:
      "https://images.pexels.com/photos/4109990/pexels-photo-4109990.jpeg?auto=compress&w=200",
    category: "Kitchen",
    price: 32,
    currency: "৳",
    stock: 7,
    status: "Active",
  },
  {
    id: "16",
    name: "Handmade Scented Candle",
    sku: "SC-090",
    image:
      "https://images.pexels.com/photos/964093/pexels-photo-964093.jpeg?auto=compress&w=200",
    category: "Lifestyle",
    price: 18,
    currency: "৳",
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "17",
    name: "Jute Storage Basket",
    sku: "JB-345",
    image:
      "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&w=200",
    category: "Storage",
    price: 22,
    currency: "৳",
    stock: 19,
    status: "Active",
  },
  {
    id: "18",
    name: "Kantha Stitch Throw",
    sku: "KT-102",
    image:
      "https://images.pexels.com/photos/3081309/pexels-photo-3081309.jpeg?auto=compress&w=200",
    category: "Textiles",
    price: 55,
    currency: "৳",
    stock: 4,
    status: "Low Stock",
  },
  {
    id: "19",
    name: "Terracotta Planter",
    sku: "TP-568",
    image:
      "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&w=200",
    category: "Garden",
    price: 16,
    currency: "৳",
    stock: 25,
    status: "Active",
  },
  {
    id: "20",
    name: "Bamboo Serving Tray",
    sku: "BT-788",
    image:
      "https://images.pexels.com/photos/4109992/pexels-photo-4109992.jpeg?auto=compress&w=200",
    category: "Kitchen",
    price: 27,
    currency: "৳",
    stock: 0,
    status: "Inactive",
  },
  {
    id: "21",
    name: "Embroidered Cushion Cover",
    sku: "EC-334",
    image:
      "https://images.pexels.com/photos/1439965/pexels-photo-1439965.jpeg?auto=compress&w=200",
    category: "Textiles",
    price: 20,
    currency: "৳",
    stock: 10,
    status: "Active",
  },
  {
    id: "22",
    name: "Wooden Photo Frame",
    sku: "WF-998",
    image:
      "https://images.pexels.com/photos/1111372/pexels-photo-1111372.jpeg?auto=compress&w=200",
    category: "Decor",
    price: 15,
    currency: "৳",
    stock: 6,
    status: "Active",
  },
  {
    id: "23",
    name: "Handwoven Table Runner",
    sku: "TR-552",
    image:
      "https://images.pexels.com/photos/3738085/pexels-photo-3738085.jpeg?auto=compress&w=200",
    category: "Dining",
    price: 30,
    currency: "৳",
    stock: 2,
    status: "Low Stock",
  },
  {
    id: "24",
    name: "Mini Jute Coaster Set",
    sku: "JC-081",
    image:
      "https://images.pexels.com/photos/3738081/pexels-photo-3738081.jpeg?auto=compress&w=200",
    category: "Dining",
    price: 12,
    currency: "৳",
    stock: 34,
    status: "Active",
  },
];

const statusClasses = {
  Active: "bg-emerald-100 text-emerald-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700",
  Inactive: "bg-slate-100 text-slate-600",
};

export const Products = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Filtered by search
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return demoProducts;
    const term = search.toLowerCase();
    return demoProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    );
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredProducts]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-[1380px] mx-auto lg:py-4 space-y-4">
      {/* Header & actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
            Products
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage all your active, low-stock and archived products.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by name, SKU or category"
            className="w-full sm:w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-[#2F5651] px-4 py-2 text-sm font-medium text-white hover:bg-[#4E948B]"
            onClick={() => navigate("/my-shop/products/add-new")}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-slate-100">
                <th className="py-3 px-4 font-medium">Product</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Stock</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-100 hover:bg-slate-50/60 transition"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          SKU: {product.sku}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {product.category}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-slate-900">
                    {product.currency}
                    {product.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {product.stock}{" "}
                    {product.stock === 0 ? (
                      <span className="text-[11px] text-red-500 ml-1">
                        (Out)
                      </span>
                    ) : product.stock <= 3 ? (
                      <span className="text-[11px] text-amber-500 ml-1">
                        (Low)
                      </span>
                    ) : null}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        statusClasses[product.status] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2 text-xs">
                      <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50">
                        Edit
                      </button>
                      <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50">
                        View
                      </button>
                      <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-sm text-slate-400"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 text-xs sm:text-sm">
          <p className="text-slate-500">
            Showing{" "}
            <span className="font-semibold">{currentProducts.length}</span> of{" "}
            <span className="font-semibold">{filteredProducts.length}</span>{" "}
            products
          </p>

          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 rounded-md border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  className={`px-2 py-1 rounded-md text-sm ${
                    isActive
                      ? "bg-[#2F5651] text-white"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="px-2 py-1 rounded-md border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
