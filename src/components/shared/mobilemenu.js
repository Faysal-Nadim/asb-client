// Components/MegaMenu.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trippleBarIcon } from "../../assets/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions";
import { CDN } from "../../redux/helpers/urlConfig";

export default function MobileMegaMenu({ mobile = false, open, onClose }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!categories.length) dispatch(getAllCategories());
  }, [categories.length, dispatch]);

  /* ===================== DESKTOP ===================== */
  if (!mobile) {
    return (
      <div className="relative hidden md:block">
        <button className="flex items-center gap-1 ml-6 px-4 py-2 rounded-full hover:bg-gray-200">
          {trippleBarIcon}
          <p className="text-sm font-semibold">Categories</p>
        </button>

        <div className="absolute z-50 mt-3 w-[860px] bg-white rounded-2xl shadow-xl border">
          <div className="flex">
            <div className="w-72 border-r p-3">
              {categories.map((cat, i) => (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActive(i)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex-1 p-6 grid grid-cols-3 gap-6">
              {categories[active]?.children?.map((child) => (
                <Link
                  key={child.id}
                  to={`/c/${categories[active].slug}/${child.slug}`}
                  className="border rounded-xl p-3 hover:shadow"
                >
                  <img
                    src={`${CDN}${child.img.path}`}
                    className="rounded-lg aspect-square object-cover"
                    alt={child.name}
                  />
                  <p className="mt-2 text-sm">{child.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ===================== MOBILE ===================== */
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto p-4 animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <button onClick={onClose} className="text-xl">
                ✕
              </button>
            </div>

            {categories.map((cat, i) => (
              <div key={cat.id} className="border-b">
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full flex justify-between items-center py-3 font-medium"
                >
                  {cat.name}
                  <span>{active === i ? "−" : "+"}</span>
                </button>

                {active === i && (
                  <div className="pl-4 pb-3 space-y-2">
                    {cat.children?.map((child) => (
                      <Link
                        key={child.id}
                        to={`/c/${cat.slug}/${child.slug}`}
                        onClick={onClose}
                        className="block text-sm text-gray-700"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
