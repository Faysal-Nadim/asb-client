// components/ProductGallery.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * media: Array of { id, type: 'image'|'video', src, alt? , thumb? }
 * badge: optional text badge (e.g., "Etsy's Pick")
 * initialIndex: number
 * onChange: (index) => void
 */
export default function ProductGallery({
  media = [],
  badge,
  initialIndex = 0,
  onChange,
}) {
  const [index, setIndex] = useState(initialIndex);
  const [fav, setFav] = useState(false);
  const viewerRef = useRef(null);
  const thumbsRef = useRef(null);

  const total = media.length;
  const current = media[index];

  useEffect(() => {
    onChange?.(index);
    // keep the active thumb in view
    const el = thumbsRef.current?.querySelector(`[data-thumb="${index}"]`);
    el?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [index, onChange]);

  const go = (dir) => setIndex((i) => (i + dir + total) % total);
  // const set = (i) => setIndex(i);

  // swipe support
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    let startX = 0,
      //   startY = 0,
      moved = false;
    const onTouchStart = (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      //   startY = t.clientY;
      moved = false;
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (Math.abs(t.clientX - startX) > 8) moved = true;
    };
    const onTouchEnd = (e) => {
      if (!moved) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      if (dx < -30) go(+1);
      if (dx > 30) go(-1);
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  });

  const isVideo = current?.type === "video";

  const scrollThumbs = (dir = 1) => {
    const el = thumbsRef.current;
    if (!el) return;
    const step = 140; // ~one thumb height (+gap)
    el.scrollBy({ top: dir * step, behavior: "smooth" });
  };

  // const Thumb = ({ m, i }) => {
  //   const active = i === index;
  //   return (
  //     <button
  //       type="button"
  //       data-thumb={i}
  //       onClick={() => set(i)}
  //       aria-label={`Show media ${i + 1} of ${total}`}
  //       className={[
  //         "shrink-0 w-20 h-20 rounded-lg overflow-hidden border",
  //         active
  //           ? "border-gray-900"
  //           : "border-transparent hover:border-gray-300",
  //         "focus:outline-none focus:ring-2 focus:ring-gray-300",
  //         "w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20",
  //       ].join(" ")}
  //     >
  //       <img
  //         src={m.thumb || m.src}
  //         alt={m.alt || `Thumbnail ${i + 1}`}
  //         className="w-full h-full object-cover"
  //         loading="lazy"
  //       />
  //       {m.type === "video" && (
  //         <span className="absolute inset-0 grid place-items-center">
  //           {/* Play circle */}
  //           <span className="w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center">
  //             <svg
  //               viewBox="0 0 24 24"
  //               width="16"
  //               height="16"
  //               fill="currentColor"
  //             >
  //               <path d="M8 5v14l11-7z" />
  //             </svg>
  //           </span>
  //         </span>
  //       )}
  //     </button>
  //   );
  // };

  const Heart = useMemo(
    () => (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12.1 21.35l-1.1-.98C5.14 15.36 2 12.5 2 8.99 2 6.24 4.24 4 6.99 4c1.66 0 3.27.81 4.11 2.09C11.94 4.81 13.55 4 15.21 4 17.96 4 20.2 6.24 20.2 8.99c0 3.51-3.14 6.37-8.99 11.38l-.11.98z" />
      </svg>
    ),
    []
  );

  return (
    <div className="w-full grid grid-cols-[76px_1fr] md:grid-cols-[96px_1fr] gap-3 md:gap-4">
      {/* Thumbnails column (now with its own scroll + controls) */}
      <div className="relative">
        {/* Scroll area */}
        <div
          ref={thumbsRef}
          className="h-[520px] overflow-y-auto pr-1 hide-scrollbar flex flex-col gap-2"
          aria-label="Product media thumbnails"
        >
          {media.map((m, i) => (
            <button
              key={m.id ?? i}
              type="button"
              onClick={() => setIndex(i)}
              // ⬇️ IMPORTANT: stop shrinking + keep fixed size
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-2
                   border-transparent hover:border-black ${
                     index === i ? "border-black" : ""
                   }`}
            >
              <img
                src={m.thumb || m.src}
                alt={m.alt || `Thumb ${i + 1}`}
                className="w-18 h-18 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Fade edges */}

        <div className="pointer-events-none absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white to-transparent rounded-t-lg" />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent rounded-b-lg" />

        {/* Up/Down buttons */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1 z-10">
          <button
            type="button"
            onClick={() => scrollThumbs(-1)}
            aria-label="Scroll thumbnails up"
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"
              />
            </svg>
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1 z-10">
          <button
            type="button"
            onClick={() => scrollThumbs(1)}
            aria-label="Scroll thumbnails down"
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7.41 8.59 6 10l6 6 6-6-1.41-1.41L12 13.17z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main viewer */}
      <div className="relative rounded-2xl overflow-hidden border bg-white">
        {/* badge */}
        {badge && (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full shadow-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="text-orange-600"
              >
                <path
                  fill="currentColor"
                  d="M12 2l2.39 4.84 5.34.78-3.86 3.76.91 5.32L12 14.77 6.22 16.7l.91-5.32-3.86-3.76 5.34-.78z"
                />
              </svg>
              {badge}
            </span>
          </div>
        )}

        {/* favorite */}
        <button
          type="button"
          onClick={() => setFav((f) => !f)}
          aria-pressed={fav}
          aria-label="Toggle favorite"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 hover:bg-white p-2 shadow"
        >
          <div className={fav ? "text-rose-600" : "text-gray-700"}>{Heart}</div>
        </button>

        {/* prev/next */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(+1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"
                />
              </svg>
            </button>
          </>
        )}

        {/* media viewer */}
        <div
          ref={viewerRef}
          className="bg-gray-50 flex items-center justify-center"
        >
          {/* keep aspect pleasant */}
          <div className="w-full">
            {isVideo ? (
              <video
                key={current?.src} // ensure reload on switch
                src={current?.src}
                controls
                playsInline
                className="w-full h-[520px] object-cover bg-black/5"
              />
            ) : (
              <img
                src={current?.src}
                alt={current?.alt || `Media ${index + 1}`}
                className="w-full h-[520px] object-cover select-none"
                draggable={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
