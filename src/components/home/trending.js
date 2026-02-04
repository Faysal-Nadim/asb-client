import React from "react";

/**
 * @author
 * @function Trending
 **/

const dummyTrendingData = [
  {
    id: 1,
    title: "Trending Item 1",
    description: "Description for item 1",
    img: "https://i.etsystatic.com/46573542/r/il/bb3b0c/5459767748/il_600x600.5459767748_78t0.jpg",
  },
  {
    id: 2,
    title: "Trending Item 2",
    description: "Description for item 2",
    img: "https://i.etsystatic.com/24401391/r/il/77d32a/4980911045/il_600x600.4980911045_j25s.jpg",
  },
  {
    id: 3,
    title: "Trending Item 3",
    description: "Description for item 3",
    img: "https://i.etsystatic.com/14409281/r/il/985ded/4787959702/il_600x600.4787959702_qcpn.jpg",
  },
  {
    id: 4,
    title: "Trending Item 4",
    description: "Description for item 4",
    img: "https://i.etsystatic.com/21073754/r/il/7b41d9/4226609956/il_600x600.4226609956_qf2f.jpg",
  },
];

export const Trending = (props) => {
  return (
    <div className="py-4 w-full mx-auto">
      <div className="sm:mx-4 lg:mx-0 md:mx-0">
        <h2 className="text-2xl font-semibold">Explore What’s Trending</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
          {dummyTrendingData.map((item) => (
            <div
              key={item.id}
              className="hover:bg-white border border-white lg:hover:border-gray-100 rounded-xl lg:hover:shadow-lg transition-shadow duration-300 lg:p-2 cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg sm:hover:shadow-md lg:hover:shadow-none transition-shadow duration-300">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full lg:h-[380px] md:h-[300px] sm:h-full object-cover"
                />
              </div>
              <h3 className="text-lg text-center font-semibold mt-4">
                {item.title}
              </h3>
              <p className="text-sm text-center text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
