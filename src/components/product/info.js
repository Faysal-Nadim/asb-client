// components/ProductInfo.jsx
import React, { useEffect, useMemo, useState } from "react";

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

function useCountdown(endTs) {
  const [left, setLeft] = useState(Math.max(0, endTs - Date.now()));
  useEffect(() => {
    const id = setInterval(
      () => setLeft(Math.max(0, endTs - Date.now())),
      1000
    );
    return () => clearInterval(id);
  }, [endTs]);
  const hrs = String(Math.floor(left / 3_600_000)).padStart(2, "0");
  const mins = String(Math.floor((left % 3_600_000) / 60_000)).padStart(2, "0");
  const secs = String(Math.floor((left % 60_000) / 1000)).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

const Star = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    className={filled ? "text-yellow-500" : "text-gray-300"}
  >
    <path
      fill="currentColor"
      d="M12 2l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 15.9 6.8 18l1-5.8-4.2-4.1 5.8-.8z"
    />
  </svg>
);

export default function ProductInfo({
  demandText = "In demand. 57 people bought this in the last 24 hours.",
  price = 3.0,
  priceSuffix = "+",
  strikePrice = 10.73,
  discountPct = 72,
  saleEndsAt = Date.now() + 20 * 60 * 60 * 1000, // 20h from now
  taxesNote = "Local taxes included (where applicable)",
  title = "Custom Fluffy Slippers,Custom Bride Slippers,Fluffy Bridesmaid Slippers,Bride Slipper Personalized,Christmas party slippers,Fluffy Slippers",
  shop = { name: "peaspinkmemory", verified: true, rating: 4.5 },
  colorSizeOptions = ["Small", "Medium", "Large"],
  fontColorOptions = ["Gold", "Silver", "White", "Black"],
  onSelect = () => {},
}) {
  const countdown = useCountdown(saleEndsAt);
  const stars = useMemo(() => {
    const full = Math.floor(shop.rating || 0);
    const half = (shop.rating || 0) - full >= 0.5;
    return Array.from({ length: 5 }).map((_, i) =>
      i < full ? "full" : i === full && half ? "half" : "empty"
    );
  }, [shop.rating]);

  return (
    <section className="space-y-3">
      {/* Demand */}
      <p className="text-sm text-rose-600">{demandText}</p>

      {/* Price row */}
      <div className="flex items-center gap-2">
        <div className="text-3xl font-bold text-[#2F5651]">
          {formatCurrency(price)}
          {priceSuffix}
        </div>
        <div className="text-gray-400 line-through">
          {formatCurrency(strikePrice)}
        </div>
        <span className="text-xs font-semibold text-white bg-green-600 px-2 py-1 rounded-full">
          {discountPct}% off
        </span>
      </div>

      {/* Countdown */}
      <p className="text-sm text-green-700">
        Sale ends in <span className="font-semibold">{countdown}</span>
      </p>

      {/* Taxes */}
      <p className="text-xs text-gray-500">{taxesNote}</p>

      {/* Title / keywords */}
      <h1 className="text-gray-800">{title}</h1>

      {/* Shop & rating */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">{shop.name}</span>
        {shop.verified && (
          <span className="inline-flex items-center gap-1 text-xs text-purple-700">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="text-purple-600"
            >
              <path
                fill="currentColor"
                d="M12 2l3 2 3-.5 1.5 2.6 2.6 1.5-.6 3 2 3-2 3 .6 3-2.6 1.5L18 20.5 15 23l-3-2-3 2-3-2.5-2.5 1-2.6-1.5.6-3-2-3 2-3-.6-3 2.6-1.5L6 3.5l3 .5 3-2z"
              />
            </svg>
            Verified
          </span>
        )}
        <div className="flex items-center gap-1 ml-1">
          {stars.map((s, i) => (
            <Star key={i} filled={s !== "empty"} />
          ))}
          <span className="text-sm text-gray-600">
            {shop.rating?.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Selects */}
      <div className="space-y-3 pt-2">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Color&Size</label>
          <div className="relative">
            <select
              className="w-full border rounded-lg px-3 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              defaultValue=""
              onChange={(e) =>
                onSelect({ key: "colorSize", value: e.target.value })
              }
            >
              <option value="" disabled>
                Select an option
              </option>
              {colorSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {/* <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="text-gray-500"
              >
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </span> */}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">FONT COLOR</label>
          <div className="relative">
            <select
              className="w-full border rounded-lg px-3 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              defaultValue=""
              onChange={(e) =>
                onSelect({ key: "fontColor", value: e.target.value })
              }
            >
              <option value="" disabled>
                Select an option
              </option>
              {fontColorOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {/* <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="text-gray-500"
              >
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </span> */}
          </div>
        </div>
      </div>
    </section>
  );
}
