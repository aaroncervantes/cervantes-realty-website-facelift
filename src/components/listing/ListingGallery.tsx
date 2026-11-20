import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Listing } from "@/data/listings";

export function ListingGallery({ listing }: { listing: Listing }) {
  const slides = listing.gallery.length ? listing.gallery : [listing.image];
  const plugins = useMemo(
    () =>
      slides.length > 1
        ? [Autoplay({ delay: 6000, stopOnInteraction: true })]
        : [],
    [slides.length],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: slides.length > 1, align: "center" },
    plugins,
  );
  const [index, setIndex] = useState(0);
  const onSelect = useCallback(() => {
    if (emblaApi) setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-black">
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((src, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[55vh] md:h-[76vh] min-h-[380px] w-full">
                <img
                  src={src}
                  alt={`${listing.address} — photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10 max-w-[calc(100%-6rem)]">
          {listing.badges.map((badge, i) => (
            <span
              key={i}
              className="bg-[#c9a84c] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md"
            >
              {badge}
            </span>
          ))}
          <span className="bg-black/55 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
            Cervantes Signature
          </span>
        </div>
        <div className="absolute top-5 right-5 z-10 bg-black/55 backdrop-blur text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
          {index + 1} / {slides.length}
        </div>
        {slides.length > 1 && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/85 hover:bg-white text-black flex items-center justify-center shadow-lg transition"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/85 hover:bg-white text-black flex items-center justify-center shadow-lg transition"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}
      </div>
      {slides.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {slides.map((src, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`shrink-0 w-16 h-11 rounded-md overflow-hidden border-2 transition ${
                index === i
                  ? "border-[#c9a84c] opacity-100"
                  : "border-transparent opacity-45 hover:opacity-90"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
