import React from "react";

/**
 * @author
 * @function Popular
 **/

const dummyPopularData = [
  {
    id: 1,
    title: "Popular Category 1",
    img: "https://i.etsystatic.com/45781337/c/1622/1622/257/177/il/68108d/6295436067/il_600x600.6295436067_aplv.jpg",
  },
  {
    id: 2,
    title: "Popular Category 2",
    img: "https://i.etsystatic.com/24575237/r/il/1fa72b/6404109918/il_600x600.6404109918_rq9n.jpg",
  },
  {
    id: 3,
    title: "Popular Category 3",
    img: "https://i.etsystatic.com/14409281/r/il/985ded/4787959702/il_600x600.4787959702_qcpn.jpg",
  },
  {
    id: 4,
    title: "Popular Category 4",
    img: "https://i.etsystatic.com/12788147/c/1333/1059/0/518/il/5935b7/5795772079/il_600x600.5795772079_hls2.jpg",
  },
  {
    id: 5,
    title: "Popular Category 5",
    img: "https://i.etsystatic.com/12360908/c/2553/2027/186/383/il/b03306/2500653746/il_600x600.2500653746_kcts.jpg",
  },
  {
    id: 6,
    title: "Popular Category 6",
    img: "https://i.etsystatic.com/6054905/r/il/fb09a4/3574531004/il_600x600.3574531004_m2me.jpg",
  },
];

export const Popular = (props) => {
  return (
    <div className="py-8 w-full mx-auto">
      <div>
        <h2 className="text-2xl font-semibold">Popular Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
          {dummyPopularData.map((item) => (
            <div
              key={item.id}
              className="hover:bg-white border border-white hover:border-gray-100 rounded-xl hover:shadow-lg transition-shadow duration-300 p-2 cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[245px] object-cover"
                />
              </div>
              <h3 className="text-md text-center font-semibold mt-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
