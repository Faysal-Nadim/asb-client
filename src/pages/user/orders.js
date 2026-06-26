// components/shopmanager/SellerOrdersPage.jsx
import React, { useState, useMemo, useEffect } from "react";

const PAGE_SIZE = 10;

const demoOrders = [
  {
    id: "1",
    orderNumber: "TBE73HHFSD",
    date: "2025-11-20",
    time: "02:15 PM",
    customerName: "Judda Alex",
    customerEmail: "judda@example.com",
    itemsCount: 3,
    total: 6645,
    currency: "৳",
    paymentStatus: "Paid",
    fulfillmentStatus: "Shipped",
    shippingMethod: "Pathao",
    destination: "Dhaka, Bangladesh",
  },
  {
    id: "2",
    orderNumber: "TRW3743787",
    date: "2025-11-19",
    time: "11:04 AM",
    customerName: "Manik Mia",
    customerEmail: "manik@example.com",
    itemsCount: 1,
    total: 566,
    currency: "৳",
    paymentStatus: "Unpaid",
    fulfillmentStatus: "Pending",
    shippingMethod: "Steadfast",
    destination: "Narayanganj, Bangladesh",
  },
  {
    id: "3",
    orderNumber: "YRB337737R",
    date: "2025-11-19",
    time: "09:42 AM",
    customerName: "Chanchal Hossain",
    customerEmail: "chanchal@example.com",
    itemsCount: 2,
    total: 2458,
    currency: "৳",
    paymentStatus: "Paid",
    fulfillmentStatus: "Processing",
    shippingMethod: "Pathao",
    destination: "Chattogram, Bangladesh",
  },
  {
    id: "4",
    orderNumber: "FUSF763465",
    date: "2025-11-18",
    time: "05:27 PM",
    customerName: "Sabbir Hasan",
    customerEmail: "sabbir@example.com",
    itemsCount: 4,
    total: 1425,
    currency: "৳",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    shippingMethod: "Sundarban",
    destination: "Sylhet, Bangladesh",
  },
  {
    id: "5",
    orderNumber: "RGTER433554",
    date: "2025-11-18",
    time: "01:09 PM",
    customerName: "Hasiba Khatun",
    customerEmail: "hasiba@example.com",
    itemsCount: 2,
    total: 899,
    currency: "৳",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    shippingMethod: "Pathao",
    destination: "Gazipur, Bangladesh",
  },
  {
    id: "6",
    orderNumber: "GRRE455663",
    date: "2025-11-17",
    time: "03:45 PM",
    customerName: "Hasan Mia",
    customerEmail: "hasan@example.com",
    itemsCount: 5,
    total: 2560,
    currency: "৳",
    paymentStatus: "Paid",
    fulfillmentStatus: "Returned",
    shippingMethod: "Steadfast",
    destination: "Narsingdi, Bangladesh",
  },
  {
    id: "7",
    orderNumber: "TGRT324353",
    date: "2025-11-17",
    time: "10:30 AM",
    customerName: "Jorda Hossain",
    customerEmail: "jorda@example.com",
    itemsCount: 1,
    total: 199,
    currency: "৳",
    paymentStatus: "Unpaid",
    fulfillmentStatus: "Cancelled",
    shippingMethod: "Pathao",
    destination: "Cumilla, Bangladesh",
  },
  {
    id: "8",
    orderNumber: "HZD834HHS2",
    date: "2025-11-16",
    time: "06:18 PM",
    customerName: "Stephen Miller",
    customerEmail: "stephen@example.com",
    itemsCount: 3,
    total: 3490,
    currency: "৳",
    paymentStatus: "Paid",
    fulfillmentStatus: "Shipped",
    shippingMethod: "RedX",
    destination: "USA (via warehouse)",
  },
  {
    id: "9",
    orderNumber: "JUE892KKD2",
    date: "2025-11-16",
    time: "12:05 PM",
    customerName: "Marina Lopez",
    customerEmail: "marina@example.com",
    itemsCount: 2,
    total: 1290,
    currency: "৳",
    paymentStatus: "Pending",
    fulfillmentStatus: "Pending",
    shippingMethod: "Pathao",
    destination: "Dhaka, Bangladesh",
  },
  {
    id: "10",
    orderNumber: "PLM8272KJD",
    date: "2025-11-15",
    time: "04:41 PM",
    customerName: "Nicolas Smith",
    customerEmail: "nicolas@example.com",
    itemsCount: 2,
    total: 790,
    currency: "৳",
    paymentStatus: "Paid",
    fulfillmentStatus: "Processing",
    shippingMethod: "Steadfast",
    destination: "Khulna, Bangladesh",
  },
  {
    id: "11",
    orderNumber: "AMZ273HDK2",
    date: "2025-11-15",
    time: "09:20 AM",
    customerName: "Arifa Sultana",
    customerEmail: "arifa@example.com",
    itemsCount: 6,
    total: 5020,
    currency: "৳",
    paymentStatus: "Paid",
    fulfillmentStatus: "Shipped",
    shippingMethod: "Sundarban",
    destination: "Rangpur, Bangladesh",
  },
  {
    id: "12",
    orderNumber: "BRT9281PLS",
    date: "2025-11-14",
    time: "11:55 AM",
    customerName: "Samiur Rahman",
    customerEmail: "samiur@example.com",
    itemsCount: 1,
    total: 750,
    currency: "৳",
    paymentStatus: "Pending",
    fulfillmentStatus: "Pending",
    shippingMethod: "Pathao",
    destination: "Dhaka, Bangladesh",
  },
];

const paymentStatusClasses = {
  Paid: "bg-emerald-100 text-emerald-700",
  Unpaid: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
};

const fulfillmentStatusClasses = {
  Pending: "bg-slate-100 text-slate-700",
  Processing: "bg-indigo-100 text-indigo-700",
  Shipped: "bg-sky-100 text-sky-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
  Returned: "bg-amber-100 text-amber-700",
};

const statusFilterOptions = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
];

export const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    let list = demoOrders;

    if (statusFilter !== "All") {
      list = list.filter((order) => order.fulfillmentStatus === statusFilter);
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(term) ||
          o.customerName.toLowerCase().includes(term) ||
          o.customerEmail.toLowerCase().includes(term)
      );
    }

    return list;
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));

  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredOrders]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-[1380px] mx-auto lg:py-4 space-y-4">
      {/* Header & filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
            Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View and manage all orders placed in your shop.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by order, customer or email"
            className="w-full sm:w-72 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="w-full sm:w-40 rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusFilterOptions.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All statuses" : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-slate-100">
                <th className="py-3 px-4 font-medium">Order</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">Items</th>
                <th className="py-3 px-4 font-medium">Total</th>
                <th className="py-3 px-4 font-medium">Payment</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 hover:bg-slate-50/60 transition"
                >
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-indigo-600 underline cursor-pointer">
                        #{order.orderNumber}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {order.shippingMethod} · {order.destination}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-sm text-slate-700">
                    <div className="flex flex-col">
                      <span>
                        {new Date(order.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {order.time}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-sm text-slate-700">
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customerName}</span>
                      <span className="text-[11px] text-slate-400">
                        {order.customerEmail}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-sm text-slate-700">
                    {order.itemsCount} item
                    {order.itemsCount > 1 ? "s" : ""}
                  </td>

                  <td className="py-3 px-4 text-sm font-semibold text-slate-900">
                    {order.currency}
                    {order.total.toLocaleString()}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        paymentStatusClasses[order.paymentStatus] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        fulfillmentStatusClasses[order.fulfillmentStatus] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2 text-xs">
                      <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50">
                        View
                      </button>
                      <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50">
                        Update
                      </button>
                      <button className="px-2 py-1 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 text-center text-sm text-slate-400"
                  >
                    No orders found.
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
            <span className="font-semibold">{currentOrders.length}</span> of{" "}
            <span className="font-semibold">{filteredOrders.length}</span>{" "}
            orders
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
                      ? "bg-indigo-600 text-white"
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
