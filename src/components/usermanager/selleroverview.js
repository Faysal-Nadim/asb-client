// components/dashboard/SellerOverviewSection.jsx
import React from "react";

export const SellerOverviewSection = ({
  rating = {
    averageRating: 4.7,
    totalReviews: 148,
    newReviewsThisWeek: 3,
    lastReview: {
      author: "Alex Johnson",
      message: "Great seller, fast delivery!",
      rating: 5,
      date: "2 days ago",
    },
  },
  settlement = {
    currency: "$",
    earningsThisWeek: 842,
    paidOut: 600,
    pendingPayout: 242,
    nextPayoutDate: "Friday, 28 Mar 2025",
    lastPayoutAmount: 420,
    lastPayoutDate: "21 Mar 2025",
  },
}) => {
  const { averageRating, totalReviews, newReviewsThisWeek, lastReview } =
    rating;

  const {
    currency,
    earningsThisWeek,
    paidOut,
    pendingPayout,
    nextPayoutDate,
    lastPayoutAmount,
    lastPayoutDate,
  } = settlement;

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {/* Seller Rating Overview */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100">
        <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-3">
          Seller Rating Overview
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-indigo-50 px-4 py-3">
            <span className="text-xs text-slate-500">Average Rating</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-semibold text-slate-900">
                {averageRating?.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500">/ 5</span>
            </div>
            <div className="mt-1 flex items-center gap-0.5 text-amber-400 text-lg">
              {"★★★★★".slice(0, Math.round(averageRating || 0))}
            </div>
          </div>

          <div className="flex-1 space-y-2 text-xs sm:text-sm">
            <p className="text-slate-600">
              <span className="font-semibold text-slate-800">
                {totalReviews}
              </span>{" "}
              total reviews
            </p>
            <p className="text-emerald-600 font-medium">
              +{newReviewsThisWeek} new reviews this week
            </p>
            <div className="border-t border-slate-100 pt-2">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Latest Review
              </p>
              <p className="mt-1 text-slate-700 text-xs sm:text-sm line-clamp-2">
                “{lastReview?.message}”
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                <span>— {lastReview?.author}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{lastReview?.date}</span>
                {lastReview?.rating && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-amber-400">
                      {"★".repeat(lastReview.rating)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Optional button row */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <button className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50">
            View all reviews
          </button>
          <button className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50">
            Improve rating tips
          </button>
        </div>
      </div>

      {/* Weekly Settlement Summary */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100">
        <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-3">
          Weekly Settlement Summary
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Earnings this week</span>
            <span className="font-semibold text-slate-900">
              {currency}
              {earningsThisWeek.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Paid out</span>
            <span className="font-semibold text-emerald-600">
              {currency}
              {paidOut.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Pending payout</span>
            <span className="font-semibold text-indigo-600">
              {currency}
              {pendingPayout.toLocaleString()}
            </span>
          </div>

          <div className="mt-2 rounded-xl bg-indigo-50 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-indigo-500 mb-1">
              Next Payout
            </p>
            <p className="text-xs sm:text-sm text-slate-800 font-medium">
              {nextPayoutDate}
            </p>
          </div>

          <div className="mt-1 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span>Last payout</span>
            <span>
              {currency}
              {lastPayoutAmount.toLocaleString()} &middot; {lastPayoutDate}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <button className="px-3 py-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
            View payout history
          </button>
          <button className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50">
            Download statement
          </button>
        </div>
      </div>
    </section>
  );
};
