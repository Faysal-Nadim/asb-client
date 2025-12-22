import React from "react";
import { Hero } from "../components/home/hero";
import { Trending } from "../components/home/trending";
import { Popular } from "../components/home/popular";
import { Deals } from "../components/home/deals";
import { usePageLoading } from "../components/context/loading";

/**
 * @author
 * @function Home
 **/

export const Home = () => {
  const { pageLoading } = usePageLoading();

  return (
    <div className="relative py-8 max-w-[1380px] mx-auto">
      {pageLoading && <LoadingModal text="Loading..." />}

      <Hero />

      <Trending />

      <Popular />

      <Deals />
    </div>
  );
};

const LoadingModal = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
            <div>
              <p className="text-sm font-semibold text-slate-800">{text}</p>
              <p className="text-xs text-slate-500">Please wait a moment…</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
