import React, { useRef } from "react";
import { star } from "../../assets/svg";
import { leftArrowIcon, rightArrowIcon } from "../../assets/SvgIcons";
import { useNavigate } from "react-router-dom";

/**
 * @author
 * @function Deals
 **/

const dummyPopularData = [
  {
    id: 1,
    title: "Product 1",
    img: "https://i.etsystatic.com/45781337/c/1622/1622/257/177/il/68108d/6295436067/il_600x600.6295436067_aplv.jpg",
    price: 19.99,
    currency: "USD",
    rating: 4.5,
    permalink: "product-1",
  },
  {
    id: 2,
    title: "Product 2",
    img: "https://i.etsystatic.com/24575237/r/il/1fa72b/6404109918/il_600x600.6404109918_rq9n.jpg",
    price: 29.99,
    currency: "USD",
    rating: 4.0,
    permalink: "product-2",
  },
  {
    id: 3,
    title: "Product 3",
    img: "https://i.etsystatic.com/14409281/r/il/985ded/4787959702/il_600x600.4787959702_qcpn.jpg",
    price: 39.99,
    currency: "USD",
    rating: 4.8,
    permalink: "product-3",
  },
  {
    id: 4,
    title: "Product 4",
    img: "https://i.etsystatic.com/12788147/c/1333/1059/0/518/il/5935b7/5795772079/il_600x600.5795772079_hls2.jpg",
    price: 49.99,
    currency: "USD",
    rating: 4.2,
    permalink: "product-4",
  },
  {
    id: 5,
    title: "Product 5",
    img: "https://i.etsystatic.com/12360908/c/2553/2027/186/383/il/b03306/2500653746/il_600x600.2500653746_kcts.jpg",
    price: 59.99,
    currency: "USD",
    rating: 4.0,
    permalink: "product-5",
  },
  {
    id: 6,
    title: "Product 6",
    img: "https://i.etsystatic.com/6054905/r/il/fb09a4/3574531004/il_600x600.3574531004_m2me.jpg",
    price: 69.99,
    currency: "USD",
    rating: 4.5,
    permalink: "product-6",
  },
];

export const Deals = (props) => {
  const scrollRef = useRef(null);
  const navigation = useNavigate();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8; // 80% of visible width
    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="py-4 w-full mx-auto">
      <div>
        {/* Title + buttons */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Today's deals</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              {leftArrowIcon}
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              {rightArrowIcon}
            </button>
          </div>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-4 py-6 overflow-x-auto hide-scrollbar scroll-smooth"
        >
          {dummyPopularData.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 hover:bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigation(`/product/${item.permalink}`)}
            >
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[280px] h-[280px] object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-sm font-semibold ">{item.title}</h3>
                  <div className="flex items-center gap-1">
                    <img
                      src={star}
                      alt="Rating"
                      className="w-4 h-4 text-yellow-500"
                    />
                    <p className="text-sm">{item.rating}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-md font-bold text-[#C97052] mt-1">
                    {item.currency} {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
