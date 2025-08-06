import React from "react";
import { fb, ig } from "../../assets/svg";
import { Link } from "react-router-dom";
import { logo_black } from "../../assets";

const links = [
  { text: "Privacy Policy", url: "/privacy-policy" },
  { text: "Terms & Conditions", url: "/terms" },
  { text: "Sitemap", url: "/sitemap" },
];
const footerData = [
  {
    title: "Shop",
    id: "shop-nav",
    links: [
      {
        text: "Categories",
        href: "/shop/categories",
      },
      {
        text: "Top Picks",
        href: "/shop/top-picks",
      },
      {
        text: "New Arrivals",
        href: "/shop/new-arrivals",
      },
      {
        text: "Featured",
        href: "/shop/featured",
      },

      {
        text: "Sale",
        href: "/shop/sale",
      },
      {
        text: "Gift Cards",
        href: "/shop/gift-cards",
      },
    ],
  },
  {
    title: "Sell",
    id: "sell-nav",
    links: [
      { text: "Become a Seller", href: "#" },
      { text: "Seller Terms", href: "#" },
      { text: "Seller Handbook", href: "#" },
      { text: "Seller Support", href: "#" },
      { text: "Seller Community", href: "#" },
      { text: "Seller Resources", href: "#" },
    ],
  },
  {
    title: "Company",
    id: "company-nav",
    links: [
      { text: "About Us", href: "/about-us" },
      { text: "Careers", href: "/careers" },
      { text: "Press", href: "#" },
      { text: "Contact", href: "/contact-us" },
      { text: "Shipping", href: "/shipping-policy" },
      { text: "Returns", href: "/return-policy" },
    ],
  },
  {
    title: "Help",
    id: "help-nav",
    content: (
      <div>
        <div className="flex flex-col space-y-2">
          <Link to="/help" className="text-black hover:underline text-[14px]">
            Help Center
          </Link>
          <Link to="/faq" className="text-black hover:underline text-[14px]">
            FAQ
          </Link>
        </div>
        <div className="flex flex-wrap space-x-6 mt-4">
          <Link to={"#"} target="_blank" className="hover:text-white">
            <img
              src={fb}
              className="h-8 w-8 bg-primary rounded-full p-1"
              alt=""
            />
          </Link>

          <Link to={"#"} target="_blank" className="hover:text-white">
            <img
              src={ig}
              className="h-8 w-8 bg-primary rounded-full p-1"
              alt=""
            />
          </Link>
        </div>
      </div>
    ),
  },
];

/**
 * @author
 * @function Footer
 **/

export const Footer = (props) => {
  return (
    <footer className="bg-gray-100 w-full ">
      <div
        style={{ maxWidth: 1380 }}
        className=" mx-auto  lg:px-2 md:px-4 sm:px-4 lg:py-8 md:py-6 sm:py-4"
      >
        <div className="lg:hidden md:hidden sm:flex flex-col justify-center items-center col-span-1 space-y-4 mb-4">
          <img
            src={logo_black}
            height={56}
            width={246}
            alt="Aleeha Logo"
            className="mb-4"
          />

          <p className="text-[14px] text-center text-black">
            At Aleeha, we curate authentic, artisan-made pieces rooted in
            tradition and elevated by design. Every product tells a story worth
            sharing.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 lg:gap-16 md:gap-12 sm:gap-8">
          {/* <div className="bg-[#CCEBFF] rounded"></div> */}

          <div className="lg:block md:block sm:hidden col-span-1 space-y-4 mb-4">
            <img
              src={logo_black}
              height={56}
              width={246}
              alt="Aleeha Logo"
              className="mb-4"
            />

            <p className="text-[14px] text-center text-black">
              At Aleeha, we curate authentic, artisan-made pieces rooted in
              tradition and elevated by design. Every product tells a story
              worth sharing.
            </p>
          </div>

          {footerData?.map((section, index) => (
            <div key={index} className="space-y-2">
              <h2 id={section?.id} className="text-[16px] font-semibold mb-3">
                {section?.title}
              </h2>
              <nav aria-labelledby={section?.id}>
                {section?.links ? (
                  <ul className="list-none space-y-1">
                    {section?.links?.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {link?.href ? (
                          <Link
                            to={link?.href}
                            className="text-black hover:underline text-[14px]"
                          >
                            {link?.text}
                          </Link>
                        ) : link?.type === "button" ? (
                          <button
                            className="text-black hover:underline text-[14px]"
                            type="button"
                          >
                            {link?.text}
                          </button>
                        ) : (
                          <span className="text-black flex items-center space-x-1 text-[14px]">
                            <i className={`i-${link?.icon}`}></i>
                            <span>{link?.text}</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>{section?.content}</div>
                )}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black">
        {/* Left Links */}

        <div className="flex max-w-[1380px] mx-auto justify-between w-full lg:flex-row md:flex-row sm:flex-col gap-8 lg:items-center md:items-center sm:items-center py-6">
          <div>
            <p className="text-sm text-white">
              © {new Date().getFullYear()} Aleeha. All rights reserved.
            </p>
          </div>
          <div className="flex text-white lg:flex-row md:flex-row sm:flex-row gap-4 lg:text-sm md:text-sm sm:text-xs">
            {links.map((link, index) => (
              <Link key={index} to={link.url} className="hover:text-white">
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
