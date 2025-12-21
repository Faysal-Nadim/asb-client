import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * @author
 * @function StepOne
 **/

export const StepOne = ({
  setSteps,
  shopLang,
  setShopLang,
  shopCountry,
  setShopCountry,
  shopCurr,
  setShopCurr,
}) => {
  const navigate = useNavigate();

  const handleSaveAndContinue = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === 0
          ? { ...step, status: "done" }
          : index === 1
          ? { ...step, status: "current" }
          : step
      )
    );
    navigate("/merchant/onboarding?step=1");
  };

  return (
    <div className="p-8 max-w-[1380px] mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-semibold ">Shop preferences</h2>
        <p className="text-gray-700">
          Let's get started! Tell us about you and your shop.
        </p>
      </div>

      <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-[160px_1fr] items-center gap-3">
              <label
                htmlFor="shopLanguage"
                className="text-sm font-medium text-gray-700"
              >
                Shop language <span className="text-red-500">*</span>
              </label>
              <div>
                <select
                  id="shopLanguage"
                  name="shopLanguage"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled
                  value={shopLang}
                  onChange={(e) => setShopLang(e.target.value)}
                >
                  <option value={"en"}>English</option>
                  {/* <option value={"bn"}>বাংলা (Bangla)</option>
                  <option value={"fr"}>Français</option>
                  <option value={"de"}>Deutsch</option> */}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] items-center gap-3">
              <label
                htmlFor="shopCountry"
                className="text-sm font-medium text-gray-700"
              >
                Shop country <span className="text-red-500">*</span>
              </label>
              <div>
                <select
                  id="shopCountry"
                  name="shopCountry"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  value={shopCountry}
                  onChange={(e) => setShopCountry(e.target.value)}
                >
                  <option value={"BD"}>Bangladesh</option>
                  <option disabled>India</option>
                  <option disabled>Bhutan</option>
                  <option disabled>Myanmar</option>
                  <option disabled>Pakistan</option>
                  <option disabled>Sri Lanka</option>
                  <option disabled>Vietnam</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] items-center gap-3">
              <label
                htmlFor="shopCurrency"
                className="text-sm font-medium text-gray-700"
              >
                Shop currency <span className="text-red-500">*</span>
              </label>
              <div>
                <select
                  id="shopCurrency"
                  name="shopCurrency"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  value={shopCurr}
                  onChange={(e) => setShopCurr(e.target.value)}
                >
                  <option value={"BDT"}>৳ Bangladeshi Taka</option>
                  <option value={"GBP"}>£ British Pound</option>
                  <option value={"USD"}>$ US Dollar</option>
                  <option value={"EUR"}>€ Euro</option>
                </select>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-5 md:pl-6">
            <p>
              The default language you’ll use to describe your items. Choose
              carefully! We only support English for now.
            </p>
            <p>
              Tell us where your shop is based. Don’t see your country? We may
              not be available there right now, but stay tuned.
            </p>
            <p>
              The currency you’ll use to price the items you sell. Buyers will
              automatically see prices in their local currency.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div
          onClick={handleSaveAndContinue}
          className="rounded-full bg-black py-3 px-6 hover:shadow-lg hover:shadow-black/40 cursor-pointer"
        >
          <p className="text-md font-semibold text-white">Save & continue</p>
        </div>
      </div>
    </div>
  );
};
