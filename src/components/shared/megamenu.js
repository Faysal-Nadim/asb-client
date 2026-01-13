// Components/MegaMenu.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trippleBarIcon } from "../../assets/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions";
import { CDN } from "../../redux/helpers/urlConfig";

export default function MegaMenu() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  const [open, setOpen] = useState(false);
  const [anim, setAnim] = useState(false); // for fade/slide
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapRef = useRef(null);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  function fetchCategories() {
    dispatch(getAllCategories());
  }

  // Open with animation
  const openMenu = () => {
    setOpen(true);
    requestAnimationFrame(() => setAnim(true));
    if (categories.length === 0) fetchCategories();
  };
  // Close with animation
  const closeMenu = () => {
    setAnim(false);
    setTimeout(() => setOpen(false), 150); // match duration-150
  };

  // Outside click + Esc
  useEffect(() => {
    function onDocDown(e) {
      if (!open) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // Focus trap while open
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = panel.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    // focus first focusable (first category)
    first?.focus();

    function onKeydown(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    panel.addEventListener("keydown", onKeydown);
    return () => panel.removeEventListener("keydown", onKeydown);
  }, [open]);

  // Arrow key navigation for left list
  const onCatKey = (e, i) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next =
        e.key === "ArrowDown"
          ? Math.min(categories.length - 1, i + 1)
          : Math.max(0, i - 1);
      setActiveIndex(next);
      const nextBtn = wrapRef.current.querySelector(
        `[data-cat-index="${next}"]`
      );
      nextBtn?.focus();
    }
    if (e.key === "ArrowRight") {
      // jump to first card on right
      const firstCard = panelRef.current.querySelector('[data-card="true"]');
      firstCard?.focus();
    }
  };

  return (
    <div className="relative" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => (open ? closeMenu() : openMenu())}
        aria-haspopup="menu"
        aria-expanded={open}
        // className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-50"
      >
        <div
          className={`flex items-center gap-1 ml-6 hover:cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-full ${
            open && "bg-gray-200"
          }`}
        >
          {trippleBarIcon}{" "}
          <p className="text-[14px] font-semibold text-black">Categories</p>
        </div>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label="Categories"
          className={[
            "absolute z-50 mt-3 w-[860px] bg-white shadow-2xl rounded-2xl border overflow-hidden outline-none",
            "transition duration-150",
            anim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
        >
          <div className="flex">
            {/* Left: categories */}
            <div className="w-72 max-h-[70vh] overflow-auto border-r p-2">
              <ul className="space-y-1">
                {categories.map((cat, i) => (
                  <li key={cat.name}>
                    <button
                      type="button"
                      data-cat-index={i}
                      onClick={() => setActiveIndex(i)}
                      onKeyDown={(e) => onCatKey(e, i)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 ${
                        activeIndex === i ? "bg-gray-100 font-medium" : ""
                      }`}
                    >
                      {cat.name}
                      <svg
                        className="opacity-60"
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7 5l6 5-6 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: grid */}
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  All {categories[activeIndex]?.name}
                </h3>
                <Link
                  to={`/c/${encodeURIComponent(
                    categories[activeIndex]?.slug || ""
                  )}`}
                  className="text-sm font-medium text-gray-700 hover:underline"
                  onClick={closeMenu}
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {categories[activeIndex]?.children?.map((it) => (
                  <Link
                    key={it.id}
                    to={
                      it.slug
                        ? `/c/${encodeURIComponent(
                            categories[activeIndex]?.slug
                          )}/${encodeURIComponent(it.slug)}`
                        : "#"
                    }
                    data-card="true"
                    className="group rounded-xl border border-gray-100 hover:shadow-md transition p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={closeMenu}
                  >
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={`${CDN}${it.img.path}`}
                        alt={it.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-800">{it.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="h-2" />
        </div>
      )}
    </div>
  );
}
