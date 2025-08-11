import React from "react";
import { Hero } from "../components/home/hero";
import { Trending } from "../components/home/trending";
import { Popular } from "../components/home/popular";
import { Deals } from "../components/home/deals";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  return (
    <div className="py-8 max-w-[1380px] mx-auto">
      <Hero />

      <Trending />

      <Popular />

      <Deals />
    </div>
  );
};
