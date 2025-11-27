import React from "react";

/**
 * @author
 * @function StatsSection
 **/

export const StatsSection = ({ stats }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-slate-100 flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-400">{item.label}</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${item.iconBg}`}
            >
              <span className="text-lg">{item.iconText}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <p className="text-slate-400">{item.subLabel}</p>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${item.badgeColor}`}
            >
              {item.badge}
            </span>
          </div>
        </div>
      ))}

      {/* Sales overview card */}
      <div className="bg-[#2F5651] text-white rounded-lg p-4 sm:p-5 shadow-sm sm:col-span-2 xl:col-span-1">
        <p className="text-xs font-medium/relaxed text-indigo-100">
          Sales Overview
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-[#4e948b] rounded-xl p-2">
            <p className="text-[11px] text-indigo-100">Total Sale</p>
            <p className="mt-1 text-lg font-semibold">8,546</p>
          </div>
          <div className="bg-[#4e948b] rounded-xl p-2">
            <p className="text-[11px] text-indigo-100">Monthly Sale</p>
            <p className="mt-1 text-lg font-semibold">4,220</p>
          </div>
          <div className="bg-[#4e948b] rounded-xl p-2">
            <p className="text-[11px] text-indigo-100">Today&apos;s Sale</p>
            <p className="mt-1 text-lg font-semibold">429</p>
          </div>
        </div>
      </div>
    </section>
  );
};
