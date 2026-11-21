import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Listing } from "@/data/listings";

const PREVIEW_COUNT = 5; // hero + 4 side thumbs

function statusLabel(status: string): string {
  if (/closed|sold/i.test(status)) return "Sold";
  if (/pending/i.test(status)) return "Pending";
  return "For Sale";
}

export function ListingGallery({ listing }: { listing: Listing }) {
  const slides = useMemo(() => {
    const g = listing.gallery?.filter(Boolean) ?? [];
    if (g.length) return g;
    return listing.image ? [listing.image] : [];
  }, [listing.gallery, listing.image]);

  const hero = slides[0];
  const side = slides.slice(1, PREVIEW_COUNT);
  const showViewAll = slides.length > 1;
  const lastSideIndex = Math.max(0, side.length - 1);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openAt = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, slides.length]);

  if (!hero) return null;

  return (
    <>
      <section className="bg-[#0a0a0a] px-3 py-3 md:px-5 md:py-5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-2.5">
          {/* Hero — only first photo eagerly loaded */}
          <button
            type="button"
            onClick={() => openAt(0)}
            className="relative md:col-span-8 aspect-[16/11] md:aspect-auto md:min-h-[520px] overflow-hidden rounded-2xl text-left group"
          >
            <img
              src={hero}
              alt={`${listing.address} — main photo`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 max-w-[70%]">
              <span className="bg-white text-[#1a1a1a] text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full">
                Cervantes Signature
              </span>
              {listing.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="bg-[#c9a84c] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-[#2563eb] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                {statusLabel(listing.status)}
              </span>
            </div>
          </button>

          {/* Side rail — up to 4 thumbs; last opens full gallery */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-2.5 md:min-h-[520px]">
            {(side.length ? side : [hero]).slice(0, 4).map((src, i) => {
              const absoluteIndex = i + 1;
              const isLast =
                showViewAll &&
                (i === lastSideIndex || (side.length === 0 && i === 0));
              const moreCount = Math.max(0, slides.length - PREVIEW_COUNT + 1);
              return (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() =>
                    isLast ? openAt(0) : openAt(Math.min(absoluteIndex, slides.length - 1))
                  }
                  className="relative aspect-[4/3] md:aspect-auto md:flex-1 overflow-hidden rounded-2xl group min-h-[100px] md:min-h-0"
                >
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {isLast && slides.length > PREVIEW_COUNT - 1 && (
                    <span className="absolute inset-0 bg-black/45 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 border border-white/80 text-white text-xs font-semibold tracking-wide px-4 py-2 rounded-full backdrop-blur-sm">
                        View all photos
                        {moreCount > 0 ? ` · ${slides.length}` : ""}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {showViewAll && (
          <div className="max-w-[1400px] mx-auto mt-3 flex justify-end md:hidden">
            <button
              type="button"
              onClick={() => openAt(0)}
              className="text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white"
            >
              View all {slides.length} photos →
            </button>
          </div>
        )}
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
        >
          <div className="flex items-center justify-between px-4 py-3 text-white shrink-0">
            <p className="text-sm font-medium truncate pr-4">
              {listing.address}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/70 tabular-nums">
                {lightboxIndex + 1} / {slides.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-4 min-h-0">
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (i) => (i - 1 + slides.length) % slides.length,
                    )
                  }
                  className="absolute left-3 md:left-6 z-10 w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((i) => (i + 1) % slides.length)
                  }
                  className="absolute right-3 md:right-6 z-10 w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            {/* Only current (+preload neighbors via hidden imgs) */}
            <img
              key={slides[lightboxIndex]}
              src={slides[lightboxIndex]}
              alt={`${listing.address} — photo ${lightboxIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="shrink-0 px-4 py-3 overflow-x-auto no-scrollbar flex gap-2 justify-center">
            {slides.map((src, i) => (
              <button
                key={`lb-${i}`}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className={`shrink-0 w-14 h-10 overflow-hidden rounded-md border-2 ${
                  i === lightboxIndex
                    ? "border-[#c9a84c]"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
