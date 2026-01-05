import React from "react";
import {
  cartIcon,
  searchIcon,
  shopIcon,
  userIcon,
  wishListIcon,
} from "../../assets/SvgIcons";
import { Link, useNavigate } from "react-router-dom";
import { logo_black } from "../../assets";
import MegaMenu from "./megamenu";
import MinimalDropdown from "./profiledropdown";
import axiosInstance from "../../redux/helpers/axios";
import { useSelector } from "react-redux";
import { usePageLoading } from "../context/loading";
import { errorToast } from "../../utils/toast";
import { store } from "../../redux";
import { userSignOut } from "../../redux/actions";

/**
 * @author
 * @function Navbar
 **/

export const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = store.dispatch;

  const { setPageLoading } = usePageLoading();

  const auth = useSelector((state) => state.auth);

  const openShopManager = async () => {
    setPageLoading(true);
    try {
      if (!auth?.authenticate) {
        navigate(
          `/user/auth?tab=login&redirect=${encodeURIComponent(
            "/merchant/onboarding"
          )}`
        );
        return;
      }
      const res = await axiosInstance.get(`/user/services/validate-shop`);
      if (res.status === 200) {
        const { hasActiveShop, shopStatus, shop } = res.data;
        if (hasActiveShop && shopStatus === "ACTIVE") {
          navigate("/my-shop/dashboard");
        } else if (!hasActiveShop && shopStatus !== "ACTIVE") {
          navigate("/merchant/onboarding/status", {
            state: { shopStatus, shop },
          });
        } else {
          navigate("/merchant/onboarding?step=0");
        }
      }
    } catch (error) {
      const data = error?.response?.data;
      if (data?.error === "SHOP_NOT_FOUND") {
        navigate("/merchant/onboarding?step=0");
      } else {
        errorToast(
          data?.msg || "Could not open Shop Manager. Please try again later."
        );
        dispatch(userSignOut());
        navigate(
          `/user/auth?tab=login&redirect=${encodeURIComponent(
            "/merchant/onboarding"
          )}`
        );
      }
    } finally {
      setPageLoading(false);
    }
  };

  const navIcons = [
    { icon: wishListIcon, link: "/wishlist", title: "Wishlist" },
    { icon: shopIcon, onClick: openShopManager, title: "Shop Manager" },
    { icon: userIcon, link: "", title: "Your Account" },
    { icon: cartIcon, link: "/cart", title: "Cart" },
  ];
  return (
    <nav className="w-full bg-primary">
      <div className="flex items-center justify-between py-3 max-w-[1380px] mx-auto">
        {/* Logo and Categories */}
        <div className="flex items-center">
          <Link to={"/"}>
            <img src={logo_black} height={28} width={123} alt="Aleeha Logo" />
          </Link>
          <MegaMenu />
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-1/2">
          <div className="flex items-center border border-2 border-[#222222] rounded-full w-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for anything"
              className="flex-grow px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-[#2F5651] transform transition-transform duration-200 hover:scale-110 p-2 rounded-full mr-1">
              {searchIcon}
            </button>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-2">
          {navIcons.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.link ? (
                  <Link
                    to={item.link}
                    title={item.title}
                    className="mx-2 hover:bg-gray-200 px-2 py-2 rounded-full"
                  >
                    {item.icon}
                  </Link>
                ) : item.onClick ? (
                  <button
                    type="button"
                    onClick={item.onClick}
                    title={item.title}
                    className="mx-2 hover:bg-gray-200 px-2 py-2 rounded-full"
                  >
                    {item.icon}
                  </button>
                ) : (
                  <MinimalDropdown />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* Bottom Border */}
      <div className="border-b border-2 border-grey-300 w-full" />
    </nav>
  );
};
