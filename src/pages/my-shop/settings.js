import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopSettings } from "../../redux/actions";
import { CDN } from "../../redux/helpers/urlConfig";
import { ShopImgModal } from "../../components/modal/shopImg";
import { ShopBannerModal } from "../../components/modal/shopBanner";

/**
 * @author
 * @function Settings
 **/

export const Settings = (props) => {
  const dispatch = useDispatch();

  const shop = useSelector((state) => state.shop);

  const [shopImgModal, setShopImgModal] = useState(false);
  const [shopBannerModal, setShopBannerModal] = useState(false);

  useEffect(() => {
    dispatch(getShopSettings());
  }, [dispatch]);

  const getCountryName = (code) => {
    if (!code) return null;
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code);
  };

  return (
    <div className="max-w-[1380px] mx-auto py-4 px-4">
      {/* Banner Upload */}
      <div className="lg:relative md:relative z-0 bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-bold">Shop Banner</h2>

        {shop?.shopSettings?.shopBanner?.path ? (
          <img
            src={`${CDN}${shop?.shopSettings?.shopBanner?.path}`}
            className="w-full h-40 object-cover rounded-lg"
            alt="Shop Banner"
          />
        ) : (
          <div className=" w-full h-40 bg-gray-200 rounded-lg"></div>
        )}
        <div
          onClick={() => setShopBannerModal(true)}
          className="absolute lg:block sm:hidden bottom-2 right-2 bg-black bg-opacity-70 p-2 rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h4l2-3h6l2 3h4v12H3V7z"
            />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </div>

        {/* <input type="file" onChange={(e) => handleImageChange(e, "banner")} /> */}
      </div>

      {/* Shop Info */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex items-center gap-4 my-4">
          <div className="lg:relative md:relative h-24 w-24">
            {shop?.shopSettings?.shopLogo?.path ? (
              <img
                src={`${CDN}${shop?.shopSettings?.shopLogo?.path}`}
                className="h-24 w-24 rounded-full"
                alt="Shop Logo"
              />
            ) : (
              <img
                src="https://placehold.co/200x200"
                className="h-24 w-24 rounded-full"
                alt="Shop Logo"
              />
            )}

            <div
              onClick={() => setShopImgModal(true)}
              className="absolute lg:block sm:hidden z-10 bottom-0 right-0 bg-black bg-opacity-70 p-2 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7h4l2-3h6l2 3h4v12H3V7z"
                />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-2">
              {shop?.shopSettings?.name}
            </h2>
            <p className="text-gray-600 text-sm">
              {getCountryName(shop?.shopSettings?.shopCountry)}
            </p>
            <div>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  shop?.shopSettings?.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {shop?.shopSettings?.status || "Unknown"}
              </span>
            </div>
          </div>
        </div>

        <Section>
          <Info label="Shop Type" value={shop?.shopSettings?.shopType} />

          <Info
            label="Language"
            value={shop?.shopSettings?.shopLang?.toUpperCase()}
          />
          <Info label="Currency" value={shop?.shopSettings?.shopCurr} />
          <Info
            label="Created At"
            value={new Date(shop?.shopSettings?.createdAt).toLocaleString()}
          />
        </Section>
      </div>

      {/* Owner Info */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <Section
          title="Owner Information"
          status={
            shop?.shopSettings?.verification?.verified
              ? "Verified"
              : "Unverified"
          }
        >
          <Info
            label="First Name"
            value={shop?.shopSettings?.ownerInfo?.firstName}
          />
          <Info
            label="Last Name"
            value={shop?.shopSettings?.ownerInfo?.lastName}
          />
          <Info label="Phone" value={shop?.shopSettings?.ownerInfo?.phone} />
          <Info
            label="Address"
            value={`${shop?.shopSettings?.ownerInfo?.street}, ${shop?.shopSettings?.ownerInfo?.city}, ${shop?.shopSettings?.ownerInfo?.country} ${shop?.shopSettings?.ownerInfo?.zip}`}
          />
        </Section>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <Section title="Commission">
          <Info
            label="Platform Fee"
            value={shop?.shopSettings?.commission?.platform + " %"}
          />
          <Info
            label="Payment Processing Fee"
            value={shop?.shopSettings?.commission?.payment + " %"}
          />
          <Info
            label="Shipping & Handling Fee"
            value={shop?.shopSettings?.commission?.handling + " %"}
          />
          <Info
            label="Shop Payout Fee"
            value={shop?.shopSettings?.commission?.payout + " %"}
          />
        </Section>
      </div>

      <ShopImgModal
        isOpen={shopImgModal}
        onClose={() => setShopImgModal(false)}
      />

      <ShopBannerModal
        isOpen={shopBannerModal}
        onClose={() => setShopBannerModal(false)}
      />
    </div>
  );
};

const Section = ({ title, status, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      {status && (
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${
            status === "Verified"
              ? "bg-green-200 text-black-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      )}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-900 break-all">{value}</p>
  </div>
);
