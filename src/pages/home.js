import React from "react";
import { Hero } from "../components/home/hero";
import { Trending } from "../components/home/trending";
import { Popular } from "../components/home/popular";
import { Deals } from "../components/home/deals";
import { usePageLoading } from "../components/context/loading";
import { LoadingModal } from "../components/modal/loading";

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
