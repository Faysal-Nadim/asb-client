import React, { useEffect } from "react";
import ProductGallery from "../components/product/gallery";
import ProductInfo from "../components/product/info";
import ProductPurchase from "../components/product/purchase";
import ReviewsSection from "../components/product/review";

/**
 * @author
 * @function Product
 **/

const media = [
  {
    id: 1,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Pink slippers ring view",
  },
  {
    id: 2,
    type: "video",
    src: "/videos/p1.mp4",
    thumb: "/images/p1_video_thumb.jpg",
    alt: "Demo video",
  },
  {
    id: 3,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Blue slippers ring view",
  },
  {
    id: 4,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Green slippers ring view",
  },
  {
    id: 5,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Blue slippers ring view",
  },
  {
    id: 6,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Blue slippers ring view",
  },
  {
    id: 7,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Blue slippers ring view",
  },
  {
    id: 8,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Blue slippers ring view",
  },
  {
    id: 9,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Blue slippers ring view",
  },
  {
    id: 10,
    type: "image",
    src: "https://placehold.co/780x520",
    thumb: "https://placehold.co/150x150",
    alt: "Blue slippers ring view",
  },
];

const dummyReviews = [
  {
    id: 1,
    rating: 5,
    recommends: true,
    userName: "Kathleen",
    userBadgeColor: "#f59e0b",
    dateISO: "2025-08-10",
    text: "Excellent slippers! ... I just ordered another pair for myself in peach...",
    photo: "https://picsum.photos/seed/rev1/96",
    tags: ["Great quality", "As described"],
    cats: ["quality", "appearance"],
  },
  {
    id: 2,
    rating: 5,
    recommends: true,
    userName: "Erin Walker",
    userBadgeColor: "#f97316",
    dateISO: "2025-08-08",
    text: "These are the perfect gift ... Everyone said to size up ...",
    tags: ["Perfect for wedding", "Gift-worthy"],
    cats: ["packaging", "accuracy"],
  },
  {
    id: 3,
    rating: 5,
    recommends: true,
    userName: "Katie Beech",
    dateISO: "2025-08-07",
    text: "Lovely item, great gift for wedding day",
    cats: ["quality"],
  },
  {
    id: 4,
    rating: 5,
    recommends: true,
    userName: "Bianca Montoya",
    dateISO: "2025-08-06",
    text: "We loved them! ... Definitely met our expectations!",
    photo: "https://picsum.photos/seed/rev4/96",
    cats: ["appearance"],
  },
];

export const Product = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8 max-w-[1380px] mx-auto">
      <div className="lg:grid md:grid md:grid-cols-5 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 md:col-span-3">
          <ProductGallery media={media} badge="Best Deal" />

          <div className="mt-10">
            <ReviewsSection reviews={dummyReviews} />
          </div>
        </div>

        <div className="lg:col-span-2 md:col-span-2">
          <ProductInfo
            price={3.0}
            strikePrice={10.73}
            discountPct={72}
            saleEndsAt={
              Date.now() + 19 * 60 * 60 * 1000 + 45 * 60 * 1000 + 12 * 1000
            }
            shop={{ name: "peaspinkmemory", verified: true, rating: 4.4 }}
            colorSizeOptions={["S (US 5-6)", "M (US 7-8)", "L (US 9-10)"]}
            fontColorOptions={["Gold", "Silver", "White", "Black"]}
          />

          <div className="mt-6">
            <ProductPurchase
              onAddToCart={({ qty }) => {
                // your handler …
                console.log("Add to cart", qty);
              }}
              maker="peaspinkmemory"
              highlights={[
                "Made by peaspinkmemory",
                "Order your custom bridal slippers today and show off your bridal party in style!",
                "SIZES: XS to XL available",
              ]}
              eta={{
                start: new Date("2025-08-21"),
                end: new Date("2025-08-27"),
              }}
              returnsAccepted={false}
              shippingCostText="USD 5.99"
              shipsFrom="China"
              destination="Bangladesh"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
