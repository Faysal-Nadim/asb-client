// components/ReviewsSection.jsx
import React, { useMemo, useState } from "react";

/** Helpers */
// const Star = ({ filled }) => (
//   <svg
//     viewBox="0 0 24 24"
//     width="16"
//     height="16"
//     className={filled ? "text-yellow-500" : "text-gray-300"}
//   >
//     <path
//       fill="currentColor"
//       d="M12 2l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 15.9 6.8 18l1-5.8-4.2-4.1 5.8-.8z"
//     />
//   </svg>
// );

const RatingStars = ({ value = 5, size = 16 }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={i < Math.round(value) ? "text-yellow-500" : "text-gray-300"}
      >
        <path
          fill="currentColor"
          d="M12 2l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 15.9 6.8 18l1-5.8-4.2-4.1 5.8-.8z"
        />
      </svg>
    ))}
  </div>
);

const Chip = ({ children, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm border transition ${
      active
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

/** Main */
export default function ReviewsSection({
  overall = { rating: 4.7, countText: "6.1k reviews" },
  metrics = [
    { label: "Item quality", score: 5 },
    { label: "Shipping", score: 5 },
    { label: "Customer service", score: 5 },
  ],
  highlights = [
    "Great quality",
    "Fast shipping",
    "As described",
    "Love it",
    "Perfect for wedding",
    "Cute",
    "Gift-worthy",
  ],
  categories = [
    { key: "quality", label: "Quality", count: 879 },
    { key: "packaging", label: "Shipping & Packaging", count: 639 },
    { key: "accuracy", label: "Description accuracy", count: 624 },
    { key: "appearance", label: "Appearance", count: 566 },
  ],
  reviews = [], // [{id, rating, recommends, userName, userBadgeColor?, dateISO, text, photo?}]
  pageSize = 4,
}) {
  //   const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = reviews.slice();

    if (selectedCategory)
      list = list.filter((r) => (r.cats || []).includes(selectedCategory));

    return list;
  }, [reviews, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const resetAnd =
    (fn) =>
    (...args) => {
      setPage(1);
      fn(...args);
    };

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <RatingStars value={overall.rating} size={18} />
              <span className="font-semibold text-xl text-gray-900">
                {overall.rating} out of 5
              </span>
              <span className="text-gray-500">({overall.countText})</span>
            </div>
            <p className="text-sm text-gray">
              All reviews are from verified buyers
            </p>
          </div>

          {/* metric pills */}
          <div className="flex flex-wrap gap-3">
            {metrics.map((m, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm">
                <span className="inline-flex items-center justify-center p-2 rounded-full border">
                  {m.score}/5
                </span>
                {m.label}
              </span>
            ))}
          </div>
        </div>

        {/* Buyer highlights */}
        {highlights?.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="text-gray-800"
              >
                <path
                  fill="currentColor"
                  d="M12 2l3 6 6 .9-4.5 4.3 1 6L12 16l-5.5 3.2 1-6L3 8.9 9 8z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-800">
                Buyer highlights, summarized by AI
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {highlights.map((h, index) => (
                <div className="text-sm text-black" key={index}>
                  {h} {index < highlights.length - 1 && "|"}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category chips + sort */}
        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-2 font-medium">
            {categories.map((c) => (
              <Chip
                key={c.key}
                active={selectedCategory === c.key}
                onClick={resetAnd(() =>
                  setSelectedCategory(selectedCategory === c.key ? null : c.key)
                )}
              >
                {c.label} <span className="ml-1 text-black">({c.count})</span>
              </Chip>
            ))}
          </div>
          {/* <div className="relative">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="suggested">Suggested</option>
              <option value="newest">Newest</option>
              <option value="rating_desc">Highest rating</option>
            </select>
          </div> */}
        </div>
      </div>

      {/* Reviews list */}
      <div className="mt-6 space-y-6">
        {pageData.map((r) => (
          <article key={r.id} className="pb-6 border-b">
            <div className="flex items-center gap-2">
              <RatingStars value={r.rating} />
              <span className="text-sm text-gray-600">|</span>
              {r.recommends && (
                <span className="text-sm text-green-700 inline-flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9 16.2l-3.5-3.6L4 14l5 5 11-11-1.5-1.4z"
                    />
                  </svg>
                  Recommends
                </span>
              )}
            </div>

            <p className="mt-3 text-gray-800 leading-relaxed">{r.text}</p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full`}
                  style={{ backgroundColor: r.userBadgeColor || "#f59e0b" }}
                />
                <span className="font-medium text-gray-800">{r.userName}</span>
                <span>•</span>
                <time dateTime={r.dateISO}>
                  {new Date(r.dateISO).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              {r.photo && (
                <img
                  src={r.photo}
                  alt="review"
                  className="w-14 h-14 rounded-md object-cover"
                />
              )}
            </div>
          </article>
        ))}

        {pageData.length === 0 && (
          <div className="text-sm text-gray-500 py-8 text-center">
            No reviews match your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            className="w-8 h-8 rounded-full border hover:bg-gray-50 disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {Array.from({ length: totalPages })
            .slice(0, 5)
            .map((_, i) => {
              const num = i + 1;
              return (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`w-8 h-8 rounded-full border ${
                    page === num
                      ? "bg-gray-900 text-white border-gray-900"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              );
            })}

          <button
            className="w-8 h-8 rounded-full border hover:bg-gray-50 disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      )}

      {/* Footer link */}
      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-sm font-medium text-gray-800 underline underline-offset-2"
        >
          Show other item reviews from this shop
        </button>
      </div>
    </section>
  );
}
