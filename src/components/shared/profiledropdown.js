import React, { useEffect, useRef, useState } from "react";
import {
  logOutIconSmall,
  messageIconSmall,
  settingsIconSmall,
  userIconSmall,
} from "../../assets/SvgIcons";
import { Link } from "react-router-dom";
// removed lucide-react to keep it plain JS (no extra deps)

const profileLinks = [
  { icon: userIconSmall, label: "My Account", link: "/user/account" },
  { icon: messageIconSmall, label: "Messages", link: "/user/messages" },
  { icon: settingsIconSmall, label: "Settings", link: "/user/settings" },
];

export default function MinimalDropdown({
  avatarUrl = "https://i.pravatar.cc/100?img=12",
  userName = "Ali Store BD",
  children,
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const toggle = () => setOpen((o) => !o);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function maybeCloseOnBlur() {
    const root = menuRef.current?.parentElement;
    requestAnimationFrame(() => {
      if (root && !root.contains(document.activeElement)) setOpen(false);
    });
  }

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        className="flex items-center gap-1 rounded-full px-1 py-1 hover:bg-gray-200"
      >
        <img
          src={avatarUrl}
          alt="User avatar"
          className="h-7 w-7 rounded-full object-cover"
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M5.25 7.75L10 12.5l4.75-4.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Profile menu"
          tabIndex={-1}
          onBlur={maybeCloseOnBlur}
          className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-gray-200 bg-white shadow-xl"
        >
          {children ? (
            children
          ) : (
            <ul className="p-2" role="none">
              {profileLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.link}
                  target="_self"
                  onClick={toggle}
                >
                  <button
                    role="menuitem"
                    className="w-full rounded-lg px-3 py-2 font-medium text-md text-left hover:bg-gray-100 flex items-center gap-2"
                  >
                    {item.icon} {item.label}
                  </button>
                </Link>
              ))}

              <li onClick={toggle}>
                <button
                  role="menuitem"
                  className="w-full rounded-lg px-3 py-2 font-medium text-md text-left hover:bg-gray-100 flex items-center gap-2"
                >
                  {logOutIconSmall} Sign out
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
