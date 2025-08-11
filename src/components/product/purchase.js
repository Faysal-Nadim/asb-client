// components/ProductPurchase.jsx
import React, { useMemo, useState } from "react";

function Select({ label, value, onChange, options }) {
  return (
    <div>
      {label && (
        <label className="block text-sm text-gray-700 mb-1">{label}</label>
      )}
      <div className="relative">
        <select
          className="w-full border rounded-lg px-3 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
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
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4"
      >
        <span className="text-gray-900 font-medium">{title}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {open && <div className="pb-4 text-sm text-gray-700">{children}</div>}
    </div>
  );
}

/**
 * Props:
 * - maxQty (default 10)
 * - onAddToCart({qty}) -> void
 * - highlights: string[]
 * - maker: string
 * - eta: { start: Date|string, end: Date|string }
 * - returnsAccepted: boolean
 * - shippingCostText: string (e.g., "USD 5.99")
 * - shipsFrom: string
 * - destination: string
 */
export default function ProductPurchase({
  maxQty = 10,
  onAddToCart = () => {},
  highlights = [
    "Made by peaspinkmemory",
    "Order your custom bridal slippers today and show off your bridal party in style!",
  ],
  maker = "peaspinkmemory",
  eta = {
    start: new Date(Date.now() + 7 * 86400000),
    end: new Date(Date.now() + 14 * 86400000),
  },
  returnsAccepted = false,
  shippingCostText = "USD 5.99",
  shipsFrom = "China",
  destination = "Bangladesh",
}) {
  const [qty, setQty] = useState("1");

  const qtyOptions = useMemo(
    () =>
      Array.from({ length: maxQty }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1),
      })),
    [maxQty]
  );

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit" });

  return (
    <section className="space-y-4">
      {/* Quantity & Add to cart */}
      <div className="grid grid-cols-1 gap-3">
        <Select
          label="Quantity"
          value={qty}
          onChange={setQty}
          options={qtyOptions}
        />
        <button
          type="button"
          onClick={() => onAddToCart({ qty: Number(qty) })}
          className="w-full h-12 rounded-full bg-black text-white font-semibold hover:opacity-90 transition"
        >
          Add to cart
        </button>
      </div>

      {/* Star seller note */}
      <div className="flex items-start gap-3 text-sm">
        <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700">
          {/* star badge icon */}
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 15.9 6.8 18l1-5.8-4.2-4.1 5.8-.8z"
            />
          </svg>
        </span>
        <p className="text-gray-700">
          <span className="font-semibold">Star Seller.</span> This seller
          consistently earned 5-star reviews, shipped on time, and replied
          quickly to any messages they received.
        </p>
      </div>

      {/* Item details */}
      <Accordion title="Item details" defaultOpen>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            {/* hand/creator icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="text-gray-700"
            >
              <path fill="currentColor" d="M3 12l2-2 4 4 8-8 2 2-10 10z" />
            </svg>
            <span>
              <span className="font-medium">Made by</span> {maker}
            </span>
          </div>
          <div className="space-y-2 text-gray-700">
            {highlights.map((h, i) => (
              <p key={i}>{h}</p>
            ))}
          </div>
          <button
            type="button"
            className="text-sm font-medium text-gray-800 underline underline-offset-2"
          >
            Learn more about this item
          </button>
        </div>
      </Accordion>

      {/* Shipping & return policies */}
      <Accordion title="Shipping and return policies" defaultOpen>
        <ul className="space-y-3 text-gray-800">
          <li className="flex items-start gap-3">
            <span className="mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20 8h-3V4H3v13h2v3h3v-3h7v3h3v-3h2zM5 15V6h10v9zM18 15h-1V9h1l2 2v4z"
                />
              </svg>
            </span>
            <div className="text-sm">
              Order today to get by{" "}
              <span className="font-semibold">
                {fmtDate(eta.start)}–{fmtDate(eta.end)}
              </span>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                />
              </svg>
            </span>
            <div className="text-sm">
              <span className="font-medium">Returns & exchanges</span>{" "}
              {returnsAccepted ? "accepted" : "not accepted"}
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C8.1 2 5 5.1 5 9c0 7 7 13 7 13s7-6 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"
                />
              </svg>
            </span>
            <div className="text-sm">
              Cost to ship:{" "}
              <span className="font-semibold">{shippingCostText}</span>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 8h-3l-2-3H9L7 8H4l-2 12h20z" />
              </svg>
            </span>
            <div className="text-sm">
              Ships from: <span className="font-semibold">{shipsFrom}</span>
            </div>
          </li>
        </ul>

        {/* Deliver to row */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-700">
            Deliver to <span className="font-medium">{destination}</span>
          </span>
          <button
            type="button"
            className="text-gray-800 underline underline-offset-2"
          >
            Change
          </button>
        </div>
      </Accordion>
    </section>
  );
}
