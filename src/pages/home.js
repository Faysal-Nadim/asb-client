import React, { useEffect } from "react";
import { Hero } from "../components/home/hero";
import { Trending } from "../components/home/trending";
import { Popular } from "../components/home/popular";
import { Deals } from "../components/home/deals";
import { usePageLoading } from "../components/context/loading";
import { LoadingModal } from "../components/modal/loading";
import { OurServices } from "../components/home/services";

/**
 * @author
 * @function Home
 **/

export const Home = () => {
  const { pageLoading } = usePageLoading();

  useEffect(() => {
    document.title = "Home - Ali Store BD | International Shopping Solution";
  }, []);

  return (
    <div className="relative py-4 max-w-[1380px] mx-auto">
      {pageLoading && <LoadingModal text="Loading..." />}

      <Hero />

      <Popular />

      <div className="sm:mx-4 lg:mx-0 md:mx-0">
        <OurServices />
      </div>

      <Trending />

      <Deals />
    </div>
  );
};
