import React from "react";

const statusColors = {
  Paid: "bg-emerald-100 text-emerald-700",
  Unpaid: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
};

export const RecentOrdersTable = ({
  orders = [],
  sortLabel = "Today",
  onSortClick,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-indigo-50">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-slate-800">
            Recent Orders
          </h2>
        </div>

        <button
          type="button"
          onClick={onSortClick}
          className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-slate-500 hover:text-slate-700"
        >
          <span className="uppercase tracking-wide">Short by:</span>
          <span className="text-slate-800">{sortLabel}</span>
          <span className="text-xs">▾</span>
        </button>
      </div>

      {/* Table (scrollable on mobile) */}
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="text-slate-400 text-[11px] sm:text-xs">
              <th className="py-2 pr-3">
                <input type="checkbox" className="accent-indigo-500" />
              </th>
              <th className="py-2 pr-3">Purchase Id</th>
              <th className="py-2 pr-3">Customer Name</th>
              <th className="py-2 pr-3">Product Name</th>
              <th className="py-2 pr-3">Amount</th>
              <th className="py-2 pr-3">Order Date</th>
              <th className="py-2 pr-3">Vendor</th>
              <th className="py-2 pr-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id || order.purchaseId}
                className="border-t border-indigo-50 hover:bg-white/70 transition-colors"
              >
                <td className="py-3 pr-3">
                  <input type="checkbox" className="accent-indigo-500" />
                </td>

                <td className="py-3 pr-3">
                  <button className="text-[11px] sm:text-xs font-semibold text-indigo-600 hover:underline">
                    #{order.purchaseId}
                  </button>
                </td>

                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    {/* Avatar */}
                    {order.avatarUrl ? (
                      <img
                        src={order.avatarUrl}
                        alt={order.customerName}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-[11px] font-semibold text-indigo-700">
                        {order.customerName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                    <span className="text-xs sm:text-sm text-slate-800">
                      {order.customerName}
                    </span>
                  </div>
                </td>

                <td className="py-3 pr-3 text-xs sm:text-sm text-slate-700">
                  {order.productName}
                </td>

                <td className="py-3 pr-3 text-xs sm:text-sm text-slate-800">
                  {order.amount}
                </td>

                <td className="py-3 pr-3 text-xs sm:text-sm text-slate-600">
                  {order.orderDate}
                </td>

                <td className="py-3 pr-3 text-xs sm:text-sm text-slate-700">
                  {order.vendor}
                </td>

                <td className="py-3 pr-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      statusColors[order.status] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-center text-xs text-slate-400"
                >
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
