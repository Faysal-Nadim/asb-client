import React, { useEffect, useMemo, useState } from "react";
import { star } from "../assets/svg";
import { TrashIcon } from "../assets/SvgIcons";

/**
 * @author
 * @function Cart
 **/

function Select({ label, value, onChange, options }) {
  return (
    <div>
      {label && (
        <label className="block text-sm text-gray-700 mb-1">{label}</label>
      )}
      <div className="relative">
        <select
          className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export const Cart = ({ maxQty = 10, onAddToCart = () => {} }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [qty, setQty] = useState("1");

  const qtyOptions = useMemo(
    () =>
      Array.from({ length: maxQty }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1),
      })),
    [maxQty]
  );

  return (
    <div className="p-8 max-w-[1380px] mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      <div className="flex gap-8">
        <div className="w-2/3 flex flex-col gap-6">
          <div className="border border-1 rounded-lg">
            <div className="flex items-center gap-3 p-4">
              <img
                src="https://i.etsystatic.com/21008709/r/isla/d15f45/64075550/isla_75x75.64075550_t9opw4pa.jpg"
                alt="Item 1"
                className="w-[35px] h-[35px] rounded-lg"
              />

              <p className="text-md font-semibold">Store Name</p>
              <p className="text-sm font-medium flex items-center gap-2">
                <img src={star} alt="Star" className="inline-block w-3 h-3" />
                <p>
                  4.8 <span className="text-sm text-gray-600">(59)</span>
                </p>
              </p>
            </div>

            <div className="w-full flex justify-between px-4 pb-4">
              <div className="flex gap-4">
                <img
                  src="https://placehold.co/780x520"
                  alt="Item 1"
                  className="w-[200px] h-[160px] rounded-lg object-cover"
                />

                <div className="flex flex-col justify-evenly">
                  <div className="flex flex-col items-start">
                    <h2 className="text-md font-medium line-clamp-1">
                      Adjustable White Shell Pearls Bracelet, luxury Gol...
                    </h2>
                    <div className="bg-gray-200 px-3 py-1 rounded-full mt-2">
                      <p className="text-[12px] font-semibold text-gray-700">
                        Material: Pearl
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold text-[#2F5651]">
                        US$45.00
                      </p>
                      <p className="text-[13px] text-gray-600 line-through">
                        US$45.00
                      </p>
                      <p className="bg-[#2F5651] px-2 rounded-full text-[12px] text-white font-semibold">
                        14% off
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p>
                      <span className="text-sm font-semibold">Delivery:</span>{" "}
                      FREE (Get it by 10-18 Sept)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-around gap-4">
                <div className="flex items-center rounded-full gap-6 border px-2">
                  <div className="cursor-pointer text-xl">-</div>
                  <p className="font-medium">5</p>
                  <div className="cursor-pointer text-xl">+</div>
                </div>
                <div>{TrashIcon}</div>
              </div>
            </div>
          </div>

          <div className="border border-1 rounded-lg">
            <div className="flex items-center gap-3 p-4">
              <img
                src="https://i.etsystatic.com/21008709/r/isla/d15f45/64075550/isla_75x75.64075550_t9opw4pa.jpg"
                alt="Item 1"
                className="w-[35px] h-[35px] rounded-lg"
              />

              <p className="text-md font-semibold">Store Name</p>
              <p className="text-sm font-medium flex items-center gap-2">
                <img src={star} alt="Star" className="inline-block w-3 h-3" />
                <p>
                  4.8 <span className="text-sm text-gray-600">(59)</span>
                </p>
              </p>
            </div>

            <div className="w-full flex justify-between px-4 pb-4">
              <div className="flex gap-4">
                <img
                  src="https://placehold.co/780x520"
                  alt="Item 1"
                  className="w-[200px] h-[160px] rounded-lg object-cover"
                />

                <div className="flex flex-col justify-evenly">
                  <div className="flex flex-col items-start">
                    <h2 className="text-md font-medium line-clamp-1">
                      Adjustable White Shell Pearls Bracelet, luxury Gol...
                    </h2>
                    <div className="bg-gray-200 px-3 py-1 rounded-full mt-2">
                      <p className="text-[12px] font-semibold text-gray-700">
                        Material: Pearl
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold text-[#2F5651]">
                        US$45.00
                      </p>
                      <p className="text-[13px] text-gray-600 line-through">
                        US$45.00
                      </p>
                      <p className="bg-[#2F5651] px-2 rounded-full text-[12px] text-white font-semibold">
                        14% off
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p>
                      <span className="text-sm font-semibold">Delivery:</span>{" "}
                      FREE (Get it by 10-18 Sept)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-around gap-4">
                <div className="flex items-center rounded-full gap-6 border px-2">
                  <div className="cursor-pointer text-xl">-</div>
                  <p className="font-medium">5</p>
                  <div className="cursor-pointer text-xl">+</div>
                </div>
                <div>{TrashIcon}</div>
              </div>
            </div>
          </div>

          <div className="border border-1 rounded-lg">
            <div className="flex items-center gap-3 p-4">
              <img
                src="https://i.etsystatic.com/23860310/r/isla/2902ea/74189424/isla_75x75.74189424_5rpdnivn.jpg"
                alt="Item 1"
                className="w-[35px] h-[35px] rounded-lg"
              />

              <p className="text-md font-semibold">Store Name</p>
              <p className="text-sm font-medium flex items-center gap-2">
                <img src={star} alt="Star" className="inline-block w-3 h-3" />
                <p>
                  4.8 <span className="text-sm text-gray-600">(5.1K)</span>
                </p>
              </p>
            </div>

            <div className="w-full flex justify-between px-4">
              <div className="flex gap-4">
                <img
                  src="https://placehold.co/780x520"
                  alt="Item 1"
                  className="w-[200px] h-[160px] rounded-lg object-cover"
                />

                <div className="flex flex-col justify-between">
                  <div className="flex flex-col items-start">
                    <h2 className="text-md font-medium line-clamp-1">
                      Adjustable White Shell Pearls Bracelet, luxury Gol...
                    </h2>
                    <div className="bg-gray-200 px-3 py-1 rounded-full mt-2">
                      <p className="text-[12px] font-semibold text-gray-700">
                        Material: Pearl
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full">
                    <div className="grid grid-cols-1 gap-3 w-1/4">
                      <Select
                        // label="Quantity"
                        value={qty}
                        onChange={setQty}
                        options={qtyOptions}
                      />
                    </div>

                    <div className="text-sm font-semibold hover:bg-gray-200 py-2 px-3 rounded-full cursor-pointer">
                      Save for later
                    </div>
                    <div className="text-sm font-semibold hover:bg-gray-200 py-2 px-3 rounded-full cursor-pointer">
                      Remove
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className="bg-[#2F5651] px-2 rounded-full text-[12px] text-white font-semibold">
                  14% off
                </p>
                <p className="text-xl font-semibold text-[#2F5651] mt-1">
                  US$45.00
                </p>
                <p className="text-[13px] text-gray-600 line-through">
                  US$45.00
                </p>
              </div>
            </div>

            <div className="mt-4 border-t p-4">
              <p>
                <span className="font-semibold">Delivery:</span> FREE (Get it by
                10-18 Sept)
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 p-4">Item 2</div>
      </div>
    </div>
  );
};
